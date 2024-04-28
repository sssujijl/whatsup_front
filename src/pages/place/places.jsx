import { useEffect, useState } from "react";
import style from "../../styles/places.module.css";
import styled from "styled-components";
import PageButton from "../layout/pageButton";
import { format } from "date-fns";
import { Cookies } from "react-cookie";
import ReservationAPI from "../../apis/rservations.api";
import Modal from "react-modal";
import MissionAPI from "../../apis/mission.api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const FlexDiv = styled.div`
  display: flex;
`;

export default function Places() {
  const cookies = new Cookies();
  const [places, setPlaces] = useState([]);
  const [resStatus, setResStatus] = useState([]);
  const [capacity, setCapacity] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectResId, setSelectResId] = useState("");
  const [search, setSearch] = useState("");
  const [searchPlace, setSearchPlace] = useState([]);

  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);
  
  const searchResults = searchPlace.length > 0 ? searchPlace : places;

  const totalPages = Math.ceil(searchResults.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPages = searchResults.slice(indexOfFirstItem, indexOfLastItem);
  

  useEffect(() => {
    async function fetchMission() {
      try {
        const res = await MissionAPI.findTodayMissionInfo();

        if (res.statusCode === 200) {
          setPlaces(res.data.places);
          setResStatus(res.data.resStatus);
        }
      } catch (error) {
        console.error("Error fetching mission:", error);
      }
    }

    fetchMission();
  }, []);

  const handleSearch = () => {
    const searchWords = search.toLowerCase().split(" ");
    console.log(searchWords, search);
    const result = places.filter((place) =>
      searchWords.some(
        (word) =>
          // place.foodCategory.category.includes(word) ||
          place.title.includes(word) ||
          place.address.includes(word) ||
          place.roadAddress.includes(word)
      )
    );

    setSearchPlace(result);
  };

  const handleReservation = async () => {
    try {
      const accessToken = cookies.get("accessToken");
      if (!accessToken) {
        alert("로그인이 필요합니다.");
      }

      const data = {
        capacity: +capacity,
        orderMenus: {},
        deposit: 10000,
        checkMission: true,
      };

      const res = await ReservationAPI.createReservation(
        accessToken,
        selectResId,
        data
      );

      if (res.statusCode === 200) {
        alert(res.message);
        window.location.reload();
      } else {
        alert(res.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className={style.mainContainer}>
        <div className={style.searchContainer}>
          <input
            type="text"
            placeholder="검색어를 입력하세요."
            className={style.searchInput}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className={style.searchBtn} onClick={() => handleSearch()}>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
        </div>
        {places &&
          currentPages.map((place, index) => (
            <div className={style.contents} key={index}>
              <FlexDiv>
                <h3 className={style.place_title}>{place.title}</h3>
                <p className={style.place_category}>
                  {/* {place.foodCategory.category} */}
                </p>
                {/* <button className={style.place_star}>
                  <FontAwesomeIcon icon={faStar} />
                </button> */}
              </FlexDiv>
              <FlexDiv style={{ position: "relative", bottom: "15px" }}>
                <p className={style.place_review}>
                  {/* {`리뷰 ${place.reviews.length}`} */}
                  리뷰 0
                </p>
                <div className={style.place_addressContainer}>
                  <p className={style.place_address}>{place.address}</p>
                </div>
              </FlexDiv>
              <div className={style.resContainer}>
                {resStatus
                  .filter((status) => status.placeId === place.id)
                  .map((filteredStatus, index) => (
                    <div
                      key={index}
                      className={
                        filteredStatus.status ? style.resStatus : style.falseRes
                      }
                      onClick={() => {
                        if (filteredStatus.status) {
                          setIsModalOpen(!isModalOpen);
                          setSelectResId(filteredStatus.id);
                        }
                      }}
                    >
                      <div>
                        {format(new Date(filteredStatus.dateTime), "p")}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        <PageButton
          itemsPerPage={itemsPerPage}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          totalPages={totalPages}
          data={places}
        />
        <ReservationModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          capacity={capacity}
          setCapacity={setCapacity}
          handleReservation={handleReservation}
        />
      </div>
    </>
  );
}

function ReservationModal({
  isModalOpen,
  setIsModalOpen,
  capacity,
  setCapacity,
  handleReservation,
}) {
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
            maxHeight: "100vh",
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
          <h2>예약 인원수를 선택하세요</h2>
          <p style={{ fontSize: "13px" }}>
            예약금 10000원 차감 후 예약 진행됩니다.
          </p>
          <div className={style.capacity}>
            <button onClick={() => setCapacity(capacity - 1)}>-</button>
            <span>{capacity}</span>
            <button onClick={() => setCapacity(capacity + 1)}>+</button>
          </div>
          <button className={style.resBtn} onClick={() => handleReservation()}>
            예약하기
          </button>
        </div>
      </Modal>
    </>
  );
}
