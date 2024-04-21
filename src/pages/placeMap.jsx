import { useState, useEffect } from "react";
import style from '../styles/map.module.css'

export default function PlaceMap(props) {
  const { naver } = window;
  const [clickedPlace, setClickedPlace] = useState(null);

  useEffect(() => {
    if (props.map && props.places) {
      props.places.forEach(place => {
        naver.maps.Service.geocode({
          address: place.address
        }, (status, response) => {
          if (status === naver.maps.Service.Status.OK) {
            const coord = response.result.items[0].point;
            const marker = new naver.maps.Marker({
              map: props.map,
              position: coord,
              title: place.title
            });
            const infoWindow = new naver.maps.InfoWindow({
              content: `<div><h3>${place.title}</h3><p>${place.address}</p></div>`
            });

            naver.maps.Event.addListener(marker, 'click', () => {
              infoWindow.open(props.map, marker);
              props.setSelectPlace(true);
              setClickedPlace(place);
            });
          }
        });
      });
    }
  }, [props.map, props.places]);
  console.log(clickedPlace);
  return (
    <>
      <div ref={props.mapElement} className={style.map} />
      {props.selectPlace && <Place place={clickedPlace}/>}
    </>
  );
}

function Place({ place }) {
  return (
    <>
      <div className={style.place}>
        <h1>나 여기있어!!!!!!!</h1>
        <h1>{place.title}</h1>
        <p>{place.foodCategory.category}</p>
        <div style={{display:'flex'}}>
          <p>별점</p>
          <p>방문자리뷰 {place.reviews.length}</p>
        </div>
        <div style={{display:'flex'}}>
          <button>홈</button>
          <button>메뉴</button>
          <button>예약</button>
          <button>리뷰</button>
        </div>
        <p>{place.address}</p>
        <p>{place.roadAddress}</p>
        <p>{place.link}</p>
      </div>
    </>
  )
}
