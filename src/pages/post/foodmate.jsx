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
  const [search, setSearch] = useState("");

  const itemsPerPage = 7;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = foodMates ? Math.ceil(foodMates.length / itemsPerPage) : 0;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPages = foodMates ? foodMates.slice(indexOfFirstItem, indexOfLastItem) : 0;

  useEffect(() => {
    async function findAllFoodMates() {
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

  const handleSearch = async () => {
    try {
      const res = await FoodMateAPI.searchFoodMates(search);
      if (res.statusCode === 200) {
        setFoodMates(res.data);
      } else {
        alert(res.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Header
        category={"Category"}
        setSelectCategory={setSelectCategory}
        orderBy={true}
        OrderBy={orderBy}
        handleOrderByChange={handleOrderByChange}
        searchInput={true}
        search={search}
        setSearch={setSearch}
        handleSearch={handleSearch}
        create={true}
        region={true}
        setRegion={setRegion}
      />
      {foodMates ? (
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
      ) : (
        <div style={{ height: "800px" }}>
          <h1 style={{ textAlign: "center", marginTop: "150px" }}>
             해당하는 게시물을 찾을 수 없습니다.
          </h1>
        </div>
      )}
    </>
  );
}
