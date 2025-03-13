import React from "react";
import { useAuth } from "../../../../context/AuthContext";
import checkMark from '../../../../assets/images/icon_check_mark.svg';
import './Tariffs.css';


const Tariffs = () => {
    const { isLoginUser } = useAuth();
    const currentTariff = 'Beginner';

    const handleDetails = () => {
        // Место для редиректа
    };

    const handleUserAccount = () => {
        // Место для редиректа
    };

    const tariffs = [
        {  
            id: 1,
            title: "Beginner",
            description: "Для небольшого исследования",
            newPrice: "799 ₽",
            oldPrice: "1 200 ₽",
            payment: "или 150 ₽/мес. при рассрочке на 24 мес.",
            benefits: [
                {
                    id: 1,
                    benefit: "Безлимитная история запросов",
                },
                {
                    id: 2,
                    benefit: "Безопасная сделка"
                },
                {
                    id: 3,
                    benefit: "Поддержка 24/7"
                }
            ],
        },
        {
            id: 2,
            title: "Pro",
            description: "Для HR и фрилансеров",
            newPrice: "1 299 ₽",
            oldPrice: "2 600 ₽",
            payment: "или 279 ₽/мес. при рассрочке на 24 мес.",
            benefits: [
                {
                    id: 1,
                    benefit: "Все пункты тарифа Beginner",
                },
                {   
                    id: 2,
                    benefit: "Экспорт истории"
                },
                {
                    id: 3,
                    benefit: "Рекомендации по приоритетам"
                }
            ],
        },
        {
            id: 3,
            title: "Business",
            description: "Для корпоративных клиентов",
            newPrice: "2 379 ₽",
            oldPrice: "3 700 ₽",
            payment: <br/>,
            benefits: [
                {
                    id: 1,
                    benefit: "Все пункты тарифа Pro",
                },
                {
                    id: 2,
                    benefit: "Безлимитное количество запросов"
                },
                {
                    id: 3,
                    benefit: "Приоритетная поддержка"
                }
            ],
        }
    ];

    return (
        <div className="tariffs__cards-container">
            {tariffs.map((tariff, tariffIndex) => {
                const isCurrentTariff = isLoginUser && tariff.title === currentTariff;
                
                return(
                    <div key={tariffIndex} className={`tariffs__cards-item ${isCurrentTariff ? `border__${tariff.title}` : ''}`}>
                        <div 
                            className={`tariffs__card-header background__${tariff.title}`}
                        >
                            <div className="tariffs__card-title">
                                <h3>{tariff.title}</h3>
                            </div>
                            <div className="tariffs__card-description">
                                <p>{tariff.description}</p>
                            </div>
                        </div>
                        <div className="tariffs__card-content">
                            <div className="tariffs__card-price">
                                <div className={`tariffs__card-badge ${isCurrentTariff ? 'tariffs__card-badge-visible' : ''}`}>
                                    Текущий тариф
                                </div>
                                <div className="tariffs__card-price-value">
                                    <div className="tariffs__card-price-new">{tariff.newPrice}</div>
                                    <div className="tariffs__card-price-old">{tariff.oldPrice}</div>
                                </div>
                                <div className="tariffs__card-payment">
                                    {tariff.payment}
                                </div>
                            </div>
                            <div className="tarriffs__card-benefits">
                                <div className="tarriffs__card-benefits-title">
                                    <h4>В тариф входит:</h4>
                                </div>
                                <ul className="tarriffs__card-benefits-list">
                                    {tariff.benefits.map((item, benefitIndex) => (
                                        <li key={benefitIndex} className="tarriffs__card-benefits-item">
                                            <img className="tarriffs__card-benefits-icon" src={checkMark} alt="Галочка"/>
                                            {item.benefit}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <button 
                                className={`tariffs__card-button ${isCurrentTariff ? 'tariffs__card-button-current' : ''}`}
                                onClick={isCurrentTariff ? handleUserAccount : handleDetails}
                            >
                                {isCurrentTariff ? 'Перейти в личный кабинет' : 'Подробнее'}
                            </button>
                        </div>
                    </div>
                )
            })}
        </div>
    );
};

export default Tariffs;