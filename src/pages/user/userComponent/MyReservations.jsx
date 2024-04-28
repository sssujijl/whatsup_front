import style from "../../../styles/user.module.css";
import { useState, useEffect } from "react";
import { Cookies } from "react-cookie";
import ReservationAPI from "../../../apis/rservations.api";
import PageButton from "../../layout/pageButton";
import { useNavigate } from "react-router-dom";

export default function MyReservations() {
  const navigate = useNavigate();
  const cookies = new Cookies();
  const accessToken = cookies.get("accessToken");
  const [reservations, setReservations] = useState([]);
  const itemsPerPage = 4;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(reservations.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPages = reservations.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    async function fetechData() {
      try {
        const res = await ReservationAPI.findAllReservation(accessToken);

        if (res.statusCode === 200) {
          setReservations(res.data);
        } else {
          alert(res.message);
        }
      } catch (err) {
        console.log(err);
      }
    }

    fetechData();
  }, []);

  const handleCancelReservation = async (resStatusId, reservationId) => {
    try {
      const res = await ReservationAPI.cancelReservation(
        accessToken,
        resStatusId,
        reservationId
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
        <p className={style.mainTitle}>Reservation</p>
        {currentPages.map((reservation, index) => (
          <div key={index} className={style.contents} style={{height:'250px'}}>
            <p>{reservation.resStatus.place.title}</p>
            <p style={{ textAlign: "right" }}>{reservation.status}</p>
            <p>
              예약날짜 :{" "}
              {new Date(reservation.resStatus.dateTime).toLocaleString()}
            </p>
            {!reservation.review && (
              <>
                {reservation.status === "VISIT_COMPLETED" ? (
                  <button
                    onClick={() =>
                      navigate(
                        `/places/${reservation.resStatus.placeId}/reviews`,
                        {
                          state: {
                            reservationId: reservation.id,
                            place: reservation.resStatus.place,
                          },
                        }
                      )
                    }
                  >
                    리뷰 작성하기
                  </button>
                ) : (
                  <button
                    onClick={() =>
                      handleCancelReservation(
                        reservation.resStatusId,
                        reservation.id
                      )
                    }
                  >
                    예약 취소하기
                  </button>
                )}
              </>
            )}
          </div>
        ))}
        <PageButton
          itemsPerPage={itemsPerPage}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          totalPages={totalPages}
          data={reservations}
        />
      </div>
    </>
  );
}
