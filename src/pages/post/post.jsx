import { useNavigate, useParams } from "react-router-dom";
import style from "../../styles/post.module.css";
import styled from "styled-components";
import { useEffect, useState } from "react";
import FoodieAPI from "../../apis/foodie.api";
import FoodMateAPI from "../../apis/foodMate.api";
import { Cookies } from "react-cookie";

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

  useEffect(() => {
    async function fetechData() {
      try {
        if (url === "foodie") {
          const res = await FoodieAPI.findFoodie(id);
          setPost(res.data.data);
        } else {
          const res = await FoodMateAPI.findFoodMate(id);
          setPost(res.data.data);
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
        alert('게시물을 삭제할 권한이 없습니다.');
      }

      let res;
      if (url === "foodie") {
        res = await FoodieAPI.deleteFoodie(accessToken, id);
      } else {
        res = await FoodMateAPI.deleteFoodMate(accessToken, id);
      }
      console.log(res);
      if (res.data.statusCode === 200) {
        alert(res.data.message)
        window.location.href = `/${url}`;
      } else {
        alert(res.data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleApplication = async () => {
    try {
      const res = await FoodMateAPI.applicationFoodMate(accessToken, id);
      console.log(res.data.data.id);
      if (res.data.data.message) {
        alert(res.data.data.message)
      } else if (res.statusText === "OK") {
        alert(res.data.message);
        window.location.href = `/chatRoom/${res.data.data.id}`;
      } else {
        alert(res.data.message);
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
            {url === 'foodMate' && <button style={{right: '260px'}} onClick={() => handleApplication()}>신청하기</button>}
            <button style={{ right: "130px" }}>수정</button>
            <button onClick={handleDelete}>삭제</button>
          </div>
        )}
      </PostContainer>
    </>
  );
}
