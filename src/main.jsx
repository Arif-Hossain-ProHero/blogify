import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import AuthProvider from "./provider/AuthProvider.jsx";
import ProfileProvider from "./provider/ProfileProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <ProfileProvider>
        <Router>
          <App />
        </Router>
      </ProfileProvider>
    </AuthProvider>
  </React.StrictMode>
);
