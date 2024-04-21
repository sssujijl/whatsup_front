import axios from 'axios';

export default class PlaceAPI {

    static async findAllPlace(data) {
        try {
            const dong = data.userAddress.match(/\s(\S+동)\s/)[1];
            const response = await axios.post('/places', {dong}, {
                params: { category: data.selectCategory }
            });
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async findPlace(data) {
        try {
            const response = await axios.get('/places' + data.placeId);
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async scraping(data) {
        try {
            const response = await axios.post('/puppeteer/scraping', data);
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
      
    static async findAllFoodCategory() {
        try {
            const response = await axios.get('/places/foodCategory');
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}