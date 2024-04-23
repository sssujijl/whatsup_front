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
            return response.data;
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
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}