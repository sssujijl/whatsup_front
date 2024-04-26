import { useEffect, useState } from "react";
import style from "../../styles/placeList-column.module.css";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import PlaceInfo from "./placeInfo";

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
        {props.searchInput && (
          <div className={style.searchContainer}>
            <input
              type="text"
              placeholder="검색어를 입력하세요."
              className={style.searchInput}
              value={props.search}
              onChange={(e) => props.setSearch(e.target.value)}
            />
            <button className={style.searchBtn} onClick={props.handleSearch}>
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
          </div>
        )}
        <h2 style={{ marginLeft: "30px", marginTop: "50px", color: "gray" }}>
          {props.userAddress}
        </h2>
        {props.places &&
          !props.selectPlace &&
          props.places.map((place, index) => (
            <div
              className={style.place}
              key={index}
              onClick={() => {
                props.setSelectPlace(true);
                props.setClickedPlace(place);
              }}
            >
              <FlexDiv>
                <h3 className={style.place_title}>{place.title}</h3>
                <p className={style.place_category}>
                  {place.foodCategory.category}
                </p>
                <button className={style.place_star}>
                  <FontAwesomeIcon icon={faStar} />
                </button>
              </FlexDiv>
              <FlexDiv style={{ position: "relative", bottom: "15px" }}>
                <p
                  className={style.place_review}
                >{`리뷰 ${place.reviews.length}`}</p>
                <div className={style.place_addressContainer}>
                  <p className={style.place_address}>
                    {place.address.match(/(.*?(동|리))/)[1]}
                  </p>
                  <button
                    className={style.place_addressBtn}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleAddress(index);
                    }}
                  >
                    <FontAwesomeIcon icon={faChevronDown} />
                  </button>
                </div>
              </FlexDiv>
              {address === index && (
                <Address
                  address={place.address}
                  roadAddress={place.roadAddress}
                />
              )}
            </div>
          ))}
        {props.selectPlace && (
          <PlaceInfo
            place={props.clickedPlace}
            setSelectPlace={props.setSelectPlace}
          />
        )}
      </div>
    </>
  );
}

function Address({ address, roadAddress }) {
  return (
    <>
      <div className={style.address}>
        <p>지번주소 : {address}</p>
        <hr />
        <p>도로명주소 : {roadAddress}</p>
      </div>
    </>
  );
}
