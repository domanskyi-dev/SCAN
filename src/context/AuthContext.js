import React, { createContext, useContext, useState, useEffect } from "react";
import { authService } from "../services/AuthService";


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoginUser, setIsLoginUser] = useState(false);
    const [usedCompaniesValue, setUsedCompaniesValue] = useState(0);
    const [companiesLimitValue, setCompaniesLimitValue] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
 
    const checkLoginStatus = () => {
        const accessToken = localStorage.getItem('accessToken');
        const tokenExpire = localStorage.getItem('tokenExpire');
        const now = new Date();
        if (!accessToken || !tokenExpire || new Date(tokenExpire) <= now) {
            console.log("Токен просрочен или не найден.");
            setIsLoginUser(false);
            localStorage.removeItem('accessToken');
            localStorage.removeItem('tokenExpire');
        } else {
            console.log("Пользователь авторизирован.");
            setIsLoginUser(true);
        }
    };

    const getCompaniesInfo = async () => {
        try {
            setIsLoading(true);
            const response = await authService.info();
            setUsedCompaniesValue(response.eventFiltersInfo.usedCompanyCount);
            setCompaniesLimitValue(response.eventFiltersInfo.companyLimit);
            console.log("Получение информации о компаниях.");
        } catch (error) {
            console.log(error.message);
        } finally {
            setIsLoading(false);
        }
    };
  
    useEffect(() => {
        checkLoginStatus();
    }, []);

    const contextValue = {
        isLoginUser, 
        setIsLoginUser, 
        checkLoginStatus, 
        usedCompaniesValue, 
        companiesLimitValue, 
        isLoading,
        getCompaniesInfo
    };
  
    return (
        <AuthContext.Provider value={ contextValue }>
            {children}
        </AuthContext.Provider>
    );
};
  
export const useAuth = () => useContext(AuthContext);