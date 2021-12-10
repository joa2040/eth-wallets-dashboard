import React from "react";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import { Loading } from "../utils";
import { ProtectedRouteProps } from "../../interfaces";
import PropTypes from "prop-types";

const ProtectedRoute = ({ component }: ProtectedRouteProps) => (
    React.createElement(withAuthenticationRequired(component, {
        onRedirecting: () => <Loading/>,
    }))
)

ProtectedRoute.propTypes = {
  component: PropTypes.func.isRequired
}

export default ProtectedRoute;
