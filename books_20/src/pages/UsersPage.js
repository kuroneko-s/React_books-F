import UsersContainer from "../containers/UsersContainer";
import { Route } from "react-router-dom";
import UserContainer from "../containers/UserContainer";

const UsersPage = () => {
  return (
    <>
      <UsersContainer />
      <Route
        path={"/users/:id"}
        render={({ match }) => <UserContainer id={match.id} />}
      />
    </>
  );
};

export default UsersPage;
