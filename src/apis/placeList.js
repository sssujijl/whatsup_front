import axios from 'axios';

export default class PlaceListAPI {

    static async findAllPlaceListsByNickName(accessToken, nickName) {
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

    static async findAllPlaceListsById(accessToken) {
        try {
            const response = await axios.get('/placeLists/myPlaceLists', {
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

    static async savedPlaceList(accessToken, placeListId, placeId) {
        try {
            const response = await axios.get(`/placeLists/${placeListId}/save`, {
                params: {
                    placeId
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
}