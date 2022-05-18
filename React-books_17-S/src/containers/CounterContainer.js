import { connect } from "../../node_modules/react-redux/es/exports";
import Counter from "../components/Counter";

const CounterContainer = ({ number, createIncrease, createDecrease }) => {
  return (
    <Counter
      number={number}
      onIncrease={createIncrease}
      onDecrease={createDecrease}
    />
  );
};

const mapStateToProps = (state) => ({
  number: state.counter.number,
});

const mapDispatchToProps = (dispatch) => ({
  createIncrease: () => {
    console.log("increase");
  },
  createDecrease: () => {
    console.log("decrease");
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CounterContainer);
