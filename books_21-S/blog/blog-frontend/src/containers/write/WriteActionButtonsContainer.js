import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import WriteActionButtons from '../../components/write/WriteActionButtons';
import { writePost } from '../../modules/write';
import { useHistory } from 'react-router-dom';

export default function WriteActionButtonsContainer() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { title, body, tags, post, postError } = useSelector(({ write }) => ({
    title: write.title,
    body: write.body,
    tags: write.tags,
    post: write.post,
    postError: write.postError,
  }));

  const onPublish = () => {
    dispatch(
      writePost({
        title,
        body,
        tags,
      }),
    );
  };

  const onCancel = () => history.goBack(); // 뒤로가기

  // 성공 혹은 실패 시 작업
  useEffect(() => {
    if (post) {
      const { _id, user } = post;
      history.push(`/@${user.username}/${_id}`);
    }

    if (postError) {
      console.log(postError);
    }
  }, [history, post, postError]);

  return <WriteActionButtons onPublish={onPublish} onCancel={onCancel} />;
}
