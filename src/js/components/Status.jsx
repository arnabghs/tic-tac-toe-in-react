import React from "react";
import { connect } from "react-redux";

const mapStateToProps = state => {
  return {
    isXNext: state.isXNext,
    currentSquares: state.currentSquares,
    winResult: state.winResult
  };
};

const Status = function(props) {
  let message = `Turn of ${props.isXNext ? "X" : "O"}`;
  const { won, winner } = props.winResult;

  if (!props.currentSquares.includes(null)) {
    message = `Game is drawn.`;
  }

  if (won) {
    message = `${winner} has won!`;
  }

  return <div>{message}</div>;
};

const StatusContainer = connect(mapStateToProps)(Status);

export { StatusContainer };
