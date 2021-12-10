import React, { Fragment } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Home = () => {
  const { isAuthenticated, user } = useAuth0();

  if (user && isAuthenticated) {
    const { name } = user;
    return (
      <Fragment>
        <h1 className="text-center">Welcome {name}!</h1>
        <></>
      </Fragment>
    )
  } else {
    return (
      <Fragment>
        <h1 className="text-center display-3">Welcome Guest!</h1>
        <br/>
        <p className="h4 text-center">
          Please sign in to access your wallets.
        </p>
      </Fragment>
    )
  }
};

export default Home;
