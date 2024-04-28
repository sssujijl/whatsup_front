import style from "../../styles/chatRoom.module.css";
import { useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import { Cookies } from "react-cookie";
import { useParams } from "react-router-dom";
import ChatRoomAPI from "../../apis/chatRoom.api";
import UserAPI from "../../apis/user.api";
import { format } from "date-fns";

export default function ChatRoom() {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [socket, setSocket] = useState(null);
  const { id } = useParams();
  const cookies = new Cookies();
  const [user, setUser] = useState(null);

  useEffect(() => {
    document.getElementById("chatContainer").scrollTop =
      document.getElementById("chatContainer").scrollHeight;
  }, [messages]);

  useEffect(() => {
    async function fetechData() {
      try {
        const accessToken = cookies.get("accessToken");
        if (!accessToken) {
          alert("사용자의 로그인 인증시간이 만료되었습니다.");
          window.location.href = "/";
        }

        const res = await UserAPI.findUser(accessToken);
        setUser(res);
      } catch (err) {
        console.log(err);
      }
    }

    fetechData();
  }, []);

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

    newSocket.on(`message: ${id}`, (res) => {
      setMessages((prevState) => {
        const prevMessages = Array.isArray(prevState) ? prevState : [];
        return prevMessages.concat(res);
      });
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();
    if (socket && inputMessage.trim() !== "") {
      const data = {
        chatRoomId: id,
        message: inputMessage,
      };
      socket.emit("message", data, (res) => {
        console.log("sendMessage res", res);
      });
      setInputMessage("");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await ChatRoomAPI.findAllMessage(
          id,
          cookies.get("accessToken")
        );

        if (res.statusCode === 200) {
          setMessages(res.data);
        } else {
          alert(res.message);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div className={style.chatRoom} style={{ marginBottom: "50px" }}>
        <div id="chatContainer" className={style.messages}>
          {messages &&
            messages.map((message, index) => (
              <div key={index}>
                {message.userId === user.id ? (
                  <div className={style.sender}>
                    <p className={style.dateTime}>
                      {format(new Date(message.createdAt), "a hh:mm")}
                    </p>
                    <p className={style.message}>{message.content}</p>
                  </div>
                ) : (
                  <div className={style.receiver}>
                    <span className={style.nickName}>
                      {message.user.nickName}
                    </span>
                    <div style={{ display: "flex" }}>
                      <p className={style.message}>{message.content}</p>
                      <p className={style.dateTime}>{message.createdAt}</p>
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
