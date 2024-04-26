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
  const itemsPerPage = 7;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(foodMates.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPages = foodMates.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    async function findAllFoodMates(orderBy) {
      try {
        const res = await FoodMateAPI.findAllFoodMates({
          orderBy,
          selectCategory,
          region,
        });

        if (res.statusText === "OK") {
          setFoodMates(res.data.data);
        } else {
          alert(res.message);
        }
      } catch (error) {
        console.log(error);
      }
    }

    findAllFoodMates();
  }, [orderBy, selectCategory, region]);

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
        <BestList data={currentPages} />
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
