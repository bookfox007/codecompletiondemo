import axios from "axios";
import * as api from "azure-devops-extension-api";
import * as SDK from "azure-devops-extension-sdk";

import { CoreRestClient, ProjectVisibility, TeamProject, TeamContext, Process } from "azure-devops-extension-api/Core";
import { TfvcRestClient, TfvcChange, TfvcChangeset, VersionControlChangeType, ItemContentType } from "azure-devops-extension-api/Tfvc";
import { BoardColumn, BoardColumnType,BoardRow, TeamSetting, TeamSettingsPatch, WorkRestClient } from "azure-devops-extension-api/Work";
import { RestClientBase } from "azure-devops-extension-api/Common/RestClientBase";
import {WorkItemTrackingProcessDefinitionsRestClient} from 'azure-devops-extension-api/WorkItemTrackingProcessDefinitions'
import { OperationReference, OperationStatus } from "azure-devops-extension-api/Operations/Operations";

import { v4 as uuidv4 } from "uuid";
import { QueryExpand } from "azure-devops-extension-api/WorkItemTracking/WorkItemTracking";


export let ProjectInitPaths: string[] = [
    "1_立项及采购",
    "2_项目实施",
    "3_上线运维",
    "1_立项及采购\\11_立项文档",
    "1_立项及采购\\12_采购文件",
    "1_立项及采购\\13_合同文档",
    "2_项目实施\\21_进度管理",
    "2_项目实施\\22_需求及设计",
    "2_项目实施\\23_开发及实施",
    "2_项目实施\\24_测试文档",
    "2_项目实施\\25_变更管理",
    "3_上线运维\\31_基础数据",
    "3_上线运维\\32_用户手册",
    "3_上线运维\\33_上线方案",
    "3_上线运维\\34_运维手册",
    "3_上线运维\\35_验收报告",
    "2_项目实施\\21_进度管理\\211_启动阶段",
    "2_项目实施\\21_进度管理\\212_项目周报",
    "2_项目实施\\21_进度管理\\213_其他汇报文档",
    "2_项目实施\\22_需求及设计\\221_需求文档",
    "2_项目实施\\22_需求及设计\\222_开发设计",
    "2_项目实施\\22_需求及设计\\223_数据设计",
    "2_项目实施\\22_需求及设计\\224_备份方案",
    "2_项目实施\\23_开发及实施\\231_代码评审记录",
    "2_项目实施\\23_开发及实施\\232_实施方案",
    "2_项目实施\\24_测试文档\\241_研发自测",
    "2_项目实施\\24_测试文档\\242_技术测试",
    "2_项目实施\\24_测试文档\\243_业务测试",
    "2_项目实施\\24_测试文档\\244_性能测试",
    "2_项目实施\\24_测试文档\\245_安全测试"
];

export const createProject = async (project: string): Promise<OperationReference> => {

    let processArr: Process[] = [];
    let client = api.getClient(CoreRestClient);

    processArr = await client.getProcesses();
    //todo 发布到客户环境时这里应改成
    // let process = processArr.find((process) => process.name === "CNPSEC-PROCESS");
    let process = processArr.find((process) => process.name === "SCRUM");
    console.log(process);
    if (process == undefined) {
        throw new Error("No default process found");
    }

    // const myHeaders = new Headers();
    // myHeaders.append("Accept", "application/json;api-version=5.0;excludeUrls=true;enumsAsNumbers=true;msDateFormat=true;noArrayWrap=true");
    // myHeaders.append("Content-Type", "application/json");
    // myHeaders.append("Authorization", "Basic Omxta2FvM2FhaWF3cDUyeWNocWZtNHE2c2hxdXYyd3R2N2FkZmt0eXp5MzZhYXhveWt1M2E=");

    // const raw = JSON.stringify({
    //     "name": project,
    //     "description": "",
    //     "visibility": 0,
    //     "capabilities": {
    //         "versioncontrol": {
    //             "sourceControlType": "Tfvc"
    //         },
    //         "processTemplate": {
    //             "templateTypeId": "b8a3a935-7e91-48b8-a94c-606d37c3e9f2"
    //         }
    //     }
    // });

    // const requestOptions = {
    //     method: "POST",
    //     headers: myHeaders,
    //     body: raw,
    //     redirect: "follow"
    // } as RequestInit;

    // fetch("http://localhost/DefaultCollection/_apis/projects?api-version=5.0", requestOptions)
    //     .then((response) => response.text())
    //     .then((result) => {
    //         console.log(result)
    //     })
    //     .catch((error) => {
    //         console.error(error);
    //     });
    let projectObj = {
        name: project,
        description: "",
        visibility: ProjectVisibility.Private,
        capabilities: {
            versioncontrol: {
                sourceControlType: "Tfvc"
            },
            processTemplate: {
                templateTypeId: process.id
            }
        }
    } as unknown as TeamProject;

    return await client.queueCreateProject(projectObj);

}


