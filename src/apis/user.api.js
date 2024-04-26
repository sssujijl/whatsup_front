import axios from 'axios';

export default class UserAPI {

    static async signUp(data) {
        try {
            console.log(data);
            const response = await axios.post('/users/signup', data);
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async verificationCode(data) {
        try {
            const response = await axios.post('/users/checkVerification', data);
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async checkDuplicate(data) {
        try {
            const response = await axios.post('/users/checkDuplicate', data);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    static async signin(data) {
        try {
            const response = await axios.post('/users/signin', data, {
                withCredentials: true,
            });
            console.log(response)
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async findUser(accessToken) {
        try {
            const response = await axios.get('/users', {
                headers: {
                    Cookie: accessToken
                }
            });
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async getUser(accessToken, password) {
        try {
            const response = await axios.post('/users/info', { password }, {
                headers: {
                    Cookie: accessToken
                }
            });
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    
    static async getUserInfo(accessToken) {
        try {
            const response = await axios.get('/users/info', {
                headers: {
                    Cookie: accessToken
                }
            });
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async top3Title(accessToken) {
        try {
            const response = await axios.get('/titles/top3', {
                headers: {
                    Cookie: accessToken
                }
            });
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async secession(accessToken, password) {
        try {
            const response = await axios.delete('/users', { password }, {
                headers: {
                    Cookie: accessToken
                }
            })
            
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async editUser(data) {
        try {
            const response = await axios.patch('/users', data);
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async googleLogin() {
        try {
            const response = await axios.get('/users/signin/google');
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async naverLogin() {
        try {
            const response = await axios.get('/users/signin/naver');
            console.log(response);
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}