import React, { useContext, useEffect, useState } from "react";
import { LoadingContext } from "../../contexts/loadingContext"
import { Toast, ToastContainer } from "react-bootstrap";
import { BsFillExclamationTriangleFill } from "react-icons/bs";


const Error = () => {
  const [ error, setError ] = useState('');
  const [ show, setShow ] = useState(false);
  const { errorMessage } = useContext(LoadingContext);

  useEffect(() => {
    if (errorMessage) {
      setShow(true);
      setError(errorMessage);
    }
  }, [ errorMessage, setError ])

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
