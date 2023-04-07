import React from "react";
import { Navigate } from "react-router-dom";

const Protected = ({ isLoggedIn, path, children }) => {
    if (!isLoggedIn)
        return <Navigate to={path} />;
    
    return children;
}

export default Protected;