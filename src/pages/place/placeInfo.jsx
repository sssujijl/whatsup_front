import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import style from "../../styles/placeList-column.module.css";
import { useEffect, useState } from "react";
import PlaceAPI from "../../apis/place.api";
import ReviewAPI from "../../apis/review.api";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import ReservationAPI from "../../apis/rservations.api";
import { Cookies } from "react-cookie";

const cookies = new Cookies();
const accessToken = cookies.get("accessToken");

export default function PlaceInfo({ place, setSelectPlace }) {
  const [menus, setMenus] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [showRes, setShowRes] = useState(false);
  const [showMenus, setShowMenus] = useState(false);
  const [showHome, setShowHome] = useState(false);
  const [showReview, setShowReview] = useState(false);

  const handleMenu = async (id) => {
    try {
      const res = await PlaceAPI.findAllMenuByPlaceId(id);

      if (res.data.statusCode === 200) {
        setMenus(res.data.data);
      } else {
        alert(res.data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleReview = async (id) => {
    try {
      const res = await ReviewAPI.findAllReview(id);

      if (res.statusCode === 200) {
        setReviews(res.data);
      } else {
        alert(res.message);
      }
      
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className={style.placeInfo}>
        <div style={{ padding: "8px" }}>
          <button
            className={style.closeBtn}
            onClick={() => setSelectPlace(false)}
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
          <h1>{place.title}</h1>
          <p>{place.foodCategory.category}</p>
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <p>별점</p>
            <p>방문자리뷰 {place.reviews.length}</p>
          </div>
          <div className={style.Btns}>
            <button onClick={() => setShowHome(!showHome)}>홈</button>
            <button
              onClick={() => {
                handleMenu(place.id);
                setShowMenus(!showMenus);
              }}
            >
              메뉴
            </button>
            <button onClick={() => setShowRes(!showRes)}>예약</button>
            <button
              onClick={() => {
                handleReview(place.id);
                setShowReview(!showReview);
              }}
            >
              리뷰
            </button>
          </div>
        </div>
        {showHome || !menus || (!showRes && <Home place={place} />)}
        {showMenus &&
          menus.map((menu, index) => <Menu key={index} menu={menu} />)}
        {showRes && (
          <Reservation
            placeId={place.id}
            handleMenu={handleMenu}
            menus={menus}
          />
        )}
        {showReview && <Review reviews={reviews} />}
      </div>
    </>
  );
}

function Review({ reviews }) {
  return <></>;
}

function Reservation({ placeId, handleMenu, menus }) {
  const [date, setDate] = useState(new Date());
  const [resStatus, setResStatus] = useState([]);
  const [capacity, setCapacity] = useState("");
  const [selectMenus, setSelectMenus] = useState(false);
  const [orderMenus, setOrderMenus] = useState(0);
  const [selectedResStatusId, setSelectedResStatusId] = useState(null);

  const handleFineResStatus = async () => {
    try {
      const res = await ReservationAPI.findAllResStatus(placeId, date);

      if (res.statusCode === 200) {
        setResStatus(res.data);
      } else {
        alert(res.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleReservation = async () => {
    try {
      if (!accessToken) {
        alert("로그인이 필요합니다.");
      }
      const data = {
        capacity: +capacity,
        orderMenus,
      };
      const res = await ReservationAPI.createReservation(
        accessToken,
        selectedResStatusId,
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

  const onChange = (selectedDate) => {
    setDate(selectedDate);
    handleFineResStatus();
  };

  return (
    <div>
      <Calendar onChange={onChange} value={date} />
      <div className={style.resContainer}>
        {resStatus &&
          resStatus.map((status, index) => (
            <div
              className={`${style.resStatus} ${
                status.status ? style.trueResStatus : style.falseResStatus
              } ${
                selectedResStatusId === status.id ? style.selectedResStatus : ""
              }`}
              key={index}
              onClick={() => {
                if (status.status) {
                  setSelectedResStatusId(status.id);
                }
              }}
            >
              <span>
                {new Date(status.dateTime).toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
          ))}
      </div>
      {resStatus && (
        <div className={style.option}>
          <h3>인원</h3>
          <select
            onChange={(e) => setCapacity(e.target.value)}
            value={capacity}
          >
            {[...Array(10)].map((_, index) => (
              <option key={index + 1} value={index + 1}>
                {index + 1}명
              </option>
            ))}
          </select>
          <button
            onClick={() => {
              handleMenu(placeId);
              setSelectMenus(!selectMenus);
            }}
          >
            메뉴 선택하기
          </button>
        </div>
      )}
      {selectMenus && (
        <>
          <SelectMenus
            menus={menus}
            orderMenus={orderMenus}
            setOrderMenus={setOrderMenus}
            handleReservation={handleReservation}
          />
        </>
      )}
    </div>
  );
}

function SelectMenus({ menus, orderMenus, setOrderMenus, handleReservation }) {
  return (
    <div>
      {menus.map((menu, index) => (
        <div className={style.menusContainer} key={index}>
          <img src={menu.images} alt={menu.name} />
          <div>
            <h2>{menu.name}</h2>
            <p>{menu.description}</p>
            <p>{menu.price}</p>
            <input
              type="number"
              value={orderMenus[menu.id] || 0}
              onChange={(e) =>
                setOrderMenus({ ...orderMenus, [menu.id]: +e.target.value })
              }
              min="0"
            />
          </div>
        </div>
      ))}
      <button className={style.resBtn} onClick={() => handleReservation()}>
        예약하기
      </button>
    </div>
  );
}

function Home({ place }) {
  return (
    <>
      <div className={style.home}>
        <p>{place.address}</p>
        <p>{place.roadAddress}</p>
        <p>{place.link}</p>
      </div>
    </>
  );
}

function Menu({ menu }) {
  return (
    <div className={style.menusContainer}>
      <img src={menu.images} alt={menu.name} />
      <div>
        <h2>{menu.name}</h2>
        <p>{menu.description}</p>
        <p>{menu.price}</p>
      </div>
    </div>
  );
}
