import axios from 'axios';

export default class ReservationAPI {

    static async findAllReservation(accessToken) {
        try {
            const response = await axios.get('/reservations', { 
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

    static async findAllResStatus(placeId, date) {
        try {
            const response = await axios.get(`/reservations/places/${placeId}`, { 
                params: { date },
            });
            
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async createReservation(accessToken, resStatusId, date) {
        try {
            const response = await axios.post(`/reservations/${resStatusId}`, date, { 
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