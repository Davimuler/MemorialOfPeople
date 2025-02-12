import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";
import {GoogleOAuthProvider} from "@react-oauth/google";

const CLIENT_ID="936949424156-orhah4d2bflen76j6tak2p3ceqsb5r6u.apps.googleusercontent.com";
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

    <GoogleOAuthProvider clientId={CLIENT_ID}>
    <BrowserRouter>
  <React.StrictMode>
    <App />
  </React.StrictMode>
    </BrowserRouter>
    </GoogleOAuthProvider>

);
reportWebVitals();
