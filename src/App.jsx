import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router';
import { useAuth } from './context/AuthContext.js';
import Header from './components/Header/Header.jsx';
import MainPage from './components/Main/MainPage/MainPage.jsx';
import AuthPage from './components/Main/AuthPage/AuthPage.jsx';
import SearchPage from './components/Main/SearchPage/SearchPage.jsx';
import ResultsPage from './components/Main/ResultsPage/ResultsPage.jsx';
import Footer from './components/Footer/Footer.jsx';
import './App.css';


function App() {
    const { checkLoginStatus } = useAuth();

    useEffect(() => {
        checkLoginStatus();
    }, [checkLoginStatus]);

    const ProtectedRoute = ({ children }) => {
        const { isLoginUser } = useAuth();
    
        if (!isLoginUser) {
            return <Navigate to="/" />
        }
    
        return children;
    };

    return (
        <Router>
            <div className="app-container">
                <Header />
                <Routes>
                    <Route path="*" element={<MainPage />}/>
                    <Route path="/login" element={<AuthPage/>}/>
                    <Route path="/search" element={<ProtectedRoute><SearchPage /></ProtectedRoute>} />
                    <Route path="/results" element={<ProtectedRoute><ResultsPage /></ProtectedRoute>} />
                </Routes>
                <Footer />
            </div>
        </Router>
    );
};

export default App;