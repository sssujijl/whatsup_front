import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faStar } from "@fortawesome/free-solid-svg-icons"

export default function PlaceInfo () {
    return (
        <>
        <div>
            <img/>
            <div>
                <h1>가게이름</h1>
                <p>카테고리</p>
            </div>
            <div>
                <div><FontAwesomeIcon icon={faStar}/> 4.48</div>
                <p>리뷰 10</p>
            </div>
            <div>
                <div>
                    <p></p>
                    <p>저장</p>
                </div>
                <div>
                    <p></p>
                    <p>공유</p>
                </div>
            </div>
            <p></p>
        </div>
        </>
    )
}