import React, {useState, useEffect} from "react";
import carousel_arrow from '../../../../assets/images/carousel_arrow.svg';
import watchIcon from '../../../../assets/images/icon-watch.svg';
import searchIcon from '../../../../assets/images/icon-search.svg';
import lockIcon from '../../../../assets/images/icon-lock.svg';
import './Carousel.css';


const Carousel = () => {

    const [currentItem, setCurrentItem] = useState(3);
    const [visibleCount, setVisibleCount] = useState(3);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 935) {
                setVisibleCount(1);
            } else if (window.innerWidth <= 1315) {
                setVisibleCount(2);
            } else {
                setVisibleCount(3);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const items = [
        {
            id: 1,
            text: "Высокая и оперативная скорость обработки заявки",
            img: watchIcon
        }, 
        {
            id: 2,
            text: "Огромная комплексная база\n данных, обеспечивающая\n объективный ответ на запрос",
            img: searchIcon
        },
        {
            id: 3,
            text: "Защита конфиденциальных сведений, не подлежащих разглашению по федеральному законодательству",
            img: lockIcon
        }
    ];

    const duplicatedItems = [...items, ...items, ...items];
    const visibleItems = duplicatedItems.slice(currentItem, currentItem + visibleCount);

    const handleNext = () => {
        if (currentItem + visibleCount === duplicatedItems.length - 1) {
            setCurrentItem(3);
        } else {
            setCurrentItem(currentItem + 1);
        };
    };

    const handlePrev = () => {
        if (currentItem === 1) {
            setCurrentItem(3);
        } else {
            setCurrentItem(currentItem - 1);
        };
    };

    return (
        <div className="carousel__container">
            <button className="carousel__button" onClick={handlePrev}>
                <img className="carousel__left-arrow-img" src={carousel_arrow} alt="Стрелка влево"/>
            </button>
            <div className="carousel__content">
                {visibleItems.map((item, index) => (
                    <div key={index} className="carousel__item">
                        <div className="carousel__item-img">
                            <img className="carousel__item-img-icon" src={item.img} alt="Изображение карточки слайда" />
                        </div>
                        <div className="carousel__item-text" style={{whiteSpace: 'pre-line'}}>
                            {item.text}
                        </div>
                    </div>
                ))}
            </div>
            <button className="carousel__button" onClick={handleNext}>
                <img className="carousel__right-arrow-img" src={carousel_arrow} alt="Стрелка вправо"/>
            </button>
        </div>
    );
};

export default Carousel;