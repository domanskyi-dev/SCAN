import React from "react";


const CheckboxGroup = ({checkboxStates, setCheckboxStates}) => {

    const labels = {
        maxiFullness: "Признак максимальной полноты",
        businessContext: "Упоминания в бизнес-контексте",
        roleInPublication: "Главная роль в публикации",
        onlyRiskFactors: "Публикации только с риск-факторами",
        includeTechNews: "Включать технические новости рынков",
        includeAnnouncements: "Включать анонсы и календари",
        includeNewsBulletins: "Включать сводки новостей",
    };

    const handleCheckboxChange = (event) => {
        const { name, checked } = event.target;
        setCheckboxStates(prevState => ({
          ...prevState,
          [name]: checked,
        }));
    };

    return (
        <div className="search__form-checkmarks-items">
            {Object.keys(checkboxStates).map((key) => (
                <div key={key} className="search__form-checkbox-container">
                <input
                    className="checkbox-icon"
                    id={`checkbox-${key}`}
                    type="checkbox"
                    name={key}
                    checked={checkboxStates[key]}
                    onChange={handleCheckboxChange}
                    
                />
                <label htmlFor={`checkbox-${key}`} className={checkboxStates[key] ? "checkbox-label" : ""}>
                    <span className="custom-checkbox"></span>
                    <span className="checkbox-label-text">{labels[key]}</span>
                </label>
                </div>
            ))}
        </div>
    );
};

export default CheckboxGroup;