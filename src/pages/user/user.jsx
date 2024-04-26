import style from "../../styles/user.module.css";
import UserAPI from "../../apis/user.api";
import { useEffect, useState } from "react";
import { Cookies } from "react-cookie";
import MyProfile from "./userComponent/MyProfile";
import MyLists from "./userComponent/MyLists";
import MyReservations from "./userComponent/MyReservations";
import MyTitles from "./userComponent/MyTitles";
import MyPoints from "./userComponent/MyPoints";
// import MyCoupons from "./userComponent/MyCoupons"
// import MyReviews from "./userComponent/MyReviews"

export default function User() {
  const cookies = new Cookies();
  const [userInfo, setUserInfo] = useState([]);
  const [top3Title, setTop3Title] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    async function fetechData() {
      try {
        const accessToken = cookies.get("accessToken");
        if (!accessToken) {
          alert('사용자의 로그인 인증시간이 만료되었습니다.');
          window.location.href = '/';
        }
        
        const resUser = await UserAPI.getUserInfo(accessToken);
        const resTitle = await UserAPI.top3Title(accessToken);
        if (resUser.statusCode === 200 && resTitle.statusCode === 200) {
          setTop3Title(resTitle.data);
          setUserInfo(resUser.data);
        }
      } catch (err) {
        console.log(err);
      }
    }

    fetechData();
  }, []);

  const handleLogout = () => {
    cookies.remove("accessToken");
    cookies.remove("refreshToken");
    window.location.href = "/";
  };

  return (
    <>
      <div className={style.menu}>
        <img />
        <div className={style.name}>
          <h2 style={{ marginLeft: "12px" }}>{userInfo.nickName} 님</h2>
        </div>
        <div className={style.follwer}>
          <h2>팔로워</h2>
          <p>{userInfo.follower && userInfo.follower.length}</p>
        </div>
        <div className={style.following}>
          <h2>팔로잉</h2>
          <p>{userInfo.follower && userInfo.follower.length}</p>
        </div>
        <div className={style.points}>
          <h2>보유 포인트</h2>
          <p>{userInfo.point && userInfo.point.point} Point</p>
        </div>
        <div className={style.titles}>
          <h2>TOP 3 Title</h2>
          {top3Title.length > 0 ? (
            top3Title.slice(0, 3).map((title, index) => (
              <p key={index}>
                {index + 1}. {title.foodCategory.category}{" "}
                {title.count <= 200 && title.level}
              </p>
            ))
          ) : (
            <p>보유하고 있는 칭호가 없습니다.</p>
          )}
        </div>
      </div>
      <div style={{ display: "flex" }}>
        <div className={style.sides}>
          <p onClick={() => setSelectedItem("MyProfile")}>Profile</p>
          <p onClick={() => setSelectedItem("MyLists")}>PlaceLists</p>
          <p onClick={() => setSelectedItem("Reservations")}>Reservations</p>
          <p onClick={() => setSelectedItem("Titles")}>Titles</p>
          <p onClick={() => setSelectedItem("Points")}>Points</p>
          {/* <p onClick={() => setSelectedItem("Coupons")}>Coupons</p>
          <p onClick={() => setSelectedItem("Reviews")}>Reviews</p> */}
          <button className={style.logoutBtn} onClick={handleLogout}>
            로그아웃
          </button>
        </div>
        {selectedItem === "MyProfile" && <MyProfile />}
        {selectedItem === "MyLists" && <MyLists nickName={userInfo.nickName} />}
        {selectedItem === "Reservations" && <MyReservations />}
        {selectedItem === "Titles" && <MyTitles />}
        {selectedItem === "Points" && <MyPoints point={userInfo.point} />}
        {/* {selectedItem === 'Coupons' && <MyCoupons/>}
        {selectedItem === 'Reviews' && <MyReviews/>} */}
        {!selectedItem && <UserMain />}
      </div>
    </>
  );
}

function UserMain() {
  return (
    <>
      <div className={style.mainContainer}>
        <p className={style.mainTitle}>초기 로딩 시</p>
        <div className={style.contents}>
          <p>카츠혼또</p>
          <p>예약 완료</p>
          <p>예약날짜 : 2024-04-18 15:00</p>
        </div>
      </div>
    </>
  );
}
