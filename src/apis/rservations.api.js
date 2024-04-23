import axios from 'axios';

export default class ReservationAPI {

    static async findAllReservation(accessToken) {
        try {
            console.log(accessToken)
            const response = await axios.get('/reservations', { 
                headers: {
                    Cookie: accessToken
                },
            });
            console.log(response.data)
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}