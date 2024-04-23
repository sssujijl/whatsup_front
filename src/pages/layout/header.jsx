import styled from "styled-components";
import style from '../../styles/header.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments, faUser } from '@fortawesome/free-solid-svg-icons'
import { useNavigate, navigate } from "react-router-dom";
import { Cookies } from "react-cookie";
import { useState, useEffect } from "react";

const Head = styled.header`
background-color: black;
width: 100%;
height: 80px;
display: flex;
`

export default function Header(props) {
    let navigate = useNavigate();
    const { naver } = window;
    const cookies = new Cookies();
    const [accessToken, setAccessToken] = useState('');

    useEffect(() => {
        const token = cookies.get('accessToken');
        setAccessToken(token);
    }, []);

    useEffect(() => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const { latitude, longitude } = position.coords;
              localStorage.setItem('myLocation', JSON.stringify({ latitude, longitude }));
    
              naver.maps.Service.reverseGeocode({
                coords: new naver.maps.LatLng(latitude, longitude),
              }, function(status, response) {
                if (status !== naver.maps.Service.Status.OK) {
                  return alert('Something wrong!');
                }
    
                const result = response.v2;
                localStorage.setItem('userAddress', result.address.jibunAddress);
              })
            },
            () => {
                localStorage.setItem('myLocation', JSON.stringify({ latitude: 37.4979517, longitude: 127.0276188 }));
                localStorage.setItem('userAddress', '대한민국 서울특별시 강남구 역삼동 736');
            }
          );
        }
      }, []);

    return (
        <>
        <Head>
            <div className={style.logo} onClick={() => { navigate('/') }}>What's UP ?!</div>
            <div className={style.list}>
                <p className={style.map} onClick={() => { navigate('/map') }}>MAP</p>
                <p className={style.place} onClick={() => { navigate('/places') }}>Places</p>
                <p className={style.foodie} onClick={() => { navigate('/foodie') }}>Foodie</p>
                <p className={style.foodMate} onClick={() => { navigate('/foodMate') }}>FoodMate</p>
                { accessToken ? <User navigate={navigate}/> : <Sign navigate={navigate}/> }
            </div>
        </Head>
        </>
    )
}

function Sign({navigate}) {
    return (
        <>
            <p className={style.login} onClick={() => { navigate('/login') }}>Login</p>
            <p className={style.signup} onClick={() => { navigate('/signup') }}>Signup</p>
        </>
    )
}

function User({navigate}) {
    return (
        <>
          <p className={style.chat} onClick={() => { navigate('/chatRoom') }}><FontAwesomeIcon icon={faComments}></FontAwesomeIcon></p>
          <p className={style.user} onClick={() => { navigate('/user') }}><FontAwesomeIcon icon={faUser}/></p>
        </>
    )
}