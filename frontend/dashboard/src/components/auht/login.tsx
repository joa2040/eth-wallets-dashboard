import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { GenericButton } from "../utils";

const LoginButton = () => {
    const { loginWithRedirect } = useAuth0();

    return <GenericButton onClick={ loginWithRedirect } className="btn btn-success btn-block" label="Sign In"/>;
};

export default LoginButton;
