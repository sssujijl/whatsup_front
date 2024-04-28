import { useEffect, useState } from "react";
import style from "../../../styles/user.module.css";
import { Cookies } from "react-cookie";
import PlaceListAPI from "../../../apis/placeList";
import styled from "styled-components";
import CreatePlaceList from "../../place/createPlaceList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLockOpen, faLock } from "@fortawesome/free-solid-svg-icons";
import PageButton from "../../layout/pageButton";

const AddPlaceList = styled.button`
  border: 0.5px solid gray;
  background-color: transparent;
  padding: 12px;
  position: absolute;
  right: 50px;
  top: 130px;
  &:hover {
    background-color: black;
    color: white;
    transition: 0.5s;
  }
`;

export default function MyLists({ nickName }) {
  const cookies = new Cookies();
  const [placeLists, setPlaceLists] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(placeLists.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPages = placeLists.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    const fetechDate = async () => {
      try {
        const accessToken = cookies.get("accessToken");
        const res = await PlaceListAPI.findAllPlaceListsByNickName(accessToken, nickName);

        if (res.statusCode === 200) {
          setPlaceLists(res.data);
        } else {
          alert(res.message);
        }
        
      } catch (err) {
        console.log(err);
      }
    };
    fetechDate();
  }, []);

  return (
    <>
      <div className={style.mainContainer}>
        <p className={style.mainTitle}>Place Lists</p>
        <AddPlaceList onClick={() => setShowModal(!showModal)}>
          + PlaceList
        </AddPlaceList>
        {showModal && (
          <div className={style.modal}>
            <CreatePlaceList
              showModal={showModal}
              setShowModal={setShowModal}
            />
          </div>
        )}
        {currentPages.map((list) => (
          <div
            key={list.id}
            className={style.contents}
            style={{ display: "flex" }}
          >
            <p style={{ fontSize: "21px", marginRight: "8px" }}>{list.title}</p>
            {list.visible === "public" ? (
              <p style={{ margin: "30px 20px 0 0", fontSize: "13px" }}>
                <FontAwesomeIcon icon={faLockOpen} />
              </p>
            ) : (
              <p style={{ margin: "30px 20px 0 0", fontSize: "13px" }}>
                <FontAwesomeIcon icon={faLock} />
              </p>
            )}
            <p style={{ marginTop: "25px" }}>
              {list.savedPlaces.length}개의 장소
            </p>
          </div>
        ))}
        <PageButton
          itemsPerPage={itemsPerPage}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          totalPages={totalPages}
          data={placeLists}
        />
      </div>
    </>
  );
}
