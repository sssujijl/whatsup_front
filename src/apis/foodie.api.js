import axios from 'axios';

export default class FoodieAPI {

    static async findAllFoodie(data) {
        try {
            const response = await axios.get('/foodies', {
                params: {
                    orderBy: data.orderBy,
                    category: data.selectCategory
                }
            });
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async createFoodie(data, accessToken) {
        try {
            const response = await axios.post('/foodies', data, {
                headers: {
                    Cookie: accessToken
                },
            });
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async findFoodie(id) {
        try {
            const response = await axios.get(`/foodies/${id}`);
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async deleteFoodie(accessToken, id) {
        try {
            const response = await axios.delete(`/foodies/${id}`, {
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

    static async createFoodieAnswer(data, accessToken, foodieId) {
        try {
            const response = await axios.post(`/foodie/${foodieId}/foodie_answer`, data, {
                headers: {
                    Cookie: accessToken
                },
            });
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async checkTitle(accessToken, foodieId) {
        try {
            const response = await axios.get(`/foodie/${foodieId}/foodie_answer/validate`, {
                headers: {
                    Cookie: accessToken
                },
            });
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async findAllAnswers(foodieId) {
        try {
            const response = await axios.get(`/foodie/${foodieId}/foodie_answer`);
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async deleteAnswer(accessToken, foodieId, foodieAnswerId) {
        try {
            const response = await axios.delete(`/foodie/${foodieId}/foodie_answer/${foodieAnswerId}`, {
                headers: {
                    Cookie: accessToken
                },
            });
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async searchFoodies(body) {
        try {
            const response = await axios.post('/foodies/search', {body});
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}