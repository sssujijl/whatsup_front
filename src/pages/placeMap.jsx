import { useState, useEffect } from "react";
import style from '../styles/map.module.css'

export default function PlaceMap(props) {
  const { naver } = window;

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
            });
          }
        });
      });
    }
  }, [props.map, props.places]);

  return (
    <>
      <div ref={props.mapElement} className={style.map} />
    </>
  );
}
