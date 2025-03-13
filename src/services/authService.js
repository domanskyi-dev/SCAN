import api from "../http/index.js";


export const authService = {
    async login(login, password) {
        try {
            const response = await api.post('/account/login', {login, password});
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || "Ошибка авторизации");
        }
    },

    async info() {
        try {
            const response = await api.get('/account/info');
            return response.data
        } catch (error) {
            throw new Error(error.response?.data?.message || "Ошибка получения информации об аккаунте");
        }
    }
}