import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Auth0ProviderWithHistory from "./components/auht/auth0ProviderWithHistory";
import { AppProvider } from './contexts/appContext';
import { LoadingProvider } from "./contexts/loadingContext";

ReactDOM.render(
  <Router>
    <Auth0ProviderWithHistory>
      <AppProvider>
        <LoadingProvider>
          <React.StrictMode>
            <App/>
          </React.StrictMode>
        </LoadingProvider>
      </AppProvider>
    </Auth0ProviderWithHistory>
  </Router>,
  document.getElementById('root')
);
