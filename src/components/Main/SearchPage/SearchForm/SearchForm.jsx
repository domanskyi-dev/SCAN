import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router";
import InnField from "./InnField/InnField.jsx";
import TonalityChoice from "./TonalityChoice/TonalityChoice.jsx";
import DocumentsCount from "./DocumentsCount/DocumentsCount.jsx";
import DateRange from "./DateRange/DateRange.jsx";
import CheckboxGroup from "./CheckboxGroup/CheckboxGroup.jsx";
import './SearchForm.css';


const SearchForm = () => {
    let navigate = useNavigate();

    const [innField, setInnField] = useState('');
    const [tonalityChoice, settonalityChoice] = useState('any');
    const [documentCount, setDocumentCount] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [checkboxStates, setCheckboxStates] = useState({
        maxiFullness: false,
        businessContext: false,
        roleInPublication: false,
        onlyRiskFactors: false,
        includeTechNews: false, 
        includeAnnouncements: false,
        includeNewsBulletins: false,
    });

    const [innError, setInnError] = useState(false);
    const [docCountError, setDocCountError] = useState(false);
    const [dateError, setDateError] = useState(false);

    const [isValidForm, setIsValidForm] = useState(false);
    const [isErrorForm, setIsErrorForm] = useState(false);

    useEffect(() => {
        const isValid = innField && documentCount && startDate && endDate;
        const isError = !innError && !docCountError && !dateError;

        setIsValidForm(isValid);
        setIsErrorForm(isError);
    }, [innField, documentCount, startDate, endDate, checkboxStates, innError, docCountError, dateError]);

    const handleSubmit = async (e) => {
        e.preventDefault();
      
        if (isValidForm && isErrorForm) { 
            const searchParams = {
                issueDateInterval: {
                    startDate: new Date(startDate).toISOString(),
                    endDate: new Date(endDate).toISOString()
                },
                searchContext: {
                    targetSearchEntitiesContext: {
                        targetSearchEntities: [
                            {
                                type: "company",
                                sparkId: null,
                                entityId: null,
                                inn: innField,
                                maxFullness: checkboxStates.maxiFullness,
                                inBusinessNews: checkboxStates.businessContext || null
                            }
                        ],
                        onlyMainRole: checkboxStates.roleInPublication,
                        tonality: tonalityChoice,
                        onlyWithRiskFactors: checkboxStates.onlyRiskFactors,
                        riskFactors: {
                            and: [],
                            or: [],
                            not: []
                        },
                        themes: {
                            and: [],
                            or: [],
                            not: []
                        }
                    },
                    themesFilter: {
                        and: [],
                        or: [],
                        not: []
                    }
                },
                searchArea: {
                    includedSources: [],
                    excludedSources: [],
                    includedSourceGroups: [],
                    excludedSourceGroups: []
                },
                attributeFilters: {
                    excludeTechNews: !checkboxStates.includeTechNews,
                    excludeAnnouncements: !checkboxStates.includeAnnouncements,
                    excludeDigests: !checkboxStates.includeNewsBulletins,
                },
                similarMode: "duplicates",
                limit: Number(documentCount),
                sortType: "sourceInfluence",
                sortDirectionType: "desc",
                intervalType: "month",
                histogramTypes: [
                    "totalDocuments", 
                    "riskFactors"
                ]
            };

            navigate('/results', { state: { searchParams: searchParams } });
        } else {
            console.log('Форма не валидна');
        }
    };

    return (
        <div className="search__form-content">
            <div className="search__form-container">
                <form className="search__form" onSubmit={handleSubmit}>
                    <div className="search__form-input-container">
                        <InnField 
                            innField={innField} 
                            setInnField={setInnField}
                            innError={innError}
                            setInnError={setInnError}
                        />
                        <TonalityChoice tonalityChoice={tonalityChoice} settonalityChoice={settonalityChoice}/>
                        <DocumentsCount 
                            documentCount={documentCount} 
                            setDocumentCount={setDocumentCount}
                            docCountError={docCountError}
                            setDocCountError={setDocCountError}
                        />
                        <DateRange 
                            startDate={startDate} 
                            setStartDate={setStartDate} 
                            endDate={endDate} 
                            setEndDate={setEndDate}
                            dateError ={dateError}
                            setDateError={setDateError}
                        />
                    </div>
                    <div className="search__form-checkmarks-container">
                        <CheckboxGroup checkboxStates={checkboxStates} setCheckboxStates={setCheckboxStates}/>
                        <div className="search__form-submit-container">
                            <button 
                                type="submit"
                                className="search__form-submit-button"
                                disabled= {!isValidForm || !isErrorForm} 
                            >
                                Поиск
                            </button>
                            <div className="searc__required-notification">
                                * Обязательные к заполнению поля
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SearchForm;