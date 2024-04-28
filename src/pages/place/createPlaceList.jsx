import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from "../../styles/createPlaceList.module.css";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { Cookies } from "react-cookie";
import { useState } from "react";
import PlaceListAPI from "../../apis/placeList";
import Modal from "react-modal";

export default function CreatePlaceList({ showModal, setShowModal}) {
  const cookies = new Cookies();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [visible, setVisible] = useState("");

  const handleCreatePlaceList = async (event) => {
    event.preventDefault();
    try {
      const accessToken = cookies.get("accessToken");
      const data = {
        title,
        content,
        visible,
      };
      await PlaceListAPI.createPlaceList(accessToken, data);
      setShowModal(!showModal);
      alert("새 장소목록이 생성되었습니다 !");
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Modal
        isOpen={showModal}
        onRequestClose={() => setShowModal(false)}
        style={{
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            border: "1px solid #ccc",
            borderRadius: "4px",
            maxWidth: "1200px",
            maxHeight: "80vh",
            overflow: "auto",
          },
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.3)",
          },
        }}
        contentLabel="Modal"
        ariaHideApp={false}
      >
        <div className={style.container}>
          <button
            className={style.closeBtn}
            onClick={() => setShowModal(!showModal)}
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
          <span className={style.title}>New PlaceList</span>
          <hr />
          <input
            type="text"
            placeholder="새 리스트명을 입력해주세요."
            className={style.titleInput}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <div className={style.visible}>
            <h4>공개범위</h4>
            <label>
              <input
                type="radio"
                value={visible}
                checked={visible === "public"}
                onChange={() => setVisible("public")}
              />
              <span>공개</span>
            </label>
            <label>
              <input
                type="radio"
                value={visible}
                checked={visible === "private"}
                onChange={() => setVisible("private")}
              />
              <span>비공개</span>
            </label>
          </div>
          <hr />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              margin: "45px 0 10px 0",
            }}
          >
            <span>상세 설명</span>
            <input
              type="text"
              placeholder="설명을 남겨주세요."
              className={style.contentInput}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          <button className={style.savedBtn} onClick={handleCreatePlaceList}>
            저장하기
          </button>
        </div>
      </Modal>
    </>
  );
}
