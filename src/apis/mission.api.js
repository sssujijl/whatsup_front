import axios from 'axios';

export default class MissionAPI {

    static async findMission(data) {
        try {
            const response = await axios.get('/missions/' + data.missionId);
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async findTodayMission() {
        try {
            const response = await axios.get('/missions');
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}