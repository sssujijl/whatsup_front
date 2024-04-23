import style from "../../styles/foodie.module.css";
import { useState, useEffect } from "react";
import Header from "../layout/pageHeader";
import BestList from "./bestList";
import FoodMateAPI from "../../apis/foodMate.api";
import styled from "styled-components";
import PageButton from "../layout/pageButton";

const Div = styled.div`
  height: 1200px;
  position: relative;
`;

export default function FoodMate() {
  const [foodMates, setFoodMates] = useState([]);
  const [orderBy, setOrderBy] = useState("createdAt");
  const [selectCategory, setSelectCategory] = useState(null);
  const [region, setRegion] = useState("");
  const itemsPerPage = 4;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(foodMates.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPages = foodMates.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    async function findAllFoodMates(orderBy) {
      try {
        const foodMates = await FoodMateAPI.findAllFoodMates({
          orderBy,
          selectCategory,
          region,
        });
        console.log(foodMates);
        if (!foodMates.message) {
          setFoodMates(foodMates);
        } else {
          alert(foodMates.message);
        }
      } catch (error) {
        console.log(error);
      }
    }

    findAllFoodMates();
  }, [orderBy, selectCategory, region]);
  console.log(region);
  const handleOrderByChange = (e) => {
    setOrderBy(e.target.value);
  };

  return (
    <>
      <Header
        category={"Category"}
        setSelectCategory={setSelectCategory}
        orderBy={true}
        OrderBy={orderBy}
        handleOrderByChange={handleOrderByChange}
        search={true}
        create={true}
        region={true}
        setRegion={setRegion}
      />
      <Div>
        <BestList data={foodMates} />
        <PageButton
          itemsPerPage={itemsPerPage}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          totalPages={totalPages}
          data={foodMates}
        />
      </Div>
    </>
  );
}
