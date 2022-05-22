import { useEffect } from "react";
import { connect } from "../../node_modules/react-redux/es/exports";
import Users from "../components/Users";
import { getUsers } from "../modules/users";

const UsersContainer = ({ users, getUsers }) => {
  console.log(users, getUsers);
  useEffect(() => {
    if (users) return; // 이미 있는 정보를 재요청하지 않는게 중요하다!
    getUsers();
  }, [getUsers, users]);
  return <Users users={users} />;
};

export default connect(
  (state) => ({
    users: state.users.users,
  }),
  {
    getUsers,
  }
)(UsersContainer);
