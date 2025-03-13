import React from "react";
import {Link} from "react-router";
import './HeaderNavigation.css';


const HeaderNavigation = ({isMobileMenu, switchMenu}) => {

    const handleClick = () => {
        if (isMobileMenu) {
            switchMenu();
        }
    }

    return (
        <nav className={`header__navigation ${
                isMobileMenu ? "header__mobile-navigation" : ""
            }`}
        >
                <Link onClick={handleClick} to="/" className="header__nav-link">Главная</Link>
                <Link className="header__nav-link">Тарифы</Link>
                <Link className="header__nav-link">FAQ</Link>
        </nav>
    )
};

export default HeaderNavigation;