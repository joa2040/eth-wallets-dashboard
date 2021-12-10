import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Auth0ProviderWithHistory from "./components/auht/auth0ProviderWithHistory";
import { AppProvider } from './context';

ReactDOM.render(
  <Router>
    <Auth0ProviderWithHistory>
      <AppProvider>
      <React.StrictMode>
        <App/>
      </React.StrictMode>
      </AppProvider>
    </Auth0ProviderWithHistory>
  </Router>,
  document.getElementById('root')
);
