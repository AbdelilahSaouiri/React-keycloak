// Dans src/components/RequireAuth.jsx
import React from 'react';
import { useKeycloak } from '@react-keycloak/web';
import { Navigate } from 'react-router-dom';

const RequireAuth = ({ requiredRoles, children }) => {
    const { keycloak, initialized } = useKeycloak();

    if (!initialized) {
        return <div>Chargement de l'authentification...</div>;
    }

    if (!keycloak.authenticated) {

        keycloak.login({ redirectUri: window.location.href });
        return <div>Redirection vers la connexion...</div>;
    }


    const hasRequiredRole = requiredRoles.some(role => keycloak.hasRealmRole(role));

    if (requiredRoles && !hasRequiredRole) {

        return <Navigate to="/no-access" replace />;
    }

    return children;
};

export default RequireAuth;