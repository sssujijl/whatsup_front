import styled from "styled-components"
import style from '../styles/bestList.module.css'

const BestViews = styled.div`
width: 60%;
margin-left: 20%;
margin-bottom: 100px;

font-family: 'Pretendard';
`

export default function BestList(props) {
    return (
        <>
        <BestViews>
            <h1>많이 본 Foodie</h1>
            <Post/>
            <Post/>
        </BestViews>
        </>
    )
}

function Post() {
    return (
        <>
        <div className={style.Foodie}>
            <h3 className={style.title}>질문 제목</h3>
            <div className={style.content}>
                <p>조회수 10</p>
                <p>답변수 5</p>
                <p className={style.foodCate}>마라 .</p>
                <p className={style.level}>고수 이상</p>
                <p className={style.createdAt}>2024-04-14 19:05</p>
            </div>
        </div>
        </>
    )
}