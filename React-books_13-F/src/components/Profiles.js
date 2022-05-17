import { Switch } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { Route } from "react-router-dom";
import { Link } from "react-router-dom";
import Profile from "./Profile";

export default function Profiles(props) {
  console.log("props - ", props);
  const { match } = props;

  return (
    <>
      <hr />
      <NavLink to={"/profiles/velopert"} activeStyle={{ background: "red" }}>
        velopert
      </NavLink>
      <br />
      <NavLink to={"/profiles/gildong"} activeStyle={{ background: "red" }}>
        gildong
      </NavLink>

      <hr />
      <Switch>
        <Route
          path={"/profiles"}
          exact
          render={() => <div>사용자를 선택해주세요.</div>}
        />
        <Route path={"/profiles/:username"} component={Profile} />
      </Switch>
    </>
  );
}
