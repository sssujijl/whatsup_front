import styled from "styled-components";
import style from "../../styles/bestList.module.css";
import { useNavigate } from "react-router-dom";

const BestViews = styled.div`
  width: 60%;
  height: 800px;
  margin-left: 20%;
  margin-top: 150px;

  font-family: "Pretendard";
`;

export default function BestList(props) {
  return (
    <>
      <BestViews>
        <h1>{props.title}</h1>
        {props.data &&
          props.data.length > 0 &&
          props.data.map((post, index) => <Post key={index} post={post} />)}
      </BestViews>
    </>
  );
}

function Post({ post }) {
  const navigate = useNavigate();
  const postDate = new Date(post.createdAt);
  const currentDate = new Date();
  const timeDiff = currentDate.getTime() - postDate.getTime();
  const diffMinutes = Math.floor(timeDiff / (1000 * 60));

  let displayDate;
  if (diffMinutes < 60) {
    displayDate = `${diffMinutes}분 전`;
  } else if (diffMinutes < 1440) {
    const diffHours = Math.floor(diffMinutes / 60);
    displayDate = `${diffHours}시간 전`;
  } else {
    displayDate = postDate.toLocaleDateString();
  }

  const handleClick = () => {
    navigate(`${post.id}`, { state: { post } });
  };

  return (
    <>
      <div className={style.post} onClick={handleClick}>
        <h3 className={style.title}>{post.title}</h3>
        {post.level && <p className={style.level}>{`${post.level} 이상`}</p>}
        <div className={style.content}>
          <p>{`조회수 ${post.views}`}</p>
          {post.foodieAnswers && <p>{`답변수 ${post.foodieAnswers.length}`}</p>}
          {post.userFoodMates && <p>{`신청수 ${post.userFoodMates.length}`}</p>}
          <p className={style.foodCate}>{post.foodCategory.category}</p>
          <p className={style.status}>{post.status}</p>
          <p className={style.createdAt}>{displayDate}</p>
        </div>
      </div>
    </>
  );
}
