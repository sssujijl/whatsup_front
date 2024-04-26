import { useState, useEffect } from "react";
import style from "../../styles/map.module.css";

export default function PlaceMap(props) {
  const { naver } = window;
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    markers.forEach((marker) => {
      marker.setMap(null);
    });

    const newMarkers = [];
    if (props.map && props.places) {
      props.places.forEach((place) => {
        naver.maps.Service.geocode(
          {
            address: place.address,
          },
          (status, response) => {
            if (status === naver.maps.Service.Status.OK) {
              const coord = response.result.items[0].point;
              const marker = new naver.maps.Marker({
                map: props.map,
                position: coord,
                title: place.title,
              });

              naver.maps.Event.addListener(marker, "click", () => {
                props.setSelectPlace(true);
                props.setClickedPlace(place);
                props.map.setCenter(coord);
              });

              newMarkers.push(marker);
            }
          }
        );
      });
    }

    setMarkers(newMarkers);

    return () => {
      markers.forEach((marker) => {
        marker.setMap(null);
      });
    };
  }, [props.map, props.places]);

  return (
    <>
      <div ref={props.mapElement} className={style.map} />
    </>
  );
}
