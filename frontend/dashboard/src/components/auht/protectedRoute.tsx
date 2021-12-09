import React from "react";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import { Loading } from "../utils";
import { ProtectedRouteProps } from "../../interfaces";

const ProtectedRoute = ({ component }: ProtectedRouteProps) => (
    React.createElement(withAuthenticationRequired(component, {
        onRedirecting: () => <Loading/>,
    }))
)

export default ProtectedRoute;
