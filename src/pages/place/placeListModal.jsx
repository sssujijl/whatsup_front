import Modal from "react-modal";
import { Cookies } from "react-cookie";
import PlaceListAPI from "../../apis/placeList";
import { useState } from "react";
import style from "../../styles/placeList-column.module.css";
import CreatePlaceList from "./createPlaceList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLockOpen, faLock } from "@fortawesome/free-solid-svg-icons";

export default function PlaceListModal({
  isModalOpen,
  setIsModalOpen,
  selectPlace,
  placeLists,
}) {
  const cookies = new Cookies();
  const [showModal, setShowModal] = useState(false);
  const accessToken = cookies.get("accessToken");

  const savedPlaceList = async (placeListId) => {
    try {
      const res = await PlaceListAPI.savedPlaceList(
        accessToken,
        placeListId,
        selectPlace.id
      );

      alert(res.message);
      if (res.statusCode === 200) {
        window.location.reload();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
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
            maxWidth: "600px",
            maxHeight: "80vh",
            overflow: "auto",
            zIndex: "1000",
          },
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.3)",
          },
        }}
        contentLabel="Modal"
        ariaHideApp={false}
      >
        <div className={style.modal}>
          <h2>PlaceLists</h2>
          <button 
            onClick={() => setShowModal(!showModal)}
            style={{ position: "absolute", top: "80px", right: "30px" }}
          >+ PlaceLists</button>
          {placeLists ? (
            placeLists.map((list) => (
              <div
                key={list.id}
                className={style.contents}
                style={{ display: "flex" }}
                onClick={() => savedPlaceList(list.id)}
              >
                <p style={{ fontSize: "21px", marginRight: "8px" }}>
                  {list.title}
                </p>
                {list.visible === "public" ? (
                  <p style={{ margin: "30px 20px 0 0", fontSize: "13px" }}>
                    <FontAwesomeIcon icon={faLockOpen} />
                  </p>
                ) : (
                  <p>
                    <FontAwesomeIcon icon={faLock} />
                  </p>
                )}
                <p style={{ marginTop: "25px" }}>
                  {list.savedPlaces.length}개의 장소
                </p>
              </div>
            ))
          ) : (
            <button>+ PlaceLists</button>
          )}
          <button
            onClick={() => setIsModalOpen(false)}
            style={{ position: "absolute", bottom: "30px", right: "30px" }}
          >
            닫기
          </button>
          {showModal && (
            <div className={style.modal}>
              <CreatePlaceList
                showModal={showModal}
                setShowModal={setShowModal}
              />
            </div>
          )}
        </div>
      </Modal>
    </>
  );
}
