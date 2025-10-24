import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter} from "react-router-dom"
import App from './App.jsx'
import keycloak from "./components/keycloak.js";
import {ReactKeycloakProvider} from "@react-keycloak/web";

const initOptions = {
    onLoad: "check-sso",   // "login-required" si tu veux forcer la connexion dès l'entrée
    pkceMethod: "S256",
    silentCheckSsoFallback: true,
};
createRoot(document.getElementById('root')).render(
  <StrictMode>
     <ReactKeycloakProvider
         authClient={keycloak}
         initOptions={initOptions}>
         <BrowserRouter>
             <App />
         </BrowserRouter>
     </ReactKeycloakProvider>

  </StrictMode>,
)
