import React from "react";
import { Route, Routes } from "react-router-dom";
import NavBar from "./components/nav/navBar";
import { Dashboard, Home } from "./views";
import { useAuth0 } from "@auth0/auth0-react";
import { ProtectedRoute } from "./components/auht";
import "./App.css";
import Loader from "react-loader-spinner";
import { Container } from "react-bootstrap";

function App() {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return (
      <Container className="spinner-main">
        <Loader
          type="Puff"
          color="#00BFFF"
          height={100}
          width={100}
        />
      </Container>
    );
  }

  return (
    <div id="app" className="d-flex flex-column h-100">
      <NavBar/>
      <div className="container flex-grow-1">

        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route
            path="/dashboard"
            element={<ProtectedRoute component={Dashboard}/>}
          />
        </Routes>
      </div>
      {/*<Footer />*/}
    </div>
  );
};


export default App;
