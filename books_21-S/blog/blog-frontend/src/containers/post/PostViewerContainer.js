import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PostViewer from '../../components/post/PostViewer';
import { readPost, unloadPost } from '../../modules/post';

function PostViewerContainer({ match }) {
  const { postId } = match.params; // URL에 있는 값 받아오려고
  const dispatch = useDispatch();
  // loading = redux의 loading
  /**
   * {
   *    post: "post value",
   *    error: "error value"
   * }
   */
  // loading { } 값임 empty 상태였다가 값이 들어오면 해당 값이 false, true 이런식으로 된다라는 뜻
  const { post, error, loading } = useSelector(({ post, loading }) => ({
    post: post.post,
    error: post.error,
    loading: loading['post/READ_POST'],
  }));

  useEffect(() => {
    dispatch(readPost(postId));
    return () => {
      dispatch(unloadPost());
    };
  }, [dispatch, postId]);

  return <PostViewer post={post} loading={loading} error={error} />;
}

export default withRouter(PostViewerContainer);
