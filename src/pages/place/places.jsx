import { useEffect, useState } from "react";
import Header from "../layout/pageHeader";
import PlaceAPI from "../../apis/place.api";
import style from "../../styles/places.module.css";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import PageButton from "../layout/pageButton";

const FlexDiv = styled.div`
  display: flex;
`;

export default function Places() {
  const [userAddress, setUserAddress] = useState(
    localStorage.getItem("userAddress") || ""
  );
  const [places, setPlaces] = useState([]);
  const [selectCategory, setSelectCategory] = useState(null);
  const itemsPerPage = 7;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(places.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPages = places.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    async function fetchPlace() {
      try {
        const res = await PlaceAPI.findAllPlace({
          userAddress,
          selectCategory,
        });

        if (res.statusCode === 200) {
          setPlaces(res.data);
        } else {
          alert(res.message);
        }
        
      } catch (error) {
        console.error(error);
      }
    }
    fetchPlace();
  }, [userAddress]);

  return (
    <>
      <Header
        category={"Category"}
        search={true}
        setSelectCategory={setSelectCategory}
      />
      <div className={style.mainContainer}>
        {places &&
          currentPages.map((place, index) => (
            <div
              className={style.contents}
              key={index}
              // onClick={() => {
              //   props.setSelectPlace(true);
              //   props.setClickedPlace(place);
              // }}
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
                  <p className={style.place_address}>{place.address}</p>
                </div>
              </FlexDiv>
            </div>
          ))}
        <PageButton
          itemsPerPage={itemsPerPage}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          totalPages={totalPages}
          data={places}
        />
      </div>
    </>
  );
}
