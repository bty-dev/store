import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from "react-router-dom";
import './index.css';
import App from './App';
import "bootstrap/dist/css/bootstrap.min.css";
import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { msalConfig } from "./authConfig";
const msalInstance = new PublicClientApplication(msalConfig);
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
  );
root.render(
  <React.StrictMode>
      <BrowserRouter>
        <MsalProvider instance={msalInstance}>
            <App />
        </MsalProvider>
      </BrowserRouter>
  </React.StrictMode>
);
