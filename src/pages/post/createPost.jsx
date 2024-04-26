import style from "../../styles/createPost.module.css";
import { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import PlaceAPI from "../../apis/place.api";
import Region from "../layout/regionInput";

export default function CreatePost(props) {
  const [option, setOption] = useState(false);
  const [foodCategory, setFoodCategory] = useState([]);

  useEffect(() => {
    const fetechDate = async () => {
      try {
        const res = await PlaceAPI.findAllFoodCategory();

        if (res.statusText === "OK") {
          setFoodCategory(res.data.data);
        } else {
          alert(res.message);
        }
        
      } catch (err) {
        console.log(err);
      }
    };
    fetechDate();
  }, []);

  return (
    <>
      <div className={style.postContainer}>
        <input
          type="text"
          value={props.title}
          placeholder="제목을 입력하세요"
          className={style.title}
          onChange={(e) => props.setTitle(e.target.value)}
        />
        <div style={{ display: "flex", position: "relative" }}>
          <FoodCategory
            setCategory={props.setCategory}
            foodCategory={foodCategory}
          />
          {props.foodie && <Level setLevel={props.setLevel} />}
          {props.foodMate && (
            <button
              className={`${style.optionBtn} ${
                option ? style.selectedOption : ""
              }`}
              onClick={() => setOption(!option)}
            >
              {option ? "옵션 숨기기" : "옵션 선택하기"}
            </button>
          )}
        </div>
        {option && (
          <div className={style.optionContainer}>
            <Region setRegion={props.setRegion} />
            <FoodMateOption
              setGender={props.setGender}
              setAge={props.setAge}
              setCapacity={props.setCapacity}
              setDateTime={props.setDateTime}
            />
          </div>
        )}
        <Quill content={props.content} setContent={props.setContent} />
        <button
          className={style.createBtn}
          onClick={() => props.handleCreate()}
        >
          작성하기
        </button>
      </div>
    </>
  );
}

function FoodMateOption(props) {
  const capacityOptions = [];
  const ageOptions = [];

  for (let i = 1; i <= 10; i++) {
    capacityOptions.push(
      <option key={i} value={i}>
        {i}명
      </option>
    );
  }

  for (let i = 1; i <= 5; i++) {
    const ageGroup = `${i * 10}대`;
    ageOptions.push(
      <option key={i} value={ageGroup}>
        {ageGroup}
      </option>
    );
  }

  return (
    <>
      <div></div>
      <select onChange={(e) => props.setGender(e.target.value)}>
        <option value="">성별 선택</option>
        <option value="Gender_neutral">성별무관</option>
        <option value="M">남자만</option>
        <option value="F">여자만</option>
      </select>
      <select onChange={(e) => props.setAge(e.target.value)}>
        <option value="">연령대 선택</option>
        <option key="age-any" value="age-any">
          나이대무관
        </option>
        {ageOptions}
      </select>
      <select onChange={(e) => props.setCapacity(e.target.value)}>
        <option value="">인원수 선택</option>
        <option key="capacity-any" value="capacity-any">
          인원수무관
        </option>
        {capacityOptions}
      </select>
      <input
        type="datetime-local"
        className={style.dateTimeInput}
        onChange={(e) => props.setDateTime(e.target.value)}
      />
    </>
  );
}

function FoodCategory({ setCategory, foodCategory }) {
  const [selectedMainCategory, setSelectedMainCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");

  const handleMainCategoryChange = (mainCategory) => {
    setSelectedMainCategory(mainCategory);
    setSelectedSubCategory("");
    setCategory(null);
  };

  const handleSubCategoryChange = (subCategory) => {
    setSelectedSubCategory(subCategory);
    setCategory(subCategory);
  };

  return (
    <>
      <div>
        <select
          className={style.selectCategory}
          onChange={(e) => handleMainCategoryChange(e.target.value)}
          value={selectedMainCategory}
        >
          <option value="">대분류 선택</option>
          {Object.keys(foodCategory).map((mainCategory, index) => (
            <option key={index} value={mainCategory}>
              {mainCategory}
            </option>
          ))}
        </select>

        {selectedMainCategory && (
          <select
            className={style.selectCategory}
            onChange={(e) => handleSubCategoryChange(e.target.value)}
            value={selectedSubCategory}
          >
            <option value="">소분류 선택</option>
            {foodCategory[selectedMainCategory].map((subCategory, index) => (
              <option key={index} value={subCategory.split(":")[0].trim()}>
                {subCategory.split(":")[1].trim()}
              </option>
            ))}
          </select>
        )}
      </div>
    </>
  );
}

function Level({ setLevel }) {
  return (
    <>
      <select
        className={style.level}
        onChange={(e) => setLevel(e.target.value)}
      >
        <option value="">레벨 선택</option>
        <option value="입문">입문</option>
        <option value="초보">초보</option>
        <option value="중수">중수</option>
        <option value="고수">고수</option>
        <option value="전문가">전문가</option>
        <option value="신">신</option>
        <option value="음식">음식</option>
      </select>
    </>
  );
}

function Quill({ content, setContent }) {
  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
    ],
  };

  return (
    <>
      <div style={{ overflowY: "auto", height: "530px" }}>
        <ReactQuill
          theme="snow"
          value={content}
          onChange={setContent}
          modules={modules}
          style={{ height: "450px" }}
        />
      </div>
    </>
  );
}
