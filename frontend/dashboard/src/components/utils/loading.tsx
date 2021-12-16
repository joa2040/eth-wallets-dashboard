import React, { useContext } from "react";
import { LoadingContext } from "../../contexts/loadingContext"
import Loader from "react-loader-spinner";
import { Container } from "react-bootstrap";


const Loading = () => {
  const { loadingCount } = useContext(LoadingContext);

  return (
    <>
      {loadingCount > 0 &&
      <Container className="spinner">
        <Loader
          type="Puff"
          color="#00BFFF"
          height={100}
          width={100}
        />
      </Container>}
    </>
  )
}

export default Loading;
