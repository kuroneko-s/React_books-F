import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Preloader } from "../lib/PreloadContext";
import { getUser } from "./../modules/users_saga";
import User from "./../components/User";

function UserContainer({ id }) {
  const user = useSelector((state) => state.users.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user && user.id === parseInt(id)) return;
    dispatch(getUser(id));
  }, [user, id, dispatch]);

  if (!user) {
    return <Preloader resolve={() => dispatch(getUser(id))} />;
  }

  return <User user={user} />;
}

export default UserContainer;