export const createTfvcDirectory = async (projectId: string, count: number) => {
    let user = await SDK.getUser();
    let coreClient = api.getClient(CoreRestClient);
    let project = await coreClient.getProject(projectId);
    if (project == undefined) {
        throw new Error("Project not found");
    }
    let client = api.getClient(TfvcRestClient);
    let pathArr: any[] = [];

    ProjectInitPaths.forEach(async path => {

        pathArr.push({
            changeType: VersionControlChangeType.Add,
            item: {
                isFolder: true,
                path: "$/" + project.name + "/" + path,
            }
        } as unknown as TfvcChange);


    });
    let changeSet = {
        changes: pathArr,
        comment: "Initial Create by " + user.displayName,
    } as unknown as TfvcChangeset;


    await client.createChangeset(changeSet, projectId)
        .then((changeset) => {
            return changeset;
        })
        .catch((error) => {
            console.error(error);
            if (error.message.includes("团队项目 " + project.name + " 不存在")) {
                count--;
                setTimeout(() => {

                }, 2000);
                if(count > 0){
                    createTfvcDirectory(project.id, count);
                }
            }
        });
}



export const settingProjectDefaultColumns = async (projectId: string) => {
    //todo 确认实际开始时间和实际结束时间两个列在模板中的id
    let url = "http://localhost/DefaultCollection/_apis/Settings/Project/" + projectId + "/entries/me";
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + (await SDK.getAccessToken());
    axios.defaults.headers.common["Accept"] = "application/json;api-version=4.1-preview.1;excludeUrls=true;enumsAsNumbers=true;msDateFormat=true;noArrayWrap=true";
    axios.patch(url, {
        "WorkItemsHub/ColumnSettings/recentlyupdated": {
            "columnOptions": [
                {
                    "fieldReferenceName": "System.Id",
                    "width": 60
                },
                {
                    "fieldReferenceName": "System.Title",
                    "width": 450
                },
                {
                    "fieldReferenceName": "System.AssignedTo",
                    "width": 200
                },
                {
                    "fieldReferenceName": "System.AreaPath",
                    "width": 200
                },
                {
                    "fieldReferenceName": "System.Tags",
                    "width": 200
                },
                {
                    "fieldReferenceName": "System.CommentCount",
                    "width": 75
                },
                {
                    "fieldReferenceName": "RecentlyUpdatedDate",
                    "width": 150
                },
                {
                    "fieldReferenceName": "Microsoft.VSTS.Common.Priority",
                    "width": 150
                },
                {
                    "fieldReferenceName": "System.RevisedDate",
                    "width": 150
                }
            ],
            "sortOptions": [
                {
                    "fieldReferenceName": "RecentlyUpdatedDate",
                    "isAscending": false
                }
            ],
            "version": 1
        }
    }).then((response) => {
        console.log(response.data);
    });
}


export const settingBackLogVisibilities = async (projectName: string) => {

    //todo 确认是不是每个模板都是一样的
    let coreClient = api.getClient(CoreRestClient);
    let client = api.getClient(WorkRestClient);
    let project = await coreClient.getProject(projectName);
    console.log(project);
    let teamCxt = {
        projectId: project.id
    } as unknown as TeamContext
    var settings = await client.getTeamSettings(teamCxt);
    console.log(settings);
    // 遍历 settings.backlogVisibilities 对象的所有key，并将value修改为true
    for (var key in settings.backlogVisibilities) {
        settings.backlogVisibilities[key] = true;
    }

    var settingPatch = {
        backlogVisibilities: settings.backlogVisibilities,

    } as unknown as TeamSettingsPatch;

    client.updateTeamSettings(settingPatch, teamCxt).then((settings) => {
        console.log(settings);
    });

}

