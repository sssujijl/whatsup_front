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
  const [search, setSearch] = useState("");
  console.log(orderBy)
  const itemsPerPage = 7;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = foodies ? Math.ceil(foodies.length / itemsPerPage) : 0;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPages = foodies
    ? foodies.slice(indexOfFirstItem, indexOfLastItem)
    : 0;

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

  const handleSearch = async () => {
    try {
      const res = await FoodieAPI.searchFoodies(search);

      if (res.statusCode === 200) {
        setFoodies(res.data);
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
      />
      {foodies ? (
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
      ) : (
        <div style={{ height: "800px" }}>
          <h1 style={{textAlign:'center', marginTop:'150px'}}>해당하는 게시물을 찾을 수 없습니다.</h1>
        </div>
      )}
    </>
  );
}
