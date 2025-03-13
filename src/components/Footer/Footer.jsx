import React from "react";
import footer_logo from '../../assets/images/logo_transparent.svg'
import './Footer.css';


const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer__container">
                    <div className="footer__logo">
                        <img 
                            className="footer__logo-img"
                            src={footer_logo}
                            alt="Логотип" 
                        />
                    </div>
                    <div className="footer__content">
                        <div className="contacts">
                            <p>
                                г. <span className="wide-text">Москва,</span> Цветной б-р, <span className="narrow-text"> 40</span>
                            </p>
                            <p><span className="narrow-text">+7 495 771 21 11</span></p>
                            <p><span className="narrow-text">info@skan.</span>ru</p>
                        </div>
                        <div className="copyright">
                            <p>Copyright. 2022</p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;