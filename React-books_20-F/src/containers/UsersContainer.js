import React, { useEffect } from "react";
import { connect } from "react-redux";
import Users from "../components/Users";
import { Preloader } from "../lib/PreloadContext";
import { getUsers } from "../modules/users_saga";

const UsersContainer = ({ users, getUsers }) => {
  // 이 코드는 Front에서 동작하는 코드, 서버에서는 동작 안함
  useEffect(() => {
    if (users) return; // 이미 있는 정보를 재요청하지 않는게 중요하다!
    getUsers();
  }, [getUsers, users]);
  return (
    <>
      <Users users={users} />
      <Preloader resolve={getUsers} />
    </>
  );
};

export default connect(
  (state) => ({
    users: state.users.users,
  }),
  {
    getUsers,
  }
)(UsersContainer);
