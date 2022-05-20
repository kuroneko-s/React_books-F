import { useEffect } from "react";
import { connect } from "react-redux";
import Sample from "../components/Sample";
import { getPost, getUsers } from "../modules/sample";

const SampleContainer = ({
  loadingPost,
  loadingUsers,
  post,
  users,
  getPost,
  getUsers,
}) => {
  useEffect(() => {
    getPost(1);
    getUsers();
  }, [getPost, getUsers]);

  return (
    <Sample
      loadingPost={loadingPost}
      loadingUsers={loadingUsers}
      post={post}
      users={users}
    />
  );
};

export default connect(
  (state) => ({
    post: state.sample.post,
    users: state.sample.users,
    loadingPost: state.loading["sample/GET_POST"],
    loadingUsers: state.loading["sample/GET_USERS"],
  }),
  {
    getPost,
    getUsers,
  }
)(SampleContainer);
