import axios from 'axios';

export default class FoodieAPI {

    static async findAllFoodie(data) {
        try {
            console.log(data);
            const response = await axios.get('/foodies', { 
                params: { orderBy: data } 
            });
            console.log(response.data)
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}