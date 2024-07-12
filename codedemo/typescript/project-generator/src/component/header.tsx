import * as React from 'react';
import './header.css'
import * as azdev from 'azure-devops-extension-sdk';
import { IUserContext } from 'azure-devops-extension-sdk';

export default function Header() {
    
    const user: IUserContext = azdev.getUser();
    return (
        <header>
            <h1>{user.displayName}</h1>
        </header>
    );
}