import { connect } from "react-redux";
import Counter from "../components/Counter";
import { createDecrease, createIncrease } from "../modules/counter";

const CounterContainer = ({ number, createIncrease, createDecrease }) => {
  return (
    <Counter
      number={number}
      onIncrease={createIncrease}
      onDecrease={createDecrease}
    />
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

export default connect(
  (state) => ({
    number: state.counter.number,
  }),
  {
    createIncrease,
    createDecrease,
  }
)(CounterContainer);
