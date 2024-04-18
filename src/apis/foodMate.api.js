import axios from 'axios';

export default class FoodMateAPI {

    static async findAllFoodMates(data) {
        try {
            const response = await axios.get('/foodmates');
            console.log(response.data.data)
            return response.data.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}