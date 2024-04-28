import { useNavigate, useParams } from "react-router-dom";
import style from "../../styles/post.module.css";
import styled from "styled-components";
import { useEffect, useState } from "react";
import FoodieAPI from "../../apis/foodie.api";
import FoodMateAPI from "../../apis/foodMate.api";
import { Cookies } from "react-cookie";
import Quill from "../layout/quill";

const PostContainer = styled.div`
  width: 50%;
  min-height: 700px;
  margin: 30px auto;
  border: 1px solid gray;
`;

export default function Post(props) {
  const navigate = useNavigate();
  const cookies = new Cookies();
  const accessToken = cookies.get("accessToken");
  const { id } = useParams();
  const url = new URL(window.location.href).pathname.split("/")[1];
  const [post, setPost] = useState([]);
  const [answer, setAnswer] = useState(false);
  const [content, setContent] = useState("");
  const [foodieAnswers, setFoodieAnswers] = useState([]);

  useEffect(() => {
    async function fetechData() {
      try {
        if (url === "foodie") {
          const resFoodie = await FoodieAPI.findFoodie(id);
          const resAnswer = await FoodieAPI.findAllAnswers(id);
          setPost(resFoodie.data);
          setFoodieAnswers(resAnswer.data);
        } else {
          const res = await FoodMateAPI.findFoodMate(id);
          setPost(res.data);
        }
      } catch (err) {
        console.log(err);
      }
    }
    fetechData();
  }, []);

  const handleDelete = async () => {
    try {
      if (!accessToken) {
        alert("게시물을 삭제할 권한이 없습니다.");
      }

      let res;
      if (url === "foodie") {
        res = await FoodieAPI.deleteFoodie(accessToken, id);
      } else {
        res = await FoodMateAPI.deleteFoodMate(accessToken, id);
      }

      alert(res.message);
      if (res.statusCode === 200) {
        window.location.href = `/${url}`;
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleApplication = async () => {
    try {
      const res = await FoodMateAPI.applicationFoodMate(accessToken, id);

      alert(res.message);
      if (res.statusCode === 200) {
        window.location.href = `/chatRoom/${res.data.data.id}`;
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleCheckTitle = async () => {
    try {
      const res = await FoodieAPI.checkTitle(accessToken, id);

      alert(res.message);
      if (res.statusCode === 200) {
        setAnswer(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleCreateFoodieAnswer = async () => {
    try {
      const res = await FoodieAPI.createFoodieAnswer(
        { content },
        accessToken,
        id
      );

      alert(res.message);
      if (res.statusCode === 200) {
        window.location.reload();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteFoodieAnswer = async (foodieAnswerId) => {
    try {
      const res = await FoodieAPI.deleteAnswer(accessToken, id, foodieAnswerId);

      alert(res.message);
      if (res.statusCode === 200) {
        window.location.reload();
      }

    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <PostContainer>
        {post && (
          <div className={style.post}>
            <h1>{post.title}</h1>
            <p>작성자 : {post.user && post.user.nickName}</p>
            <p style={{ float: "right" }}>조회수 {post.views}</p>
            <p>{post.foodCategory && post.foodCategory.category}</p>
            <p>{post.level}</p>
            <div
              style={{
                border: "1px solid gray",
                padding: "8px",
                textAlign: "center",
              }}
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
            <p>{post.status}</p>
            <p>
              작성 날짜 :{" "}
              {post.createdAt && new Date(post.createdAt).toLocaleString()}
            </p>
            {url === "foodMate" ? (
              <button
                style={{ right: "255px" }}
                onClick={() => handleApplication()}
              >
                신청하기
              </button>
            ) : (
              <button
                style={{ right: "255px" }}
                onClick={() => handleCheckTitle()}
              >
                답변 달기
              </button>
            )}
            <button style={{ right: "130px" }}>수정</button>
            <button onClick={handleDelete}>삭제</button>
          </div>
        )}
        {answer && (
          <div style={{ width: "90%", margin: "100px auto 30px" }}>
            <Quill content={content} setContent={setContent} />
            <button
              style={{
                width: "150px",
                height: "45px",
                marginLeft: "auto",
                display: "block",
              }}
              onClick={() => handleCreateFoodieAnswer()}
            >
              답변 작성하기
            </button>
          </div>
        )}
        {foodieAnswers &&
          foodieAnswers.map((foodieAnswer, index) => (
            <div key={index} className={style.foodieAnswerContainer}>
              <p>{foodieAnswer.user.nickName}</p>
              <p>{foodieAnswer.status}</p>
              {foodieAnswer.images && (
                <img src={foodieAnswer.images} alt="리뷰 이미지" />
              )}
              <div dangerouslySetInnerHTML={{ __html: foodieAnswer.content }} />
              <p style={{ textAlign: "end" }}>
                {new Date(foodieAnswer.updatedAt).toLocaleString()}
              </p>
              <div style={{marginLeft:'auto', display:'flex'}}>
                <button>수정하기</button>
                <button onClick={() => handleDeleteFoodieAnswer(foodieAnswer.id)}>삭제하기</button>
              </div>
            </div>
          ))}
      </PostContainer>
    </>
  );
}
