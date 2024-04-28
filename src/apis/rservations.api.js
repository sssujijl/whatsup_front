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

    static async createReservation(accessToken, resStatusId, body) {
        try {
            const response = await axios.post(`/reservations/${resStatusId}`, body, {
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

    static async cancelReservation(accessToken, resStatusId, reservationId) {
        try {
            const response = await axios.delete(`/reservations/${resStatusId}/${reservationId}`, {
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