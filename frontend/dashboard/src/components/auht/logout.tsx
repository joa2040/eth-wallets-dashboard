import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { GenericButton } from "../utils";

const LogoutButton = () => {
  const { logout } = useAuth0();
  return (
    <GenericButton onClick={() =>
      logout({
        returnTo: window.location.origin,
      })}
     className="btn btn-danger btn-block"
     label="Log Out"/>
  );
};

export default LogoutButton;
