import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { AuthProvider } from './context/AuthContext.js';
import App from './App.jsx';

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
    <StrictMode>
        <AuthProvider>
            <App />
        </AuthProvider>
    </StrictMode>
);