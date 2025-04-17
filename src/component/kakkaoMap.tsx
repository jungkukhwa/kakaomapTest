// import React, { useState, useEffect } from "react";

// interface KakaoMapProps {
//   // lat: string | null;
//   // lng: string | null;
// }

// const KakaoMap: React.FC<KakaoMapProps> = () => {
//   // 위도 (latitude): lat
//   // 경도 (longitude): lng

//   const appkey = import.meta.env.VITE_KAKAO_MAP_KEY; // 앱키
//   const [lat, setLat] = useState<string | null>(null); // 위도
//   const [lng, setLng] = useState<string | null>(null); // 경도

//   useEffect(() => {
//     const params = new URLSearchParams(window.location.search);
//     setLat(params.get("lat"));
//     setLng(params.get("lng"));
//   }, []);

//   useEffect(() => {
//     // 이미 로드되어 있는지 확인
//     if (!window.kakao || !window.kakao.maps) {
//       const script = document.createElement("script");
//       script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${appkey}&autoload=false`;
//       script.async = true;

//       script.onload = () => {
//         window.kakao.maps.load(() => {
//           initMap();
//         });
//       };

//       document.head.appendChild(script);
//     } else {
//       initMap(); // 이미 로드되어 있다면 바로 실행
//     }

//     function initMap() {
//       // lat과 lng이 있으면 해당 값을 사용하고, 없으면 기본값 사용
//       const parsedLat = lat ? lat : 33.4620455;
//       const parsedLng = lng ? lng : 126.3292348;

//       const container = document.getElementById("map");
//       const options = {
//         center: new window.kakao.maps.LatLng(parsedLat, parsedLng),
//         level: 3,
//       };

//       const map = new window.kakao.maps.Map(container, options);
//       const markerPosition = new window.kakao.maps.LatLng(parsedLat, parsedLng);
//       const marker = new window.kakao.maps.Marker({
//         position: markerPosition,
//       });
//       marker.setMap(map);
//       // 지도 중심 좌표 변경
//       map.setCenter(markerPosition);

//       // 마커 위치 변경
//       marker.setPosition(marker);
//     }
//   }, [lat, lng]);

//   return (
//     <div style={{ width: "100%", height: "100vh", margin: 0, padding: 0 }}>
//       <div id="map" style={{ width: "100vw", height: "100vh" }}></div>
//     </div>
//   );
// };

// export default KakaoMap;

import React, { useState, useEffect } from "react";

const KakaoMap: React.FC = () => {
  const appkey = import.meta.env.VITE_KAKAO_MAP_KEY; // 앱키
  const [lat, setLat] = useState<string | null>(null); // 위도
  const [lng, setLng] = useState<string | null>(null); // 경도
  const [map, setMap] = useState<any>(null); // 지도 객체 저장

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setLat(params.get("lat"));
    setLng(params.get("lng"));
  }, []);

  useEffect(() => {
    // 이미 로드되어 있는지 확인
    if (!window.kakao || !window.kakao.maps) {
      const script = document.createElement("script");
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${appkey}&autoload=false`;
      script.async = true;

      script.onload = () => {
        window.kakao.maps.load(() => {
          initMap();
        });
      };

      document.head.appendChild(script);
    } else {
      initMap(); // 이미 로드되어 있다면 바로 실행
    }

    function initMap() {
      // lat과 lng이 null일 경우 기본값 사용
      const parsedLat = lat !== null ? parseFloat(lat) : 37.5665; // 서울 위도
      const parsedLng = lng !== null ? parseFloat(lng) : 126.978; // 서울 경도

      const container = document.getElementById("map");
      const options = {
        center: new window.kakao.maps.LatLng(parsedLat, parsedLng),
        level: 3,
      };

      const newMap = new window.kakao.maps.Map(container, options);
      setMap(newMap); // map 객체 저장

      const markerPosition = new window.kakao.maps.LatLng(parsedLat, parsedLng);
      const marker = new window.kakao.maps.Marker({
        position: markerPosition,
      });
      marker.setMap(newMap);

      // 지도 중심 좌표 변경
      newMap.setCenter(markerPosition);
    }
  }, [lat, lng]); // lat, lng 값이 변경될 때마다 지도 업데이트

  useEffect(() => {
    // lat, lng 값이 변경되었을 때, 지도 위치 갱신
    if (map && lat && lng) {
      const parsedLat = parseFloat(lat);
      const parsedLng = parseFloat(lng);
      const position = new window.kakao.maps.LatLng(parsedLat, parsedLng);
      map.setCenter(position); // 지도 위치 갱신
    }
  }, [lat, lng, map]);

  return (
    <div style={{ width: "100%", height: "100vh", margin: 0, padding: 0 }}>
      <div id="map" style={{ width: "100vw", height: "100vh" }}></div>
    </div>
  );
};

export default KakaoMap;
