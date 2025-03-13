import React from "react";


const TonalityChoice = ({tonalityChoice, settonalityChoice}) => {
    return (
        <div className='search__form-item'>
            <label className='search__form-item-label' htmlFor="tonality">
                Тональность
            </label>
            <div className="search__form-item-select">
                <select
                    id="tonality"
                    className="search__form-select"
                    value={tonalityChoice}
                    onChange={(e) => settonalityChoice(e.target.value)}
                >
                    <option value="any">Любая</option>
                    <option value="positive">Позитивная</option>
                    <option value="negative">Негативная</option>
                </select>
            </div>
        </div>
    );
};

export default TonalityChoice;