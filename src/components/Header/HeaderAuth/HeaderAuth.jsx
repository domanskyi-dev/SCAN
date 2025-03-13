import React from "react";
import {Link} from "react-router";
import {useNavigate} from "react-router";
import './HeaderAuth.css';


const HeaderAuth = ({isMobileMenu, switchMenu}) => {
    let navigate = useNavigate();

    const handleLogin = () => {
        if (isMobileMenu) {
            switchMenu();
        }
        navigate("/login");
    };

    return (
        <div className={`header__auth ${
            isMobileMenu ? "header__mobile-auth" : ""
        }`}>
            <Link className="header__auth-link">Зарегистрироваться</Link>
            <button onClick={handleLogin} className="header__login-button">Войти</button>
        </div>
    );
};

export default HeaderAuth;