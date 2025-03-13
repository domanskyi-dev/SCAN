import React from "react";
import SearchForm from "./SearchForm/SearchForm.jsx";
import './SearchPage.css';


const SearchPage = () => {

    return (
        <main className="main__search-page">
            <div className="container">
                <section className="search">
                    <div className="search__container">
                        <h1 className="search__title">
                            Найдите необходимые <br/> данные в пару кликов.
                        </h1>
                        <p className="search__appeal">
                            Задайте параметры поиска. <br/> <span>Чем больше заполните,</span> тем точнее поиск
                        </p>
                        <SearchForm />
                    </div>
                </section>
            </div>
        </main>  
    );
};

export default SearchPage;