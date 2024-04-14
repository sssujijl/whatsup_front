import style from '../styles/main.module.css'
import Header from './pageHeader';
import PlaceList from './placeList';

export default function Main() {
    return (
        <>
        <h1 className={style.mainTitle}>오늘 뭐 먹지?</h1>
        <Header/>
        <div className={style.missionContainer}>
            <h1 className={style.missionTitle}>오늘의 미션장소는 ?</h1>
            <h3 style={{color:'gray'}}>충청남도 서북구 기준</h3>
            <div className={style.missionInfos}></div>
        </div>
        <PlaceList title={'어제 가장 예약이 많았던 장소들'}/>
        <PlaceList title={'성진님이 좋아할만한 장소들'}/>
        </>
    )
}