import React from "react";
import {useNavigate} from "react-router";
import { useAuth } from "../../../context/AuthContext.js";
import Carousel from "./Carousel/Carousel.jsx";
import Tariffs from "./Tariffs/Tariffs.jsx";
import './MainPage.css';


const MainPage = () => {
    const { isLoginUser } = useAuth();

    let navigate = useNavigate();

    const handleSearch = () => {
        navigate("/search");
    };

    return (
        <main className="main__main-page">
            <div className="container">
                <section className="about">
                    <div className="about__container">
                        <h1 className="about__title">
                            сервис по поиску публикаций <br/> о компании <br/> по его ИНН
                        </h1>
                        <p className="about__appeal">
                            <span>Комплексный анализ публикаций,</span> получение данных в формате PDF на электронную почту.
                        </p>
                        <button onClick={handleSearch} className={`main__search-button ${isLoginUser ? 'main__search-button-visible' : ''}`}>
                            Запросить данные
                        </button>
                    </div>
                </section>
                <section className="why-us">
                    <div className="why-us__container">
                        <h2 className="why-us__title">
                            Почему именно мы
                        </h2>
                        <Carousel />
                    </div>
                </section>
                <section className="tariffs">
                    <div className="tariffs__container">
                        <h2 className="tariffs__title">
                            Наши тарифы
                        </h2>
                        <Tariffs />
                    </div>
                </section>
            </div>
        </main>
    );
};

export default MainPage;