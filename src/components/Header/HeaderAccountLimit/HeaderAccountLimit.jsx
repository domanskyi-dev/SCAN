import React, { useEffect } from "react";
import { useAuth } from "../../../context/AuthContext";
import loading from '../../../assets/images/icon-loading.svg';
import './HeaderAccountLimit.css';


const HeaderAccountLimit = ({isMobileMenu}) => {
    const {isLoginUser, usedCompaniesValue, companiesLimitValue, isLoading, getCompaniesInfo} = useAuth();

    useEffect(() => {
        if (isLoginUser) {
            getCompaniesInfo();
        }
    }, []);

    return (
        <div className="header__account-limit">
            {isLoading ? (
                <div className="header__account-limit-loading">
                    <img className="loading-icon" src={loading} alt="Иконка загрузки" />
                </div>
            ) : (
                <>
                    <div className={`header__used-companies-title ${
                        isMobileMenu ? "header__used-companies-title-mobile" : ""
                    }`}>
                            Использовано компаний 
                    </div>
                    <div className="header__used-companies-value">{usedCompaniesValue}</div>
                    <div className={`header__limit-companies-title ${
                        isMobileMenu ? "header__limit-companies-title-mobile" : ""
                    }`}>
                            Лимит по компаниям
                    </div>
                    <div className="header__limit-companies-value">{companiesLimitValue}</div>
                </>
            )}
        </div>
    );
};

export default HeaderAccountLimit;