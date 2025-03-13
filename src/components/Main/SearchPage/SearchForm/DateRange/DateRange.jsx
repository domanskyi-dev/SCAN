import React, {useState} from "react";
import "react-datepicker/dist/react-datepicker.css";


const DateRange = ({startDate, setStartDate, endDate, setEndDate, dateError, setDateError}) => {

    const [errorText, setErrorText] = useState('');
    const [inputTypeStart, setInputTypeStart] = useState('text');
    const [inputTypeEnd, setInputTypeEnd] = useState('text');
    
    const validateDateRange = () => {
        const currentDate = new Date();
        currentDate.setHours(3, 0, 0, 0);

        let result = false;
        let message = '';

        if (!startDate || !endDate) {
            result = true;
            message = 'Обязательное поле';
        } else if (new Date(startDate) > new Date(endDate)) {
            result = true;
            message = 'Введите корректные данные';
        } else if (new Date(startDate) > currentDate || new Date(endDate) > currentDate) {
            result = true;
            message = 'Введите корректные данные';
        } else {
            result = false;
            message = '';
        }

        setDateError(result);
        setErrorText(message);
    };

    return (
        <div className='search__form-item'>
            <label className='search__form-item-label' htmlFor="documents">
                Диапазон поиска 
                <span className={`search_form-required-mark ${ dateError ? 'search_form-required-mark-error' : ''}`}>*</span>
            </label>
            <div className="search__form-item-input">
                <div className="search_form-date">
                    <input
                        className={`search__form-date-input ${ dateError ? 'search__form-input-error' : ''}`}
                        id="startDate"
                        name="startDate"
                        type={inputTypeStart}
                        value={startDate}
                        placeholder="Дата начала"
                        onFocus={() => setInputTypeStart('date')}
                        onChange={(e) => {
                            setStartDate(e.target.value);
                            setDateError(false);
                            setErrorText('');
                        }}
                        onBlur={() => {
                        validateDateRange();
                        if (!startDate) setInputTypeStart('text');
                        }}
                    />
                    <input
                        className={`search__form-date-input ${ dateError ? 'search__form-input-error' : ''}`}
                        id="endDate"
                        name="endDate"
                        type={inputTypeEnd}
                        value={endDate}
                        placeholder="Дата конца"
                        onFocus={() => setInputTypeEnd('date')}
                        onChange={(e) => {
                            setEndDate(e.target.value);
                            setDateError(false);
                            setErrorText('');
                        }}
                        onBlur={() => {
                        validateDateRange();
                        if (!endDate) setInputTypeEnd('text');
                        }}
                    />
                </div>
                <div className="search__form-item-error">
                    {dateError && errorText}
                </div>
            </div>
        </div>
    );
};

export default DateRange;