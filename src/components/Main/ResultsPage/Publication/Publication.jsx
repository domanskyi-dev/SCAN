import React from "react";
import dafaultImg from '../../../../assets/images/results_default_img_1.svg';
import './Publication.css';


const Publication = ({document}) => {

    const plural = (number) => {
        if (number % 100 <= 14 && number >= 11) {
            return '';
        } else if (number % 10 <= 4 && number % 10 >= 2) {
            return 'а';
        } else if (number % 10 === 1) {
            return 'о';
        } else {
            return '';
        }
    };

    const lengthLimit = (string) => {
        if (string.length >= 90) {
            return string.slice(0, 90) + '...'
        } else {
            return string
        }
    };

    return (
        <div className="results__publication">
            <div className="results__publication__header">
                <div className="publication-issue-date">{document.issueDate}</div>
                <a href={document.url} target="_blank" className="publication-source-name">{document.sourceName}</a>
            </div>
            <div className="results__publication-body">
                <h3 className="publication__body-title">
                    {lengthLimit(document.titleText)}
                </h3>
                <div className="publication__body-tags">
                    {document.tags.length > 0 ?
                        (document.tags.map((tag, index) => (
                                <div className="single-tag" key={index}>
                                    {tag}
                                </div>
                            ))
                        )
                        : 
                        (
                            <div className="single-tag">
                                Технические новости
                            </div>
                        )
                    }
                </div>
                <div className="publication__body-image-container">
                    <img src={
                        document.imageSource
                        ? document.imageSource
                        : dafaultImg
                    } alt="Изображение публикации"
                         className="publication__body-image"/>
                </div>
                <div className="publication__body-text-container">
                    <pre className="publication__body-text">
                        {document.contentText}
                    </pre>
                </div>
            </div>
            <div className="results__publication-footer">
                <a href={document.url} target="_blank" className="publication-source-url">
                    <button className="publication-source-button">Читать в источнике</button>
                </a>
                <p className="publication-word-count">{document.wordCount} слов{plural(document.wordCount)}</p>
            </div>
        </div>
    );
};

export default Publication;