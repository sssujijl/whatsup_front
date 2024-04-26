import style from "../../../styles/user.module.css";
import { useState, useEffect } from "react";
import { Cookies } from "react-cookie";
import ReservationAPI from "../../../apis/rservations.api";
import PageButton from "../../layout/pageButton";

export default function MyReservations() {
  const cookies = new Cookies();
  const [reservations, setReservations] = useState([]);
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(reservations.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPages = reservations.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    async function fetechData() {
      try {
        const accessToken = cookies.get("accessToken");
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

  return (
    <>
      <div className={style.mainContainer}>
        <p className={style.mainTitle}>Reservation</p>
        {currentPages.map((reservation, index) => (
          <div key={index} className={style.contents}>
            <p>{reservation.resStatus.place.title}</p>
            <p style={{textAlign:'right'}}>{reservation.status}</p>
            <p>
              예약날짜 :{" "}
              {new Date(reservation.resStatus.dateTime).toLocaleString()}
            </p>
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
