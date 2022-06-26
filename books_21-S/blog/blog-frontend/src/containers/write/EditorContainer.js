import Editor from '../../components/write/Editor';
import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useEffect } from 'react';
import { changeField, initialize } from '../../modules/write';

export default function EditorContainer() {
  const dispatch = useDispatch();
  const { title, body } = useSelector(({ write }) => ({
    title: write.title,
    body: write.body,
  }));

  // 특정 값 ( title, body, tags )에 변화를 줌
  // TODO: 이 부분 useCallback 쓴 이유가 모호해서 테스트 해봐야함
  const onChangeField = useCallback(
    (payload) => {
      dispatch(changeField(payload));
    },
    [dispatch],
  );

  // 컴포넌트 언마운트 될 때 state 값 초기화
  useEffect(() => {
    return () => {
      dispatch(initialize());
    };
  }, [dispatch]);

  return <Editor onChangeField={onChangeField} title={title} body={body} />;
}
