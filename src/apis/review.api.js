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

    static async createReview(accessToken, placeId, data, reservationId = null) {
        try {
            const url = reservationId ? `/place/${placeId}/reviews/${reservationId}` : `/place/${placeId}/reviews`;
            console.log(url);
            const response = await axios.post(url, data, {
                headers: {
                    Cookie: accessToken
                }
            });
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async validateReceipt(placeId, file) {
        try {
            const formData = new FormData();
            formData.append('file', file);
            
            const response = await axios.post('/clovaocr/uploads', formData, {
                params: {
                    placeId
                },
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    

}