export const updateBoardColumns = async (projectName: string) => {
    //todo 根据初始化的模板，查找初始化的board有多少种配置，然后根据每种配置获取对应的boards配置，对配置进行修改，修改为客户需要的配置
    let client = api.getClient(WorkRestClient);
    let coreClient = api.getClient(CoreRestClient);
    let project = await coreClient.getProject(projectName);
    console.log(project);
    let teamCxt = {
        projectId: project.id
    } as unknown as TeamContext
    let boards = await client.getBoards(teamCxt);
    console.log(boards);

    let longStoryBoard = boards.find((board) => board.name === "长篇故事");
    if (longStoryBoard != undefined) {
        let longStorySettedColumns = await client.getBoardColumns(teamCxt, longStoryBoard.id);
        let longStoryInComingColumn = longStorySettedColumns.find((column) => column.columnType === BoardColumnType.Incoming);
        let longStoryInProgressColumn = longStorySettedColumns.find((column) => column.columnType === BoardColumnType.InProgress);
        let longStoryOutGoingColumn = longStorySettedColumns.find((column) => column.columnType === BoardColumnType.Outgoing);
        var longStoryColumns = [
            {
                "id":   longStoryInComingColumn?.id,
                "name": "项目立项",
                "itemLimit": 0,
                "stateMappings": {
                    "长篇故事": "待处理"
                },
                "description": "",
                "columnType": BoardColumnType.Incoming
            },
            {
                "id": longStoryInProgressColumn?.id,
                "name": "项目实施",
                "itemLimit": "5",
                "stateMappings": {
                    "长篇故事": "正在进行"
                },
                "isSplit": true,
                "description": "",
                "columnType": BoardColumnType.InProgress
            },
            { 
                "name": "项目上线",
                "itemLimit": "10",
                "stateMappings": {
                    "长篇故事": "正在进行"
                },
                "isSplit": true,
                "description": "",
                "columnType": BoardColumnType.InProgress
            },
            { 
                "name": "项目移交",
                "itemLimit": "5",
                "stateMappings": {
                    "长篇故事": "正在进行"
                },
                "isSplit": true,
                "description": "",
                "columnType": BoardColumnType.InProgress
            },
            { 
                "name": "项目验收",
                "itemLimit": "5",
                "stateMappings": {
                    "长篇故事": "待处理"
                },
                "isSplit": true,
                "description": "",
                "columnType": BoardColumnType.InProgress
            },
            { 
                "name": "项目完成",
                "itemLimit": "5",
                "stateMappings": {
                    "长篇故事": "待处理"
                },
                "isSplit": true,
                "description": "",
                "columnType": BoardColumnType.InProgress
            },
            {
                "id": longStoryOutGoingColumn?.id,
                "name": "项目关结",
                "itemLimit": "0",
                "stateMappings": {
                    "长篇故事": "完成"
                },
                "description": "",
                "columnType": BoardColumnType.Outgoing
            }
        ] as unknown as BoardColumn[];
        client.updateBoardColumns(longStoryColumns, teamCxt, longStoryBoard.id).
        then((columns) => {
            console.log(columns);
        });
    }

    var featureBoard = boards.find((board) => board.name === "特性");
    if (featureBoard != undefined) {
        let featureBoardSettedColumns = await client.getBoardColumns(teamCxt, featureBoard.id);
        let featureBoardInComingColumn = featureBoardSettedColumns.find((column) => column.columnType === BoardColumnType.Incoming);
        let featureBoardInProgressColumn = featureBoardSettedColumns.find((column) => column.columnType === BoardColumnType.InProgress);
        let featureBoardOutGoingColumn = featureBoardSettedColumns.find((column) => column.columnType === BoardColumnType.Outgoing);
        var featureColumns = [
            {
                "id": featureBoardInComingColumn?.id,
                "name": "已建议",
                "itemLimit": 0,
                "stateMappings": {
                    "特性": "待处理"
                },
                "description": "",
                "columnType": 0
            },
            {
                "id": featureBoardInProgressColumn?.id,
                "name": "实现",
                "itemLimit": "5",
                "stateMappings": {
                    "特性": "正在进行"
                },
                "isSplit": true,
                "description": "",
                "columnType": 1
            },
            {
                "name": "技术测试",
                "itemLimit": "10",
                "stateMappings": {
                    "特性": "正在进行"
                },
                "isSplit": true,
                "description": "",
                "columnType": 1
            },
            {
                "name": "业务测试",
                "itemLimit": "5",
                "stateMappings": {
                    "特性": "正在进行"
                },
                "isSplit": true,
                "description": "",
                "columnType": 1
            },
            {
                "name": "已完成",
                "itemLimit": "5",
                "stateMappings": {
                    "特性": "待处理"
                },
                "isSplit": true,
                "description": "",
                "columnType": 1
            },
            {
                "id": featureBoardOutGoingColumn?.id,
                "name": "项目关结",
                "itemLimit": "0",
                "stateMappings": {
                    "特性": "完成"
                },
                "description": "",
                "columnType": 2
            }] as unknown as BoardColumn[];
        client.updateBoardColumns(featureColumns, teamCxt, featureBoard.id).then((columns) => {
            console.log("featureBoard columns updated");
        });
    }



}

