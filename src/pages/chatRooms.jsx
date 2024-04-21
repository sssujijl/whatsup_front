import style from '../styles/chatRooms.module.css'
import { useNavigate } from 'react-router-dom';

export default function ChatRooms() {
    let navigate = useNavigate();

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
            </div>
        </>
    )
}
