import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { searchService } from "../../../services/searchService.js";
import {formatedData, plural} from "../../../utils/formatHistogramData.js";
import { parseDocuments } from "../../../utils/formatDocumentData.js";
import Histogram from "./Histogram/Histogram.jsx";
import Publication from "./Publication/Publication.jsx";
import loading_icon from '../../../assets/images/icon-loading.svg';
import './ResultsPage.css';


const ResultsPage = () => {

    const navigate = useNavigate();
    const location = useLocation();

    const [isLoading, setIsLoading] = useState(true);
    const [isDocumentsLoading, setIsDocumentsLoading] = useState(true);

    const [histogramData, setHistogramData] = useState(null);
    const [resultCount, setResultCount] = useState(0);
    const [wordEnding, setWordEnding] = useState('');

    const [documentsData ,setDocumentsData] = useState(null);
    const [visibleDocumentsCount, setVisibleDocumentsCount] = useState(10);

    const handleShowMore = () => {
        setVisibleDocumentsCount(prevCount => prevCount + 10);
    };

    useEffect(() => {

        const searchResults = async () => {
            const searchParams = location.state?.searchParams;

            setIsLoading(true);
   
            setIsDocumentsLoading(true);

            if (!searchParams) {
                console.log('Отсутствуют параметры запроса');
                setIsLoading(false);
                navigate('/search');
                return;
            }

            try {
                const histogramResponse = await searchService.histogram(searchParams);
                const formatedHistogramData = formatedData(histogramResponse);
                const wordEnding = plural(formatedHistogramData?.length)

                const getIdsResponse = await searchService.getIds(searchParams);
                const documentsIds = getIdsResponse.items?.map(item => item.encodedId);

                setIsDocumentsLoading(true);
                const getDocumentsResponse = await searchService.getDocuments({ ids : documentsIds });

                if (getDocumentsResponse?.length) {
                    const parsedPublications = getDocumentsResponse.map(document => parseDocuments(document));
                    setDocumentsData(parsedPublications);
                } else {
                    setDocumentsData([]);
                }

                setHistogramData(formatedHistogramData);
                setResultCount(formatedHistogramData?.length);
                setWordEnding(wordEnding);
            } catch (error) {
                console.log(error.message);
            } finally {
                setIsLoading(false);
                setIsDocumentsLoading(false);
            }          
        };

        searchResults();
    }, []);

    return (
        <main className="main__result-page">
            <div className="container">
                <div className="results">
                    <section className="results__header">
                        <div className="results__header-container">
                            <h1 className="results__header-title">
                                Ищем. Скоро <br/> будут результаты
                            </h1>
                            <p className="results__header-appeal">
                                <span>Поиск может занять некоторое время,</span> <br/> просим сохранять терпение.
                            </p>
                        </div>
                    </section>

                    <section className="results__summary">
                        <div className="results__summary-container">
                            <h2 className="results__summary-title">
                                Общая сводка
                            </h2>
                            <p className="results__summary-appeal">
                                {isLoading ? 'Ищем варианты' :
                                    (resultCount ? (
                                            `Найдено ${resultCount} вариант${wordEnding}`
                                        ) : ('Данные не найдены')
                                    )
                                }
                            </p>
                            <div className="results__summary-histogram">
                                <Histogram histogramData={histogramData} isLoading={isLoading} setIsLoading={setIsLoading}/>
                            </div>
                        </div>
                    </section>

                    <section className="results__documents">
                        <div className="results__documents-container">
                            <h2 className="results__documents-title">
                                Список документов
                            </h2>
                            <div className={
                                `results__documents-publications ${
                                    isLoading || (isDocumentsLoading && !documentsData?.length) ? 'results__documents-loading' : ''
                                }`
                            }>
                                {isLoading || (isDocumentsLoading && !isDocumentsLoading?.length) ? '' :
                                    (documentsData.slice(0, visibleDocumentsCount).map((document, index) => (
                                        <Publication key={index} document={document}/>
                                    )))
                                }
                            </div>

                            {isLoading || isDocumentsLoading ?
                                (
                                    <div className="results__documents-loader">
                                        <img src={loading_icon} alt="Иконка загрузки" className="results__documents-loading-icon" />
                                        <div className="results__documents-loader-description">Загружаем документы</div>
                                    </div>
                                ) : (
                                    <>
                                        {visibleDocumentsCount < documentsData?.length && (
                                            <button className="results__see-more-button" onClick={handleShowMore}>Показать больше</button>
                                        )}
                                    </>
                                )}
                        </div>
                    </section>
                </div>
            </div>
        </main>
    );
};

export default ResultsPage;