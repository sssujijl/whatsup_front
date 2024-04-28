import { useEffect, useRef, useState } from "react";
import style from "../../styles/map.module.css";
import Header from "../layout/pageHeader";
import PlaceList from "./placeList_column";
import PlaceAPI from "../../apis/place.api";
import PlaceMap from "./placeMap";

export default function Map() {
  const mapElement = useRef(null);
  const { naver } = window;
  const [userAddress, setUserAddress] = useState(
    localStorage.getItem("userAddress") || ""
  );
  const [myLocation, setMyLocation] = useState(
    JSON.parse(localStorage.getItem("myLocation")) || null
  );
  const [places, setPlaces] = useState(null);
  const [map, setMap] = useState();
  const [selectCategory, setSelectCategory] = useState(null);
  const [selectPlace, setSelectPlace] = useState(false);
  const [clickedPlace, setClickedPlace] = useState(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (mapElement.current && naver && myLocation) {
      const location = new naver.maps.LatLng(
        myLocation.latitude,
        myLocation.longitude
      );
      const mapOptions = {
        center: location,
        zoom: 16,
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

  const handleSearchNearby = () => {
    if (!map) return;
    const center = map.getCenter();
  
    naver.maps.Service.reverseGeocode({
      coords: new naver.maps.LatLng(center.lat(), center.lng()),
    }, function(status, response) {
      if (status !== naver.maps.Service.Status.OK) {
        return alert('Something wrong!');
      }
  
      const result = response.v2;
      setUserAddress(result.address.jibunAddress);
    });
  };

  useEffect(() => {
    async function fetchPlace() {
      try {
        const res = await PlaceAPI.findAllPlace({
          userAddress,
          selectCategory,
        });
        setPlaces(res.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchPlace();
  }, [userAddress, selectCategory]);

  const handleSearchPlace = async () => {
    try {
      const res = await PlaceAPI.searchPlace(search);
      
      if (res.statusCode === 200) {
        setPlaces(res.data);
      } else {
        alert(res.message)
      }
      
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Header 
        category={"Category"} 
        setSelectCategory={setSelectCategory}
      />
      <div className={style.container}>
        <PlaceList
          searchInput={true}
          userAddress={userAddress}
          places={places}
          selectPlace={selectPlace}
          clickedPlace={clickedPlace}
          setSelectPlace={setSelectPlace}
          search={search}
          setSearch={setSearch}
          handleSearch={handleSearchPlace}
          setClickedPlace={setClickedPlace}
          setPlaces={setPlaces}
        />
        <PlaceMap
          places={places}
          mapElement={mapElement}
          map={map}
          setSelectPlace={setSelectPlace}
          setClickedPlace={setClickedPlace}
        />
        <button className={style.reSearchBtn} onClick={() => handleSearchNearby()}>현재 위치에서 검색하기</button>
      </div>
    </>
  );
}
