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
    const fn = async () => {
      try {
        console.log(getPost);
        await getPost(1);
        await getUsers();
      } catch (e) {
        // 여기서 에러가 발생하면 Promise<Error> 타입으로 나오는 듯
        // 그래서 바로 접근해서는 확인을 못함
        console.error("에러 발생");
        console.error(e);
      }
    };
    fn();
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
