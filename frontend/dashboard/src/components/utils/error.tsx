import React, { useContext, useEffect, useState } from "react";
import { LoadingContext } from "../../contexts/loadingContext"
import { Toast, ToastContainer } from "react-bootstrap";
import { BsFillExclamationTriangleFill } from "react-icons/bs";


const Error = () => {
  const [ { error, count }, setError ] = useState({ error: '', count: 0 });
  const [ show, setShow ] = useState(false);
  const { errorMessage, errorCount } = useContext(LoadingContext);

  useEffect(() => {
    if (errorMessage && errorCount > count) {
      setShow(true);
      setError({ error: errorMessage, count });
    }
  }, [ errorMessage, setError, errorCount ])

  return (
    <ToastContainer className="p-3 end-0" style={{ position: "fixed", top: 0, zIndex: 999}}>
      <Toast onClose={() => setShow(false)} show={show} bg="danger" delay={3000} autohide>
        <Toast.Header closeButton={false}>
          <BsFillExclamationTriangleFill/>
          <strong className="me-auto"> Error</strong>
        </Toast.Header>
        <Toast.Body>{error}</Toast.Body>
      </Toast>
    </ToastContainer>
  )
}

export default Error;
