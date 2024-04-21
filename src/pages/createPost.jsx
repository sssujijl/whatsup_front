import style from "../styles/createPost.module.css";
import { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import PlaceAPI from "../apis/place.api";
import Region from "./regionInput";

export default function CreatePost(props) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [level, setLevel] = useState('');
  const [option, setOption] = useState(false);
  const [region, setRegion] = useState('');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [capacity, setCapacity] = useState('');
  const [dateTime, setDateTime] = useState('');

  return (
    <>
      <div className={style.postContainer}>
        <input 
          type="text" 
          value={title} 
          placeholder="제목을 입력하세요" 
          className={style.title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div style={{display:'flex', position:'relative' }}>
          <FoodCategory setCategory={setCategory}/>
          { props.foodie && <Level setLevel={setLevel}/> }
          { props.foodMate &&
            <button 
              className={`${style.optionBtn} ${option ? style.selectedOption : ''}`} 
              onClick={() => setOption(!option)}>
              {option ? '옵션 숨기기' : '옵션 선택하기'}
            </button>
          }
        </div>
        { option &&
          <div className={style.optionContainer}>
            <Region/>
            <FoodMateOption
                setGender={setGender}
                setAge={setAge}
                setCapacity={setCapacity}
                setDateTime={setDateTime}
              />
            </div>
          }
        <Quill/>
        <button className={style.createBtn}>작성하기</button>
      </div>
    </>
  );
}

function FoodMateOption(props) {
  const capacityOptions = [];
  const ageOptions = [];

  for (let i = 1; i <= 10; i++) {
    capacityOptions.push(<option key={i} value={i}>{i}명</option>);
  }

  for (let i = 1; i <= 5; i++) {
    const ageGroup = `${i * 10}대`;
    ageOptions.push(<option key={i} value={ageGroup}>{ageGroup}</option>);
  }

  return(
    <>
      <div>
        
      </div>
      <select onChange={(e) => props.setGender(e.target.value)}>
        <option value='Gender_neutral'>성별무관</option>
        <option value='M'>남자만</option>
        <option value='F'>여자만</option>
      </select>
      <select onChange={(e) => props.setAge(e.target.value)}>
        <option key="age-any" value="age-any">나이대무관</option>
        {ageOptions}
      </select>
      <select onChange={(e) => props.setCapacity(e.target.value)}>
        <option key="capacity-any" value="capacity-any">인원수무관</option>
        {capacityOptions}
      </select>
      <input 
        type="datetime-local" 
        className={style.dateTimeInput} 
        onChange={(e) => props.setDateTime(e.target.value)}
      />
    </>
  )
}

function FoodCategory({ setCategory }) {
  return (
    <>
      <select className={style.selectCategory} onChange={(e) => setCategory(e.target.value)}>
        <option value='1'>한식</option>
        <option value='2'>양식</option>
        <option value='3'>중식</option>
        <option value='4'>일식</option>
        <option value='5'>아시안</option>
        <option value='6'>야식</option>
        <option value='7'>분식</option>
        <option value='8'>패스트푸드</option>
        <option value='9'>디저트</option>
        <option value='10'>고기</option>
      </select>
    </>
  )
}

function Level({ setLevel }) {
  return (
    <>
      <select className={style.level} onChange={(e) => setLevel(e.target.value)}>
        <option value='입문'>입문</option>
        <option value='초보'>초보</option>
        <option value='중수'>중수</option>
        <option value='고수'>고수</option>
        <option value='전문가'>전문가</option>
        <option value='신'>신</option>
        <option value='음식'>음식</option>
      </select>
    </>
  )
}

function Quill() {
  const [content, setContent] = useState('');

  const modules = {
    toolbar: [
      [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
      [{size: []}],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'},
       {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      ['clean']
    ],
  };

  return (
    <>
      <div style={{overflowY:'auto', height:'530px'}}>
        <ReactQuill
          theme="snow"
          value={content}
          onChange={setContent}
          modules={modules}
          style={{height:'450px'}}
        />
      </div>
    </>
  );
}

