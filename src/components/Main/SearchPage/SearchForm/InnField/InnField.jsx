import React, {useState} from "react";


const InnField = ({innField, setInnField, innError, setInnError}) => {

    const [errorText, setErrorText] = useState('');

    const validateInn = (inn) => {
        let message = '';
        let result = false;

        if (typeof inn === 'number') {
            inn = inn.toString();
        } else if (typeof inn !== 'string') {
            inn = '';
        }

        if (!inn.length) {
            message = 'Обязательное поле';
            result = true;
        } else if (/[^0-9]/.test(inn)) {
            message = 'Введите корректные данные';
            result = true;
        } else if ([10, 12].indexOf(inn.length) === -1) {
            message = 'Введите корректные данные';
            result = true;
        } else {
            const checkDigit = (inn, coefficients) => {
                let n = 0;
                for (let i = 0; i < coefficients.length; i++) {
                    n += coefficients[i] * inn[i];
                }
                return parseInt(n % 11 % 10, 10);
            };
            switch (inn.length) {
                case 10:
                    var n10 = checkDigit(inn, [2, 4, 10, 3, 5, 9, 4, 6, 8]);
                    if (n10 === parseInt(inn[9], 10)) {
                        result = false;
                    } else {
                        message = 'Введите корректные данные';
                        result = true;
                    }
                    break;
                case 12:
                    var n11 = checkDigit(inn, [7, 2, 4, 10, 3, 5, 9, 4, 6, 8]);
                    var n12 = checkDigit(inn, [3, 7, 2, 4, 10, 3, 5, 9, 4, 6, 8]);
                    if ((n11 === parseInt(inn[10], 10)) && (n12 === parseInt(inn[11], 10))) {
                        result = false;
                    } else {
                        message = 'Введите корректные данные';
                        result = true;
                    }
                    break;
                }
        }
        setInnError(result);
        setErrorText(message);
    };

    return (
        <div className='search__form-item'>
            <label className='search__form-item-label' htmlFor="inn">
                ИНН компании 
                <span className={`search_form-required-mark ${ innError ? 'search_form-required-mark-error' : ''}`}>*</span>
            </label>
            <div className="search__form-item-input">
                <input 
                    className={`search__form-input ${ innError ? 'search__form-input-error' : ''}`}
                    name="inn"
                    id="inn"
                    type="text"
                    value={innField}
                    placeholder="10 цифр"
                    onChange={(e) => {
                        setInnField(e.target.value);
                        setInnError(false);
                        setErrorText('');
                    }}
                    onBlur={() => validateInn(innField)}
                />
                <div className="search__form-item-error">
                    {innError && errorText}
                </div>
            </div>
        </div>
    );
};

export default InnField;