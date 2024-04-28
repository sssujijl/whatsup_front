import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faXmark } from "@fortawesome/free-solid-svg-icons";
import style from "../../styles/placeList-column.module.css";
import { useEffect, useState } from "react";
import PlaceAPI from "../../apis/place.api";
import ReviewAPI from "../../apis/review.api";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import ReservationAPI from "../../apis/rservations.api";
import { Cookies } from "react-cookie";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";

const cookies = new Cookies();
const accessToken = cookies.get("accessToken");

export default function PlaceInfo({ place, setSelectPlace }) {
  const [menus, setMenus] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [showRes, setShowRes] = useState(false);
  const [showMenus, setShowMenus] = useState(false);
  const [showHome, setShowHome] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const [averageRating, setAverageRating] = useState(0);

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
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (place.reviews && place.reviews.length > 0) {
      const total = place.reviews.length;
      const count = place.reviews.reduce((accumulator, review) => {
        return accumulator + parseInt(review.rating.replace("Rating_", ""), 10);
      }, 0);
      setAverageRating(count / total);
    }
  }, [place.reviews]);

  const handleOtherShowOFF = (show) => {
    setShowHome(show === "home");
    setShowMenus(show === "menus");
    setShowRes(show === "reservation");
    setShowReview(show === "review");
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
            <p>별점 {averageRating}</p>
            <p>방문자리뷰 {place.reviews.length}</p>
          </div>
          <div className={style.Btns}>
            <button onClick={() => handleOtherShowOFF("home")}>홈</button>
            <button
              onClick={() => {
                handleOtherShowOFF("menus");
                handleMenu(place.id);
              }}
            >
              메뉴
            </button>
            <button onClick={() => handleOtherShowOFF("reservation")}>
              예약
            </button>
            <button
              onClick={() => {
                handleOtherShowOFF("review");
                handleReview(place.id);
              }}
            >
              리뷰
            </button>
          </div>
        </div>
        {showHome && <Home place={place} />}
        {showMenus &&
          menus.map((menu, index) => <Menu key={index} menu={menu} />)}
        {showRes && (
          <Reservation
            placeId={place.id}
            handleMenu={handleMenu}
            menus={menus}
          />
        )}
        {showReview && <Review reviews={reviews} place={place} />}
      </div>
    </>
  );
}

function Review({ reviews, place }) {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [file, setFile] = useState(null);

  const renderStars = (rating) => {
    const ratingValue = parseInt(rating.split("_")[1]);
    const starIcons = [];

    for (let i = 0; i < ratingValue; i++) {
      starIcons.push(<FontAwesomeIcon key={i} icon={faStar} />);
    }
    return starIcons;
  };

  const handleValidateReceipt = async () => {
    try {
      const res = await ReviewAPI.validateReceipt(place.id, file);
      console.log(res);

      if (res.statusCode === 200) {
        alert(res.message);
        navigate(`/places/${place.id}/reviews`, {
          state: {
            place,
          },
        });
      } else {
        alert(res.message);
      }

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <button
        className={style.createReviewBtn}
        onClick={() => setIsModalOpen(true)}
      >
        영수증 인증 후 리뷰작성하기
      </button>

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
          },
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
        }}
        contentLabel="Modal"
        ariaHideApp={false}
      >
        <div className={style.modal}>
          <h2>영수증 인증 후 리뷰작성하기</h2>
          <p>영수증 사진 파일을 올려주세요.</p>
          <p style={{fontSize:'13px'}}>( jpg, jpeg, png 이미지 파일만 가능합니다.)</p>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
          ></input>
          <button onClick={() => handleValidateReceipt()}>영수증 인증하기</button>
          <button onClick={() => setIsModalOpen(false)}>닫기</button>
        </div>
      </Modal>

      {reviews &&
        reviews.map((review, index) => (
          <div key={index} className={style.reviewContainer}>
            <p>{review.user.nickName}</p>
            <p className={style.star}>{renderStars(review.rating)}</p>
            {review.images && <img src={review.images} alt="리뷰 이미지" />}
            <div dangerouslySetInnerHTML={{ __html: review.content }} />
            <p style={{ textAlign: "end" }}>
              {new Date(review.updatedAt).toLocaleString()}
            </p>
          </div>
        ))}
    </>
  );
}

function Reservation({ placeId, handleMenu, menus }) {
  const [date, setDate] = useState(new Date());
  const [resStatus, setResStatus] = useState([]);
  const [capacity, setCapacity] = useState("");
  const [selectMenus, setSelectMenus] = useState(false);
  const [orderMenus, setOrderMenus] = useState(0);
  const [selectedResStatusId, setSelectedResStatusId] = useState(null);
  const [deposit, setDeposit] = useState(10000);

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

  const handleReservation = async (deposit) => {
    try {
      if (!accessToken) {
        alert("로그인이 필요합니다.");
      }

      let data;
      if (deposit) {
        data = {
          capacity: +capacity,
          orderMenus,
          deposit,
        };
      } else {
        data = {
          capacity: +capacity,
          orderMenus,
        };
      }

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
          <p>메뉴 선택 후 예약하실 분들 !</p>
          <button
            onClick={() => {
              handleMenu(placeId);
              setSelectMenus(!selectMenus);
            }}
          >
            메뉴 선택하기
          </button>

          {!selectMenus && (
            <>
              <p>메뉴 선택없이 예약하실 분들 !</p>
              <p style={{ fontSize: "13px" }}>
                (노쇼 방지를 위해 메뉴 미 선택 시 예약금 10000원 결제 후
                예약가능합니다. )
              </p>
              <button
                onClick={() => {
                  setOrderMenus({});
                  handleReservation(deposit);
                }}
              >
                예약하기
              </button>
            </>
          )}
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
