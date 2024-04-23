import axios from 'axios';

export default class PlaceAPI {

    static async findPoint(accessToken) {
        try {
            const response = await axios.post('/points', {
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