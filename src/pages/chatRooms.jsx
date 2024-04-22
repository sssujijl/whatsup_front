import style from '../styles/chatRooms.module.css'
import { useNavigate } from 'react-router-dom';
import ChatRoomAPI from "../apis/chatRoom.api.js";
import { Cookies } from "react-cookie";

export default function ChatRooms() {
    let navigate = useNavigate();
    const cookies = new Cookies();

    const handleCreateChatRoom = async () => {
        const data = {
            userId: 1,
            chatRoomName: 'test'
        }
        const accessToken = cookies.get('accessToken')
        try {
            const test = await ChatRoomAPI.createChatRoom(data, accessToken);
            console.log(test);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            <div className={style.chatRooms}>
                <div className={style.chatRoom} onClick={() => { navigate('/chatRoom/1')}}>
                    <div>
                        <p style={{fontWeight:'bold'}}>김성진</p>
                        <p>마지막 채팅 내용</p>
                    </div>
                    <div style={{width:'80px'}}>
                        <p style={{color:'dimgray'}}>오후 7:42</p>
                        <p className={style.count}>10</p>
                    </div>
                </div>
                <button onClick={handleCreateChatRoom}>1번이랑 채팅방 생성</button>
            </div>
        </>
    )
}
