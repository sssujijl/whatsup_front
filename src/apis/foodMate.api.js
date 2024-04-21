import axios from 'axios';

export default class FoodMateAPI {

    static async findAllFoodMates(data) {
        try {
            const response = await axios.get('/foodmates', { 
                params: { 
                    orderBy: data.orderBy,
                    category: data.selectCategory
                } 
            });
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}