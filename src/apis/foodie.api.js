import axios from 'axios';

export default class FoodieAPI {

    static async findAllFoodie(data) {
        try {
            const response = await axios.get('/foodies');
            console.log(response.data)
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}