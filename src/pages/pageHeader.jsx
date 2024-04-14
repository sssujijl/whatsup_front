import style from "../styles/pageHeader.module.css";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const Title = styled.h1`
font-family: 'WAGURI';
font-size: 38px;
position: absolute;
left: 50px;
top: 15px;
`

export default function Header(props) {

  const [category, setCategory] = useState(false);

  return (
    <>
      <div className={style.header}>
        <Title>{props.title}</Title>
        <h2
          className={style.category}
          onMouseEnter={() => setCategory(true)}
          onMouseLeave={() => setCategory(false)}
        >
          {props.category && props.category}
        </h2>
        {category && <Category setCategory={setCategory} />}
        { props.orderBy && <OrderBy/> }
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
      </div>
    </>
  );
}

function OrderBy() {
  return (
    <>
      <p className={style.orderBy1}>최신순</p>
      <p className={style.orderBy2}>인기순</p>
    </>
  )
}

function Category(props) {
  return (
    <>
      <div
        className={style.categoryList}
        onMouseEnter={() => props.setCategory(true)}
        onMouseLeave={() => props.setCategory(false)}
      >
        <div>
          <button>한식</button>
          <button>양식</button>
          <button>중식</button>
          <button>일식</button>
          <button>야식</button>
          <button>분식</button>
          <button>카페</button>
        </div>
        <div className={style.btns}>
          <button>아시아음식</button>
          <button>베이커리</button>
          <button>패스트푸드</button>
          <button className={style.listBtn} style={{ borderRadius: "5px" }}>
            적용하기
          </button>
        </div>
      </div>
    </>
  );
}
