import * as React from 'react';
import './header.css'
import * as azdev from 'azure-devops-extension-sdk';
import { IUserContext } from 'azure-devops-extension-sdk';

export default function Header() {
    
    const user: IUserContext = azdev.getUser();
    return (
       <header className="header">
              <div className="header-title">
                <h1>团队项目创建工具</h1>
              </div>
              <div className="header-user">
                <p>欢迎，{user.name}</p>
              </div>
       </header>
    );
}