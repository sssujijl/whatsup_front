import axios from 'axios';

export default class PlaceAPI {

    static async findAllPlace(data) {
        try {
            const address = data.userAddress.match(/(\S+?시)\s(\S+?구)\s/g)[0].replace(/[.,]/g, '');
            const dong = data.userAddress.match(/\s(\S+동)\s/)[1];
            console.log(data.selectCategory)
            const response = await axios.post('/places', { address, dong }, {
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
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async scraping(data) {
        try {
            const response = await axios.post('/puppeteer/scraping', data);
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
      
    static async findAllFoodCategory() {
        try {
            const response = await axios.get('/places/foodCategory');
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async findAllMenuByPlaceId(placeId) {
        try {
            const response = await axios.get(`/places/${placeId}/menus`);
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async searchPlace(body) {
        try {
            const response = await axios.post('/places/search', {body});
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}