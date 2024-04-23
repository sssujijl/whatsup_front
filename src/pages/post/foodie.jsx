import style from "../../styles/foodie.module.css";
import { useEffect, useState } from "react";
import Header from "../layout/pageHeader";
import BestList from "./bestList";
import FoodieAPI from "../../apis/foodie.api";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import PageButton from "../layout/pageButton";

const Div = styled.div`
  height: 1200px;
  position: relative;
`;

export default function Foodie() {
  const [foodies, setFoodies] = useState([]);
  const [orderBy, setOrderBy] = useState("latest");
  const [selectCategory, setSelectCategory] = useState(null);
  const itemsPerPage = 4;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(foodies.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPages = foodies.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    async function findAllFoodie() {
      try {
        const foodies = await FoodieAPI.findAllFoodie({
          orderBy,
          selectCategory,
        });
        if (!foodies.message) {
          setFoodies(foodies);
        } else {
          alert(foodies.message);
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
        <BestList data={foodies} />
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
