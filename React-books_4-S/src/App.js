import { useState } from "react";
import axios from "../node_modules/axios/index";
import { API_KEY } from "./api";

function App() {
  // news data
  const [data, setData] = useState(null);
  // 특정 카테고리 business entertainment health science sports technology
  //https://newsapi.org/v2/top-headlines?country=kr&category=business&apiKey=8f564083165d4b04817ebe1cfe187fea
  const onClick = () => {
    axios
      .get(`https://newsapi.org/v2/top-headlines?country=kr&apiKey=${API_KEY}`)
      .then((response) => setData(response.data));
  };

  return (
    <div>
      <button onClick={onClick}> 불러오기</button>
      <hr />
      {data && (
        <textarea value={JSON.stringify(data, null, 2)} readOnly={true} />
      )}
    </div>
  );
}

export default App;
