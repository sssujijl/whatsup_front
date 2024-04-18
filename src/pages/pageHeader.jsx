import style from "../styles/pageHeader.module.css";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

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
  width: 100%;

  position: relative;
  margin-bottom: ${({ marginBottom }) => marginBottom || 0}px;
  z-index: 1;
`;

export default function Header(props) {
  const [category, setCategory] = useState(false);

  return (
    <>
      <HeaderContainer  marginBottom={props.marginBottom}>
        <Title>{props.title}</Title>
        <p
          className={style.category}
          onMouseEnter={() => setCategory(true)}
          onMouseLeave={() => setCategory(false)}
        >
          {props.category && props.category}
        </p>
        {category && <Category setCategory={setCategory} />}
        {props.orderBy && <OrderBy handleOrderByChange={props.handleOrderByChange} orderBy={props.OrderBy} />}
        {props.create && <CreatePost/>}
        {props.search && <SearchInput />}
      </HeaderContainer>
    </>
  );
}

function CreatePost() {
  return (
    <>
      <p className={style.create}>게시물 작성하기</p>
    </>
  )
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
      <select className={style.orderBy} onChange={handleOrderByChange} value={orderBy}>
          <option value="createdAt">최신순</option>
          <option value="popular">인기순</option>
          <option value="views">조회수순</option>
      </select>
  );
}

function Category(props) {
  return (
    <>
      <div
        className={style.categoryList}
        onMouseEnter={() => props.setCategory(true)}
        onMouseLeave={() => props.setCategory(false)}
      >
        <button style={{ marginLeft: "110px" }}>한식</button>
        <button>양식</button>
        <button>중식</button>
        <button>일식</button>
        <button>야식</button>
        <button>분식</button>
        <button>카페</button>
        <button style={{ width: "80px" }}>아시아음식</button>
        <button style={{ width: "80px" }}>베이커리</button>
        <button style={{ width: "80px" }}>패스트푸드</button>
      </div>
    </>
  );
}
