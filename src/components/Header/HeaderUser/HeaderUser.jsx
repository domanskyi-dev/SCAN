import React from "react";
import {useNavigate} from "react-router";
import { useAuth } from "../../../context/AuthContext";
import avatar from '../../../assets/images/avatar.png';
import './HeaderUser.css';

const HeaderUser = ({isMobileMenu, switchMenu}) => {
    const {setIsLoginUser} = useAuth();
    let navigate = useNavigate();

    const handleLogout = () => {
        setIsLoginUser(false);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('tokenExpire');

        if (isMobileMenu) {
            switchMenu();
        }
        navigate("/");
    };

    return (
        <div className={`header__user ${
            isMobileMenu ? "header__mobile-user" : ""
        }`}>
            <span className="header__user-name">Алексей А.</span>
            <div className="header__user-avatar">
                <img
                    className="header__avatar-image"
                    src={avatar} 
                    alt="Аватар пользователя" 
                />
            </div>
            <button onClick={handleLogout} className="header__logout-button">Выйти</button>
        </div>
    );
};

export default HeaderUser;