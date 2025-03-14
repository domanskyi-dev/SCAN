import React, { useState, useEffect } from "react";
import {useNavigate} from "react-router";
import {Link} from "react-router";
import { useAuth } from "../../../../context/AuthContext.js";
import { authService } from "../../../../services/authService.js";
import google from '../../../../assets/images/logo_google.svg';
import facebook from '../../../../assets/images/logo_facebook.svg';
import yandex from '../../../../assets/images/logo_yandex.svg';
import './AuthForm.css';


const LoginForm = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [authError, setAuthError] = useState(false);
    const [loginInProgress, setLoginInProgress] = useState(false);

    const {isLoginUser, setIsLoginUser} = useAuth();
    let navigate = useNavigate();

    useEffect(() => {
        if (isLoginUser) {
          navigate('/');
        }
    }, [isLoginUser, navigate]);

    const handleLogin = async(e) => {
        e.preventDefault();

        try {
            setAuthError(false);
            setLoginInProgress(true);
            const response = await authService.login(login, password);
            localStorage.setItem('accessToken', response.accessToken);
            localStorage.setItem('tokenExpire', response.expire);
            setIsLoginUser(true);
            setAuthError(false);
            navigate('/');
        } catch (error) {
            setAuthError(true);
        } finally {
            setLoginInProgress(false);
        }
    }

    const validateLogin = (value) => {
        const phoneRegex = /^(\+7|8)\d{10}$/;
        const usernameRegex = /^[a-zA-Z0-9_]+$/;

        if (value.length === 0) {
            return false;
        }

        if (value.startsWith('+7') || value.startsWith('8')) {
            if (phoneRegex.test(value)) {
                return false;
            } else {
                return true;
            };
        };

        if (value.length < 3 || value.length > 20) {
            return true;
        };

        if (usernameRegex.test(value)) {
            return false
        } else {
            return true;
        };
    };

    const validatePassword = (value) => {
        if (value.length === 0) {
            return false;
        }

        if (value.length < 6) {
            return true;
        }
        return false;
    };

    const handleLoginChange = (e) => {
        setLogin(e.target.value);
        setAuthError(false);
        setLoginError(false);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        setAuthError(false);
        setPasswordError(false);
    };

    const handleLoginBlur = (e) => {
        const value = e.target.value;
        const error = validateLogin(value);
        setLoginError(error);
    };

    const handlePasswordBlur = (e) => {
        const value = e.target.value;
        const error = validatePassword(value);
        setPasswordError(error);
    };

    return (
        <div className="auth__form">
            <div className="auth__form-header">
                <button className="login-button">Войти</button>
                <button className="signup-button">Зарегистрироваться</button>
            </div>
            <div className="auth__form-body">
                <form onSubmit={handleLogin}>
                    <div className='auth__login-form'>
                        <label className='auth__login-form-label' htmlFor="login">Логин или номер телефона:</label>
                        <div className="auth__login-form-input">
                            <input 
                                id="login"
                                className={`form-input ${loginError ? 'form-input-error' : ''}`}
                                type="text"
                                name="login"
                                value={login}
                                onChange={handleLoginChange}
                                onBlur={handleLoginBlur}
                            />
                            <div className="auth__login-form-error">
                                {loginError && 'Введите корректные данные'}
                            </div>
                        </div>
                    </div>

                    <div className="auth__login-form">
                        <label className='auth__login-form-label' htmlFor="password">Пароль:</label>
                        <div className='auth__login-form-input'>
                            <input 
                                id="password"
                                className={`form-input ${passwordError ? 'form-input-error' : ''}`}
                                type="password"
                                name="password"
                                value={password}
                                onChange={handlePasswordChange}
                                onBlur={handlePasswordBlur}
                            />
                            <div className="auth__login-form-error">
                                {passwordError && 'Неправильный пароль'}
                                {authError && 'Неправильное имя или пароль'}
                            </div>
                        </div>
                    </div>

                    <button 
                        type="submit"
                        className="auth__login-form-submit-button"
                        disabled={loginInProgress || !login || !password || loginError || passwordError}
                    >
                        {loginInProgress ? 'Вход...' : 'Войти'}
                    </button>
                </form>
                <div className="auth__password-recovery">
                    <Link className="auth__password-recovery-link">Восстановить пароль</Link>
                </div>
            </div>
            <div className="auth__form-footer">
                <div className="auth__oauth-title">
                    Войти через:
                </div>
                <div className="auth__oauth-link-list">
                    <Link className="auth__oauth-link"><img className="google-logo" src={google} alt="Логотип Google"/></Link>
                    <Link className="auth__oauth-link"><img className="facebook-logo" src={facebook} alt="Логотип Facebook"/></Link>
                    <Link className="auth__oauth-link"><img className="yandex-logo" src={yandex} alt="Логотип Yandex"/></Link>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
