import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUser } from "./../modules/users_saga";
import User from "./../components/User";
import { usePreloader } from './../lib/PreloadContext';

function UserContainer({ id }) {
  const user = useSelector((state) => state.users.user);
  const dispatch = useDispatch();

  usePreloader(() => dispatch(getUser(id)));
  useEffect(() => {
    if (user && user.id === parseInt(id)) return;
    dispatch(getUser(id));
  }, [user, id, dispatch]);

  if (!user) return null

  return <User user={user} />;
}

export default UserContainer;
