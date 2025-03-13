import React, {useEffect, useState} from "react";
import { useAuth } from "../../context/AuthContext.js";
import HeaderNavigation from "./HeaderNavigation/HeaderNavigation.jsx";
import HeaderAccountLimit from "./HeaderAccountLimit/HeaderAccountLimit.jsx";
import HeaderAuth from "./HeaderAuth/HeaderAuth.jsx";
import HeaderUser from "./HeaderUser/HeaderUser.jsx";
import header_logo from '../../assets/images/logo.svg';
import header_logo_transparent from '../../assets/images/logo_transparent.svg';
import menu from '../../assets/images/menu.svg';
import cross from '../../assets/images/cross.svg';
import './Header.css';


const Header = () => {
    const { isLoginUser, setIsLoginUser } = useAuth();
    const [isMobile, setIsMobile] = useState(window.innerWidth < 725);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            const tokenExpire = localStorage.getItem('tokenExpire');
            console.log('Проверка токена.');
            const now = new Date();
      
            if (!tokenExpire || new Date(tokenExpire) <= now) {
                setIsLoginUser(false);
                localStorage.removeItem('accessToken');
                localStorage.removeItem('tokenExpire');
            }
        }, 6000);
      
        return () => clearInterval(interval);
    }, []);


    useEffect (() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 725);
        };
        window.addEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (!isMobile && isMenuOpen) {
            setIsMenuOpen(false);
        }
    }, [isMobile]);

    const switchMenu = () => {
        if (isMenuOpen) {
            setIsMenuOpen(false);
        } else {
            setIsMenuOpen(true);
        }
    }

    const isMobileMenu = isMobile && isMenuOpen;

    return (
        <header className="header">
            <div className="container">
                <div className="header__container">
                    <div className={isMenuOpen ? "header__logo-transparent": "header__logo"}>
                        <img className="header__logo-img" src={header_logo} alt="Логотип" />
                        <img className="header__logo-transparent-img" src={header_logo_transparent} alt="Логотип" />
                    </div>
                    <div className="header__content">
                        <HeaderNavigation isMobileMenu={isMobileMenu} switchMenu={switchMenu} />
                        {isLoginUser && <HeaderAccountLimit isMobileMenu={isMobileMenu} />}
                        {isLoginUser ?
                            <HeaderUser isMobileMenu={isMobileMenu} switchMenu={switchMenu} />
                            :
                            <HeaderAuth isMobileMenu={isMobileMenu} switchMenu={switchMenu} />
                        }
                    </div>
                    {isMobile && (
                        <button className="header__switch-button" onClick={switchMenu}>
                            <img 
                                className={isMenuOpen ? "icon-cross" : "icon-menu"} 
                                src={isMenuOpen ? cross : menu} 
                                alt="Кнопка открытия меню" />
                        </button>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;