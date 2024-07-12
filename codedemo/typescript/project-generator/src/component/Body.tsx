import React, { ChangeEvent } from 'react';
import { ReactDOM } from 'react';
import { createProject, createTfvcDirectory, settingBackLogVisibilities, settingProjectDefaultColumns, updateBoardColumns, updateBoardSwamLanes, testDataProvider, getProcesses,getProcessConfiguration } from '../common/APIHelper'
import * as api from 'azure-devops-extension-api';
import { OperationReference, OperationStatus } from 'azure-devops-extension-api/Operations/Operations';
import { OperationsRestClient } from 'azure-devops-extension-api/Operations';
import { OperationCanceledException } from 'typescript';
import { Row, Col, Input, Button, Alert } from 'antd';



export default function Body() {
  //设置Body组件的属性 项目名称
  const [projectName, setProjectName] = React.useState('');
  const [projectCreatedStatus, setProjectCreatedStatus] = React.useState(0);
  const [projectCreatedMsg, setProjectCreatedMsg] = React.useState('');


  function handleChange(event: ChangeEvent<HTMLInputElement>): void {
    setProjectName(event.target.value);
    setProjectCreatedStatus(0);
  }

  testDataProvider();
  return (<div>
    <Row>
      <Alert message={projectCreatedStatus == 100 ? '项目创建成功!' : projectCreatedStatus == 40 ? "项目创建过程中遇到异常！" : '项目创建中...'}
        type={projectCreatedStatus == 100 ? 'success' : projectCreatedStatus == 40 ? 'error' : 'info'}
        showIcon
        style={
          {
            display: projectCreatedStatus == 0 ? 'none' : 'block'
          }
        } />
    </Row>
    <Row>
      <Col span={4}>
        <Input
          size="small"
          value={projectName}
          placeholder='请输入团队项目名称'
          onChange={handleChange}
        ></Input>
        <br />
        <Button
          type="primary"
          onClick={async () => {
            try {
              //需求1：创建项目
              let operation = await createProject(projectName);
              let operationClient = api.getClient(OperationsRestClient);
              while (operation.status != OperationStatus.Succeeded && operation.status != OperationStatus.Failed) {

                await new Promise(resolve => setTimeout(resolve, 1000));
                operation = await operationClient.getOperation(operation.id);
                switch (operation.status) {
                  case OperationStatus.Succeeded:
                    setProjectCreatedStatus(100);
                    break;
                  case OperationStatus.Failed:
                    setProjectCreatedStatus(40);
                    break;
                  case OperationStatus.Cancelled:
                    setProjectCreatedStatus(40);
                    break;
                  case OperationStatus.InProgress:
                    setProjectCreatedStatus(50);
                    break;
                  default:
                    break;
                }
              };

              console.log('create project success');
              //需求2：创建TFVC目录
              await createTfvcDirectory(projectName, 7);
              //需求3：设置BackLog Visibilities
              settingBackLogVisibilities(projectName);
              //需求4：Setting Project Default Columns
              updateBoardColumns(projectName);
              //需求5：Update Board Rows
              updateBoardSwamLanes(projectName);

              setProjectCreatedStatus(100);

            } catch (error) {
              console.log(error);
              setProjectCreatedStatus(40);
              setProjectCreatedMsg("项目创建失败！");
            }
          }}>创建项目</Button>
      </Col>
      <Col span={8}></Col>
    </Row>
    {/* <button onClick={testDataProvider}>测试</button>
    <button onClick={getProcesses}>获取Processes</button>
    <button onClick={getProcessConfiguration}>获取 积压工作项配置信息</button> */}
    <br />

  </div>);
}

