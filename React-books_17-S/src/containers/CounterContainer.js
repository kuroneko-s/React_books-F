import { useCallback } from "react";
import {
  useDispatch,
  useSelector,
} from "../../node_modules/react-redux/es/exports";
import Counter from "../components/Counter";
import { createDecrease, createIncrease } from "../modules/counter";

const CounterContainer = () => {
  const number = useSelector((state) => state.counter.number);
  const dispatch = useDispatch();
  const onIncrease = useCallback(() => dispatch(createIncrease()), [dispatch]);
  const onDecrease = useCallback(() => dispatch(createDecrease()), [dispatch]);

  return (
    <Counter number={number} onIncrease={onIncrease} onDecrease={onDecrease} />
  );
};

/*
step_01
  (dispatch) => ({
    createIncrease: () => dispatch(createIncrease()),
    createDecrease: () => dispatch(createDecrease()),
  })
step_02
bindActionCreators(
    {
      createIncrease,
      createDecrease,
    },
    dispatch
  )
step_03
{
  createIncrease, 
  createDecrease
}
*/

/* export default connect(
  (state) => ({
    number: state.counter.number,
  }),
  {
    createIncrease,
    createDecrease,
  }
)(CounterContainer);
 */

export default CounterContainer;
