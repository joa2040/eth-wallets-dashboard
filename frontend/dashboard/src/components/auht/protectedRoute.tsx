import React, { useContext } from "react";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import { ProtectedRouteProps } from "../../interfaces";
import PropTypes from "prop-types";
import { Loading } from "../utils";
import Loader from "react-loader-spinner";
import { Container } from "react-bootstrap";

const ProtectedRoute = ({ component }: ProtectedRouteProps) => {

  return (
    React.createElement(withAuthenticationRequired(component, {
      onRedirecting: () => <Container className="spinner-main">
        <Loader
          type="Puff"
          color="#00BFFF"
          height={100}
          width={100}
        />
      </Container>,
    }))
  )
}


ProtectedRoute.propTypes = {
  component: PropTypes.func.isRequired
}

export default ProtectedRoute;
