import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import style from "../../styles/createReview.module.css";
import Quill from "../layout/quill";
import ReviewAPI from "../../apis/review.api";
import { Cookies } from "react-cookie";

export default function CreateReview() {
  const location = useLocation();
  const cookies = new Cookies();
  const { reservationId, place } = location.state;
  const [rating, setRating] = useState("");
  const [content, setContent] = useState("");

  const handleStarClick = (index) => {
    setRating(`Rating_${index + 1}`);
  };
  console.log(rating);
  const handleCreateReview = async () => {
    try {
      const accessToken = cookies.get("accessToken");
      const data = {
        rating,
        content,
      };

      const res = await ReviewAPI.createReview(
        accessToken,
        place.id,
        data,
        reservationId
      );
      console.log(res);
      if (res.statusCode === 201) {
        alert(res.message);
        window.history.back();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className={style.reviewContainer}>
        <h1>{place.title} 어떠셨나요 ?</h1>
        <div className={style.starRating}>
          {[...Array(5)].map((_, index) => (
            <FontAwesomeIcon
              key={index}
              icon={
                index < parseInt(rating.split("_")[1]) ? solidStar : regularStar
              }
              className={`${style.star} ${
                index < parseInt(rating.split("_")[1]) ? style.active : ""
              }`}
              onClick={() => handleStarClick(index)}
            />
          ))}
        </div>
        <Quill content={content} setContent={setContent} />
        <button onClick={() => handleCreateReview()}>작성하기</button>
      </div>
    </>
  );
}
