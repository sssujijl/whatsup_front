import style from "../../styles/chatRooms.module.css";
import { useNavigate } from "react-router-dom";
import ChatRoomAPI from "../../apis/chatRoom.api.js";
import { Cookies } from "react-cookie";
import { useEffect, useState } from "react";
import PageButton from "../layout/pageButton.jsx";

export default function ChatRooms() {
  let navigate = useNavigate();
  const cookies = new Cookies();
  const [chatRooms, setChatRooms] = useState([]);
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(chatRooms.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentChatRooms = chatRooms.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    async function fetechDate() {
      try {
        const accessToken = cookies.get("accessToken");
        const data = await ChatRoomAPI.findAllChatRooms(accessToken);
        setChatRooms(data);
      } catch (err) {
        console.log(err);
      }
    }
    fetechDate();
  }, []);

  return (
    <>
      <div className={style.chatRooms}>
        {currentChatRooms.map((chatRoom) => (
          <div
            key={chatRoom.chatRoomId}
            className={style.chatRoom}
            onClick={() => {
              navigate(`/chatRoom/${chatRoom.chatRoomId}`);
            }}
          >
            <div>
              <p style={{ fontWeight: "bold" }}>{chatRoom.chatRoom.name}</p>
              {/* <p>마지막 채팅 내용</p> */}
            </div>
          </div>
        ))}
        <PageButton
          itemsPerPage={itemsPerPage}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          totalPages={totalPages}
          data={chatRooms}
        />
      </div>
    </>
  );
}
{
  /* <div style={{width:'80px'}}>
                            <p style={{color:'dimgray'}}>오후 7:42</p>
                            <p className={style.count}>10</p>
                        </div> */
}
