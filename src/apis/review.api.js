import axios from 'axios';

export default class ReviewAPI {

    static async findAllReview(placeId) {
        try {
            const response = await axios.get(`/place/${placeId}/reviews`);
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}