import style from '../styles/placeList.module.css'

export default function PlaceList(props) {
    return (
        <>
            <div className={style.centerContainer}>
                <h1>{props.title}</h1>
                <h3>충청남도 서북구 기준</h3>
                <div className={style.places}>
                    <div className={style.place}></div>
                </div>
            </div>
        </>
    )
}