import style from "../../styles/main.module.css";
import Header from "./pageHeader";
import PlaceList from "../place/placeList_row";
import MissionAPI from "../../apis/mission.api";
import { useState, useEffect } from "react";
import UserAPI from "../../apis/user.api";
import { Cookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import PageButton from "./pageButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCrown } from "@fortawesome/free-solid-svg-icons";

export default function Main() {
  const cookies = new Cookies();
  const navigate = useNavigate();
  const [mission, setMission] = useState([]);
  const [ranking, setRanking] = useState([]);

  const itemsPerPage = 7;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = ranking ? Math.ceil(ranking.length / itemsPerPage) : 0;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPages = ranking
    ? ranking.slice(indexOfFirstItem, indexOfLastItem)
    : 0;

  useEffect(() => {
    async function fetchMission() {
      try {
        const res = await MissionAPI.findTodayMission();

        if (res.statusCode === 200) {
          setMission(res.data);
        }
      } catch (error) {
        console.error("Error fetching mission:", error);
      }
    }

    fetchMission();
  }, []);

  // useEffect(() => {
  //   async function recommendPlace() {
  //     try {
  //       const res = await UserAPI.recommendRestaurant(cookies.get('accessToken'));
  //       console.log(res);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   }

  //   recommendPlace();
  // }, [])

  useEffect(() => {
    async function rankingTitle() {
      try {
        const res = await UserAPI.rankingTitle();

        if (res.statusCode === 200) {
          setRanking(res.data);
        }
      } catch (err) {
        console.log(err);
      }
    }

    rankingTitle();
  }, []);

  return (
    <>
      {/* <h1 className={style.mainTitle}>오늘 뭐 먹지?</h1> */}
      <Header search={true} />
      <div
        className={style.missionContainer}
        onClick={() => {
          if (mission) {
            navigate("/places");
          }
        }}
      >
        <h1 className={style.missionTitle}>오늘의 미션장소는 ?</h1>
        {mission ? (
          <>
            <p>
              {mission.date} {mission.time}
            </p>
            <p>한 장소당 미션 가능 인원 {mission.capacity} 명</p>
            <h2 className={style.missionTitle}>Click here</h2>
          </>
        ) : (
          <h1 className={style.missionTitle}>Comming Soon</h1>
        )}
      </div>
      {/* <PlaceList title={"어제 가장 예약이 많았던 장소들"} />
      <PlaceList title={"성진님이 좋아할만한 장소들"} /> */}
      <div className={style.titleConainer}>
        <h1>칭호별 순위</h1>
        {ranking &&
          currentPages.map((title, index) => (
            <div key={index} className={style.rankingTitle}>
              <p className={style.titleCategory}>
                {title.foodCategory.category}
              </p>
              <p>
                {title.level} - {title.count} 번
              </p>
              <p><FontAwesomeIcon icon={faCrown} style={{color:'gold'}}/> {" "} {title.user.nickName}</p>
            </div>
          ))}
        <PageButton
          itemsPerPage={itemsPerPage}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          totalPages={totalPages}
          data={ranking}
        />
      </div>
    </>
  );
}
