import style from "../styles/chatRoom.module.css";
import { useEffect, useState } from "react";
import io from "socket.io-client";

export default function ChatRoom() {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io("http://localhost:8080");
    setSocket(newSocket);

    // 클라이언트에서 필요한 WebSocket 이벤트 리스너 등록
    newSocket.on("connect", () => {
      console.log("Connected to server");
    });

    // 서버로부터 메시지를 받으면 messages 상태를 업데이트합니다.
    newSocket.on("message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // 컴포넌트 언마운트 시 소켓 연결을 해제합니다.
    return () => {
      newSocket.disconnect();
    };
  }, []);

  // 입력한 메시지를 서버로 전송하는 함수
  const sendMessage = () => {
    if (socket && inputMessage.trim() !== "") {
      socket.emit("sendMessage", inputMessage);
      setInputMessage("");
    }
  };

  return (
    <>
      <div className={style.chatRoom}>
        <div className={style.messages}>
          {messages.map((message, index) => (
            <div key={index}>
              {message.sender ? (
                <div className={style.sender}>
                  <p className={style.dateTime}>{message.timestamp}</p>
                  <p className={style.message}>{message.text}</p>
                </div>
              ) : (
                <div className={style.receiver}>
                  <span style={{ fontWeight: "bold" }}>김성진</span>
                  <div style={{ display: "flex" }}>
                    <p className={style.message}>{message.text}</p>
                    <p className={style.dateTime}>수신시간</p>
                  </div>
                </div>
              )}
            </div>
          ))}
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
