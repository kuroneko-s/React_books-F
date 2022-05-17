import { BrowserRouter, Route } from "react-router-dom";
import NewsPage from "./components/NewsPage";

function App() {
  return (
    <BrowserRouter>
      <Route path={"/:category?"} component={NewsPage} />
    </BrowserRouter>
  );
}

export default App;
