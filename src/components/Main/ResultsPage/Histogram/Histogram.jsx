import React from "react";
import {Swiper, SwiperSlide} from 'swiper/react';
import {Navigation} from 'swiper/modules';
import swipe_arrow from '../../../../assets/images/carousel_arrow.svg';
import loading_icon from '../../../../assets/images/icon-loading.svg';
import 'swiper/css';
import 'swiper/css/navigation';
import './Histogram.css';


const Histogram = ({histogramData, isLoading}) => {
    const isNotActive = isLoading || histogramData?.length === 0;

    return (
        <div className="results__histogram">
            <button className={`results__histogram-button results__histogram-button-prev ${isNotActive ? 'not-active' : ''}`}>
                <img src={swipe_arrow} alt="Стрелка влево" className="image-button-left" />
            </button>
            <div className="results__histogram-content">
                <div className="results__histogram-header">
                    <div className="header-item">Период</div>
                    <div className="header-item">Всего</div>
                    <div className="header-item">Риски</div>
                </div>

                {isLoading ? (
                    <div className="results__histogram-body">
                        <div className="results__loader">
                            <img src={loading_icon} alt="Иконка загрузки" className="results__loading-icon" />
                            <div className="results__loader-description">Загружаем данные</div>
                        </div>
                    </div>
                 ) : (
                    histogramData?.length > 0 ? (
                        <Swiper
                            className="results__histogram-body"
                            modules={[Navigation]}
                            watchOverflow={false}
                            spaceBetween={0}
                            slidesPerView="auto"
                            navigation={{
                                prevEl: '.results__histogram-button-prev',
                                nextEl: '.results__histogram-button-next'
                            }}
                            breakpoints={{
                                0: {
                                    slidesPerView: 1
                                },
                                429: {
                                    slidesPerView: "auto"
                                }
                            }}
                        >
                            {histogramData?.map((item, index) => (
                                <SwiperSlide
                                    key={index}
                                >
                                    <div className="results__histogram-card">
                                        <p className="card-item">{item.date}</p>
                                        <p className="card-item">{item.totalDocs}</p>
                                        <p className="card-item">{item.risks}</p>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    ) : (
                        <div className="results__histogram-body">
                            <div className="results__loader">
                                <div className="results__loader-description">Данные не найдены</div>
                            </div>
                        </div>
                    )
                )}

            </div>
            <button className={`results__histogram-button results__histogram-button-next ${isNotActive ? 'not-active' : ''}`}>
                <img src={swipe_arrow} alt="Стрелка вправо" className="image-button-right" />
            </button>
        </div>
    );
};

export default Histogram;