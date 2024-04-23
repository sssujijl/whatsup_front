import style from "../../../styles/user.module.css";
import toss from "../../../img/logo-toss-pay.png";
import kakao from "../../../img/payment_icon_yellow_medium.png";

export default function MyPoints({ point }) {
  return (
    <>
      <div className={style.mainContainer}>
        <p className={style.mainTitle}>My Point</p>
        <div className={style.contents}>
          <p>보유 포인트 : {point.point} point</p>
          <div style={{ marginTop: "150px" }}>
            <p>포인트 충전하기</p>
            <img src={toss} className={style.tossImg} />
            <img src={kakao} className={style.kakaoImg} />
          </div>
        </div>
      </div>
    </>
  );
}
