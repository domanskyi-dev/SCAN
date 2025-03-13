import React from "react";
import AuthForm from './AuthForm/AuthForm.jsx';
import './AuthPage.css';


const AuthPage = () => {
    return (
        <main className="main__auth-page">
            <div className="container">
                <section className="auth">
                    <div className="auth__container">
                        <h1 className="auth__title">
                            Для оформления подписки <br /> на тариф, необходимо <br /> авторизоваться.
                        </h1>
                        <AuthForm />
                    </div>
                </section>
            </div>
        </main>
    );
};

export default AuthPage;