import { useEffect, useRef, useState } from 'react';
import style from '../styles/map.module.css'
import styled from 'styled-components';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from '@fortawesome/free-regular-svg-icons';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import 음식 from '../img/음식.jpeg'
import Header from './pageHeader'

const FlexDiv = styled.div`
display: flex;
`

export default function Map() {
  const mapElement = useRef(null);
  const { naver } = window;

  const [myLocation, setMyLocation] = useState({ latitude: 37.4979517, longitude: 127.0276188 });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setMyLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          console.log(position);
        },
        () => {
          setMyLocation({ latitude: 37.4979517, longitude: 127.0276188 });
        }
      );
    }

    if (mapElement.current && naver) {
      const location = new naver.maps.LatLng(myLocation.latitude, myLocation.longitude);
      const mapOptions = {
        center: location,
        zoom: 18,
        zoomControl: true,
      };

      const map = new naver.maps.Map(mapElement.current, mapOptions);
      new naver.maps.Marker({
        position: location,
        map,
      });
    }
  }, [mapElement, myLocation, naver]);

  return (
    <>
      <Header 
        category={'Category'}
      />
      <div className={style.container}>
        <PlaceList/>
        {/* <div ref={mapElement} className={style.map} /> */}
        <div className={style.map}/>
      </div>
    </>
  );
}

function PlaceList() {
  return (
    <>
      <div className={style.placeList}>
        <h2 style={{marginLeft:'30px', marginTop:'50px'}}>충청남도 서북구 기준</h2>
        <div className={style.place}>
          <FlexDiv>
            <h2 className={style.place_title}>가게이름</h2>
            <p className={style.place_category}>한식</p>
            <button className={style.place_star}><FontAwesomeIcon icon={faStar}/></button>
          </FlexDiv>
          <FlexDiv style={{position:'relative', bottom:'15px'}}>
            <p className={style.place_status}>영업 중</p>
            <p className={style.place_review}>리뷰 100</p>
            <div className={style.place_addressContainer}>
              <p className={style.place_address}>천안 동남구 신부동</p>
              <button className={style.place_addressBtn}><FontAwesomeIcon icon={faChevronDown}/></button>
            </div>
          </FlexDiv>
          <div className={style.imgs}>
            <img src={음식}/>
          </div>
        </div>
      </div>
    </>
  )
}