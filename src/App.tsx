import KakaoMap from "./component/kakkaoMap";
import "./App.css";
import { useEffect, useState } from "react";
function App() {
  // const [lat, setLat] = useState<string | null>(null);
  // const [lng, setLng] = useState<string | null>(null);

  // useEffect(() => {
  //   const params = new URLSearchParams(window.location.search);
  //   setLat(params.get("lat"));
  //   setLng(params.get("lng"));
  // }, []);

  return <KakaoMap />;
}

export default App;
