import { useEffect, useRef, useState } from 'react';
import style from '../styles/map.module.css'
import Header from './pageHeader'
import PlaceList from './placeList_column';
import PlaceAPI from '../apis/place.api';
import PlaceMap from './placeMap';

export default function Map() {
  const mapElement = useRef(null);
  const { naver } = window;
  const [userAddress, setUserAddress] = useState(localStorage.getItem('userAddress') || '');
  const [myLocation, setMyLocation] = useState(JSON.parse(localStorage.getItem('myLocation')) || null);
  const [places, setPlaces] = useState(null);
  const [map, setMap] = useState();
  const [selectCategory, setSelectCategory] = useState(null);
  const [selectPlace, setSelectPlace] = useState(false);


  useEffect(() => {
    if (mapElement.current && naver && myLocation) {
      const location = new naver.maps.LatLng(myLocation.latitude, myLocation.longitude);
      const mapOptions = {
        center: location,
        zoom: 17,
        zoomControl: true,
        zoomControlOptions: {
          position: naver.maps.Position.RIGHT_TOP,
        },
      };

      const map = new naver.maps.Map(mapElement.current, mapOptions);
      setMap(map);
      new naver.maps.Marker({
        position: location,
        map,
      });
    }
  }, [naver, myLocation]);

  useEffect(() => {
    async function fetchPlace() {
      try {
        const placesData = await PlaceAPI.findAllPlace({userAddress, selectCategory});
        console.log(placesData);
        setPlaces(placesData);
      } catch (error) {
        console.error(error);
      }
    }
    fetchPlace();
  }, [userAddress]);

  return (
    <>
      <Header 
        category={'Category'}
        setSelectCategory={setSelectCategory}
      />
      <div className={style.container}>
        <PlaceList userAddress={userAddress} places={places} selectPlace={selectPlace}/>
        <PlaceMap 
          places={places} 
          mapElement={mapElement} 
          map={map} 
          setSelectPlace={setSelectPlace}
          selectPlace={selectPlace}
        />
      </div>
    </>
  );
}
