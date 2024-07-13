import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Body from './component/Body';
import * as SDK from 'azure-devops-extension-sdk';

const root = document.getElementById('root');

if (root !== null) {
    SDK.init();
    SDK.ready().then(() => {
        
        createRoot(root).render( 

                
                <Body /> 
        );
    });

}