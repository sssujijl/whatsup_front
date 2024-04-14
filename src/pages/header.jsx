import styled from "styled-components";
import style from '../styles/header.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from "react-router-dom";

const Head = styled.header`
background-color: black;
width: 100%;
height: 80px;
display: flex;
`

export default function Header(props) {
    let navigate = useNavigate();

    return (
        <>
        <Head>
            <div className={style.logo} onClick={() => { navigate('/') }}>What's UP ?!</div>
            <div className={style.list}>
                <p className={style.map} onClick={() => { navigate('/map') }}>MAP</p>
                <p className={style.place} onClick={() => { navigate('/places') }}>Places</p>
                <p className={style.foodie} onClick={() => { navigate('/foodie') }}>Foodie</p>
                <p className={style.foodMate} onClick={() => { navigate('/foodMate') }}>FoodMate</p>
                <p className={style.login} onClick={() => { navigate('/login') }}>Login</p>
                {/* <p className={style.login} onClick={() => { props.setLogin(props.login === true ? false : true)}}>Login</p> */}
                <p className={style.signup} onClick={() => { navigate('/signup') }}>Signup</p>
                <p className={style.user} onClick={() => { navigate('/user') }}><FontAwesomeIcon icon={faUser}/></p>
            </div>
        </Head>
        </>
    )
}