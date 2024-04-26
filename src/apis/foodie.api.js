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
            return response;
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
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}