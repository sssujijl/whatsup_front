import axios from 'axios';

export default class PlaceListAPI {

    static async findPlaceLists(accessToken, nickName) {
        try {
            const response = await axios.get('/placeLists', {
                params: {
                    nickName
                },
                header: {
                    Cookie: accessToken
                }
            });
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async createPlaceList(accessToken, data) {
        try {
            const response = await axios.post('/placeLists', data, {
                header: {
                    Cookie: accessToken
                }
            });
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}