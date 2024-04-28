import axios from 'axios';

export default class FoodMateAPI {

    static async findAllFoodMates(data) {
        try {
            const response = await axios.get('/foodmates', { 
                params: { 
                    orderBy: data.orderBy,
                    category: data.selectCategory,
                    region: data.region
                } 
            });
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async createFoodMate(data, accessToken) {
        try {
            const response = await axios.post('/foodmates', data, { 
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

    static async findFoodMate(id) {
        try {
            const response = await axios.get(`/foodmates/${id}`);
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async deleteFoodMate(accessToken, id) {
        try {
            const response = await axios.delete(`/foodmates/${id}`, {
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

    static async applicationFoodMate(accessToken, id) {
        try {
            const response = await axios.get(`/foodmates/${id}/application`, {
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

    static async searchFoodMates(body) {
        try {
            const response = await axios.post('/foodmates/search', {body});
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}