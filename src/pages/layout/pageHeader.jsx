import style from "../../styles/pageHeader.module.css";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Region from "./regionInput";

const Title = styled.h1`
  font-family: "WAGURI";
  font-size: 38px;
  position: absolute;
  left: 50px;
  top: 15px;
`;

const HeaderContainer = styled.div`
  display: flex;

  font-family: "Pretendard";

  position: relative;
  margin-bottom: ${({ marginBottom }) => marginBottom || 0}px;
  z-index: 1;
`;

export default function Header(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const [category, setCategory] = useState(false);

  const handleCreatePost = () => {
    const createPath = `${location.pathname}/create`;
    navigate(createPath);
  };

  return (
    <>
      <HeaderContainer marginBottom={props.marginBottom}>
        <Title>{props.title}</Title>
        <p
          className={style.category}
          onMouseEnter={() => setCategory(true)}
          onMouseLeave={() => setCategory(false)}
        >
          {props.category && props.category}
        </p>
        {category && (
          <Category
            setCategory={setCategory}
            setSelectCategory={props.setSelectCategory}
          />
        )}
        {props.orderBy && (
          <OrderBy
            handleOrderByChange={props.handleOrderByChange}
            orderBy={props.OrderBy}
          />
        )}
        {props.create && <CreatePost handleCreatePost={handleCreatePost} />}
        {props.region && (
          <div className={style.region}>
            <Region setRegion={props.setRegion} />
          </div>
        )}
        {props.search && (
          <SearchInput
          />
        )}
      </HeaderContainer>
    </>
  );
}

function CreatePost({ handleCreatePost }) {
  return (
    <>
      <p className={style.create} onClick={handleCreatePost}>
        게시물 작성하기
      </p>
    </>
  );
}

function SearchInput() {
  return (
    <>
      <div className={style.searchContainer}>
        <input
          type="text"
          placeholder="검색어를 입력하세요."
          className={style.searchInput}
        />
        <button className={style.searchBtn}>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
      </div>
    </>
  );
}

function OrderBy({ handleOrderByChange, orderBy }) {
  return (
    <select
      className={style.orderBy}
      onChange={handleOrderByChange}
      value={orderBy}
    >
      <option value="createdAt">최신순</option>
      <option value="popular">인기순</option>
      <option value="views">조회수순</option>
    </select>
  );
}

function Category({ setSelectCategory, setCategory }) {
  const handleCategoryChange = (category) => {
    setSelectCategory(category);
  };

  return (
    <>
      <div
        className={style.categoryList}
        onMouseEnter={() => setCategory(true)}
        onMouseLeave={() => setCategory(false)}
      >
        <button
          style={{ marginLeft: "110px" }}
          onClick={() => handleCategoryChange("Korean")}
        >
          {" "}
          한식{" "}
        </button>
        <button onClick={() => handleCategoryChange("Western")}>양식</button>
        <button onClick={() => handleCategoryChange("Chinese")}>중식</button>
        <button onClick={() => handleCategoryChange("Japanese")}>일식</button>
        <button onClick={() => handleCategoryChange("NightFood")}>야식</button>
        <button onClick={() => handleCategoryChange("Snack")}>분식</button>
        <button onClick={() => handleCategoryChange("Meat")}>고기</button>
        <button onClick={() => handleCategoryChange("Dessert")}>디저트</button>
        <button
          style={{ width: "80px" }}
          onClick={() => handleCategoryChange("Asian")}
        >
          아시아음식
        </button>
        <button
          style={{ width: "80px" }}
          onClick={() => handleCategoryChange("FastFood")}
        >
          패스트푸드
        </button>
      </div>
    </>
  );
}
