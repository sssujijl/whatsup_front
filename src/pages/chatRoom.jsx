import style from "../styles/chatRoom.module.css";
import { useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import { Cookies } from "react-cookie";
import { useParams } from "react-router-dom";
import ChatRoomAPI from "../apis/chatRoom.api";

export default function ChatRoom() {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [socket, setSocket] = useState(null);
  const [check, setCheck] = useState(true);
  const { id } = useParams();
  const cookies = new Cookies();
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const newSocket = io("http://localhost:8080", {
      auth: {
        token: cookies.get("accessToken"),
      },
    });
    setSocket(newSocket);

    newSocket.on("connect", () => {
      console.log("Connected to server");
    });

    newSocket.on("message", (message) => {
      console.log(message);
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const sendMessage = () => {
    if (socket && inputMessage.trim() !== "") {
      const data = {
        chatRoomId: id,
        message: inputMessage,
      };
      socket.emit("message", data);
      setCheck(true);
      setInputMessage("");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const message = await ChatRoomAPI.findAllMessage(
          id,
          cookies.get("accessToken")
        );
        setCheck(false);
        setMessages(message);

        messagesEndRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [check]);

  return (
    <>
      <div className={style.chatRoom}>
        <div className={style.messages}>
          {messages.map((message, index) => (
            <div key={index}>
              {message.userId === "me" ? (
                <div className={style.sender}>
                  <p className={style.dateTime}>{message.currentTime}</p>
                  <p className={style.message}>{message.message}</p>
                </div>
              ) : (
                <div className={style.receiver}>
                  <span className={style.nickName}>{message.nickName}</span>
                  <div style={{ display: "flex" }}>
                    <p className={style.message}>{message.message}</p>
                    <p className={style.dateTime}>{message.currentTime}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className={style.sendContainer}>
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            className={style.sendInput}
          />
          <button className={style.sendBtn} onClick={sendMessage}>
            전송
          </button>
        </div>
      </div>
    </>
  );
}
