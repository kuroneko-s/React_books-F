import { Link, Route, Switch, BrowserRouter } from "react-router-dom";
import Home from "./components/Home";
import Profiles from "./components/Profiles";

function App() {
  return (
    <>
      <hr />
      <BrowserRouter>
        <Link to="/">Home</Link>
        <br />
        <Link to="/profiles">Profile</Link>
        <Switch>
          <Route path={"/"} component={Home} exact={true} />
          <Route path={"/profiles"} component={Profiles} />
          <Route
            render={({ location }) => (
              <div>
                <h2>이 페이지는 존재하지 않습니다.</h2>
                <p>{location.pathname}</p>
              </div>
            )}
          />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
