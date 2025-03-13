import React, {useState} from "react";


const DocumentsCount = ({documentCount, setDocumentCount, docCountError, setDocCountError}) => {

    const [errorText, setErrorText] = useState('');

    const validateDocumentCount = (value) => {
        let result = false;
        let message = '';

        if (value === '') {
            result = true;
            message = 'Обязательное поле';
        } else {
            const num = parseInt(value)
            result = !isNaN(num) && num >= 1 && num <= 1000 ? false : true;
            if (result === true) {
                message = 'Введите корректные данные';
            }
        }
        setDocCountError(result);
        setErrorText(message);
    };

    return (
        <div className='search__form-item'>
            <label className='search__form-item-label' htmlFor="documents">
                Количество документов в выдаче 
                <span className={`search_form-required-mark ${ docCountError ? 'search_form-required-mark-error' : ''}`}>*</span>
            </label>
            <div className="search__form-item-input">
                <input 
                    className={`search__form-input ${ docCountError ? 'search__form-input-error' : ''}`}
                    name="documents"
                    id="documents"
                    type="text"
                    value={documentCount}
                    placeholder="От 1 до 1000"
                    onChange={(e) => {
                        setDocumentCount(e.target.value);
                        setDocCountError(false);
                        setErrorText('');
                    }}
                    onBlur={() => validateDocumentCount(documentCount)}
                />
                <div className="search__form-item-error">
                    {docCountError && errorText}
                </div>
            </div>
        </div>
    );
};

export default DocumentsCount;