import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import {Provider} from 'react-redux';
import {store} from "./redux/store/index";
import { Auth0Provider } from '@auth0/auth0-react';

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store = { store }>
     <Auth0Provider
     domain="henryfinalproject.us.auth0.com"
     clientId="DA82GPNcNu7RAAF5y8kA4RKqAw4TeVju"
     authorizationParams={{
       redirect_uri: window.location.origin
     }}
     >
      <App />
      </Auth0Provider>    
    </Provider>
  </React.StrictMode>
);
