import React, { ReactElement } from "react";
import { Route, Routes } from "react-router-dom";
import NavBar from "./components/nav/navBar";
import { Loading } from "./components/utils";
import { Home, Private } from "./views";
import { useAuth0 } from "@auth0/auth0-react";
import { ProtectedRoute } from "./components/auht";
import "./App.css";

function App() {

    const { isLoading } = useAuth0();

    if (isLoading) {
        return <Loading/>;
    }

    return (
        <div id="app" className="d-flex flex-column h-100">
            <NavBar/>
            <div className="container flex-grow-1">
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route
                        path="/private"
                        element={<ProtectedRoute component={Private} />}
                    />
                </Routes>
            </div>
            {/*<Footer />*/}
        </div>
    );
};


export default App;
