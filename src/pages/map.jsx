import { useEffect, useRef, useState } from 'react';
import style from '../styles/map.module.css'
import Header from './pageHeader'
import PlaceList from './placeList_column';
import PlaceAPI from '../apis/place.api';
import PlaceMap from './placeMap';

export default function Map() {
  const mapElement = useRef(null);
  const { naver } = window;
  const [userAddress, setUserAddress] = useState();
  const [myLocation, setMyLocation] = useState();
  const [places, setPlaces] = useState(null);
  const [map, setMap] = useState();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setMyLocation({
            latitude: latitude,
            longitude: longitude,
          });

          naver.maps.Service.reverseGeocode({
            coords: new naver.maps.LatLng(latitude, longitude),
          }, function(status, response) {
            if (status !== naver.maps.Service.Status.OK) {
              return alert('Something wrong!');
            }

            const result = response.v2;
            setUserAddress(result.address.jibunAddress);
          })
        },
        () => {
          setMyLocation({ latitude: 37.4979517, longitude: 127.0276188 });
        }
      );
    }
  }, []);

  useEffect(() => {
    if (mapElement.current && naver && myLocation) {
      const location = new naver.maps.LatLng(myLocation.latitude, myLocation.longitude);
      const mapOptions = {
        center: location,
        zoom: 18,
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
        const placesData = await PlaceAPI.findAllPlace(userAddress);
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
      />
      <div className={style.container}>
        <PlaceList userAddress={userAddress} places={places}/>
        <PlaceMap places={places}  mapElement={mapElement} map={map}/>
      </div>
    </>
  );
}
