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
  // => useCallback으로 안감싸주면 Editor가 계속 redrendering됨
  // 그냥 function으로 선언했으면 re render 과정에서 해당 함수가 계속 새로 생성이 될거고
  // Editor 내에서 해당 함수를 의존하고 있는 함수가 Rerender 대상으로 들어가져서 코드가 이상해짐
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
