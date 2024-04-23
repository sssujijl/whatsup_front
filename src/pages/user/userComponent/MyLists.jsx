import style from "../../../styles/user.module.css";

export default function MyLists({ placeLists }) {
    return (
        <>
          <div className={style.mainContainer}>
            <p className={style.mainTitle}>Reservation</p>
            <div className={style.contents}>
              <p>카츠혼또</p>
              <p>예약 완료</p>
              <p>예약날짜 : 2024-04-18 15:00</p>
            </div>
          </div>
        </>
      );
}