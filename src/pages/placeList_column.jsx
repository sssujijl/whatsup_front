import { useEffect, useState } from "react";
import style from "../styles/placeList-column.module.css";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import PlaceAPI from "../apis/place.api";

const FlexDiv = styled.div`
  display: flex;
`;

export default function PlaceList(props) {
  const [address, setAddress] = useState(false);

  const toggleAddress = (index) => {
    setAddress(address === index ? null : index);
  };

  return (
    <>
      <div className={style.placeList}>
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
        <h2 style={{ marginLeft: "30px", marginTop: "50px", color:'gray'}}>
          {props.userAddress}
        </h2>
        {props.places && !props.selectPlace &&
          props.places.slice(0, 10).map((place, index) => (
            <div className={style.place} key={index}>
              <FlexDiv>
                <h3 className={style.place_title}>{place.title}</h3>
                <p className={style.place_category}>{place.foodCategory.category}</p>
                <button className={style.place_star}>
                  <FontAwesomeIcon icon={faStar} />
                </button>
              </FlexDiv>
              <FlexDiv style={{ position: "relative", bottom: "15px" }}>
                <p className={style.place_review}>{`리뷰 ${place.reviews.length}`}</p>
                <div className={style.place_addressContainer}>
                  <p className={style.place_address}>{place.address.match(/(.*?(동|리))/)[1]}</p>
                  <button className={style.place_addressBtn} onClick={() => toggleAddress(index)}>
                    <FontAwesomeIcon icon={faChevronDown} />
                  </button>
                </div>
              </FlexDiv>
              {address === index && <Address address={place.address} roadAddress={place.roadAddress}/>}
            </div>
          ))}
      </div>
    </>
  );
}

function Address({address, roadAddress}) {
  return (
    <>
      <div className={style.address}>
        <p>지번주소 : {address}</p>
        <hr/>
        <p>도로명주소 : {roadAddress}</p>
      </div>
    </>
  )
}