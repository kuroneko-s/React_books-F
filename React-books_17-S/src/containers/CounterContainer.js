import { connect } from "../../node_modules/react-redux/es/exports";
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

export default connect(
  (state) => ({
    number: state.counter.number,
  }),
  (dispatch) => ({
    createIncrease: () => dispatch(createIncrease()),
    createDecrease: () => dispatch(createDecrease()),
  })
)(CounterContainer);
