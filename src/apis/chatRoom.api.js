import axios from 'axios';

export default class ChatRoomAPI {
    static async createChatRoom(data, accessToken) {
        try {
            const response = await axios.post('/chat-rooms', data, { 
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

    static async findAllMessage(chatRoomId, accessToken) {
        try {
            const response = await axios.get(`/chatRoom/${chatRoomId}/messages`, { 
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
