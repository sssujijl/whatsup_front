import { faPen } from '@fortawesome/free-solid-svg-icons'
import style from '../styles/user.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function User() {
    return (
        <>
        <div className={style.menu}>
            <img/>
            <div className={style.name}>
                <h2 style={{marginLeft:'12px'}}>필사적인 콜로세움 님</h2>
                <p>해장국 전문가 <FontAwesomeIcon icon={faPen}/></p>
            </div>
            <div className={style.follwer}>
                <h2>팔로워</h2>
                <p>10</p>
            </div>
            <div className={style.following}>
                <h2>팔로잉</h2>
                <p>12</p>
            </div>
            <div className={style.points}>
                <h2>보유 포인트</h2>
                <p>1,000 Point</p>
            </div>
            <div className={style.titles}>
                <h2>TOP 3 Title</h2>
                <p>1. 마라 신</p>
                <p>2. 돈가스 전문가</p>
                <p>3. 피자 고수</p>
            </div>
        </div>
        <div style={{display:'flex'}}>
            <div className={style.sides}>
                <p>My Profile</p>
                <p>My Lists</p>
                <p>Reservations</p>
                <p>Titles</p>
                <p>Points</p>
                <p>Coupons</p>
                <p>Reviews</p>
            </div>
            <UserMain/>
        </div>
        </>
    )
}

function UserMain() {
    return (
        <>
        <div className={style.mainContainer}>
            <p className={style.mainTitle}>Reservation</p>
            <div className={style.contents}>
                <p>카츠혼또</p>
                <p>예약 완료</p>
                <p>예약날짜 : 2024-04-18 15:00</p>
            </div>
            <div className={style.contents}>
                <p>카츠혼또</p>
                <p>예약 완료</p>
                <p>예약날짜 : 2024-04-18 15:00</p>
            </div>
            <div className={style.contents}>
                <p>카츠혼또</p>
                <p>예약 완료</p>
                <p>예약날짜 : 2024-04-18 15:00</p>
            </div>
        </div>
        </>
    )
}