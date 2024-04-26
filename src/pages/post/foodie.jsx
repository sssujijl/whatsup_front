import style from "../../styles/foodie.module.css";
import { useEffect, useState } from "react";
import Header from "../layout/pageHeader";
import BestList from "./bestList";
import FoodieAPI from "../../apis/foodie.api";
import styled from "styled-components";
import PageButton from "../layout/pageButton";

const Div = styled.div`
  height: 1200px;
  position: relative;
`;

export default function Foodie() {
  const [foodies, setFoodies] = useState([]);
  const [orderBy, setOrderBy] = useState("latest");
  const [selectCategory, setSelectCategory] = useState(null);
  const itemsPerPage = 7;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(foodies.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPages = foodies.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    async function findAllFoodie() {
      try {
        const res = await FoodieAPI.findAllFoodie({
          orderBy,
          selectCategory,
        });

        if (res.statusText === "OK") {
          setFoodies(res.data.data);
        } else {
          alert(res.message);
        }
      } catch (error) {
        console.log(error);
      }
    }
    findAllFoodie();
  }, [orderBy, selectCategory]);

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
      />
      <Div>
        <BestList data={currentPages} />
        <PageButton
            itemsPerPage={itemsPerPage}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
            totalPages={totalPages}
            data={foodies}
        />
      </Div>
    </>
  );
}