export const updateBoardSwamLanes = async (projectName: string) => {
    let client = api.getClient(WorkRestClient);
    let coreClient = api.getClient(CoreRestClient);
    let project = await coreClient.getProject(projectName);
    console.log(project);
    let teamCxt = {
        projectId: project.id
    } as unknown as TeamContext
    let boards = await client.getBoards(teamCxt);
    let longStoryBoard = boards.find((board) => board.name === "长篇故事");
    if(longStoryBoard != undefined){
        let longStoryRows = [
            {"id":null,"name":"项目","color":null},
            {"id":"00000000-0000-0000-0000-000000000000","name":"产品","color":null}
        ] as unknown as BoardRow[];
        client.updateBoardRows(longStoryRows, teamCxt, longStoryBoard.id).then((rows) => {
            console.log(rows);
        });
    }
    let questionBoard = boards.find((board) => board.name === "问题");
    if(questionBoard != undefined){
        let questionRows = [
            {"id":null,"name":"需求和问题","color":null},
            {"id":null,"name":"项目任务","color":null},
            {"id":"00000000-0000-0000-0000-000000000000","name":"版本","color":null}
        ] as unknown as BoardRow[];
        client.updateBoardRows(questionRows, teamCxt, questionBoard.id).then((rows) => {
            console.log(rows);
        });
    }
    return project.name;
    
}


export const getProcesses = async () => {
    let client = api.getClient(CoreRestClient);
    let processes = await client.getProcesses();
    console.log(processes);
    let cnProcess = processes.find((process) => process.name === "CNPSEC-PROCESS");
    let processClient = api.getClient(WorkItemTrackingProcessDefinitionsRestClient);
    let workItemTypes = await processClient.getWorkItemTypes(cnProcess?.id as string)
    let workItemTypeBug = workItemTypes.find((workItemType) => workItemType.name === "Bug");
    console.log(workItemTypeBug);
}

export const getProcessConfiguration = async () => {
    let client = api.getClient(WorkRestClient);
    let processConfiguration = await client.getProcessConfiguration("CNPSEC-PROCESS");
    console.log(processConfiguration);
    
    
}

export const testDataProvider = async () => {
     let service =await SDK.getService("ms.vss-web.data-service");
     console.log(service);
     
}

//创建一个Epic工作项，工作项的标题、指派人、描述信息由外部传入
export const createEpic = async (title: string, assignedTo: string, description: string) => {
    let client = api.getClient(WorkItemTrackingRestClient);
    let workItem = {
        "fields": {
            "System.Title": title,
            "System.AssignedTo": assignedTo,
            "System.Description": description,
            "System.WorkItemType": "Epic",
            "System.State": "New"
        }
    } as unknown as WorkItem;
    let project = await client.getProjects();
    let projectGuid = project[0].id;
    let workItemResult = await client.createWorkItem(workItem, projectGuid, "CNPSEC-PROCESS");

    console.log(workItemResult);
    
    return workItemResult;
}


   
    
