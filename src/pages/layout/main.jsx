import style from "../../styles/main.module.css";
import Header from "./pageHeader";
import PlaceList from "../place/placeList_row";
import MissionAPI from "../../apis/mission.api";
import { useState, useEffect } from "react";

export default function Main() {
  const [mission, setMission] = useState(null);

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

  return (
    <>
      <h1 className={style.mainTitle}>오늘 뭐 먹지?</h1>
      <Header search={true} />
      <div className={style.missionContainer}>
        <h1 className={style.missionTitle}>오늘의 미션장소는 ?</h1>
        <div className={style.missionInfos}>
          <h1 className={style.comming}>Comming Soon</h1>
        </div>
      </div>
      <PlaceList title={"어제 가장 예약이 많았던 장소들"} />
      <PlaceList title={"성진님이 좋아할만한 장소들"} />
    </>
  );
}
