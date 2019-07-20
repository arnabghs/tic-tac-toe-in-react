import React from "react";
import { connect } from "react-redux";
import { jumpTo } from "../actions/index";

const mapStateToProps = state => {
  return { history: state.history };
};

const mapDispatchToProps = dispatch => {
  return {
    jumpTo: step => dispatch(jumpTo(step))
  };
};

const MovesHistory = function({ history, jumpTo }) {
  let list = history.map((ob, move) => {
    const description = move ? "Go to move #" + move : "Go to game start";
    return (
      <li key={move}>
        <button onClick={jumpTo.bind(this, move)}>{description}</button>
      </li>
    );
  });

  return <ol>{list}</ol>;
};

const MovesHistoryContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MovesHistory);

export { MovesHistoryContainer };
