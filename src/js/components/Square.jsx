import React from "react";
import { connect } from "react-redux";
import { clickSquare } from "../actions/index";

const mapStateToProps = state => {
  return { squares: state.currentSquares };
};

const mapDispatchToProps = dispatch => {
  return {
    clickSquare: index => dispatch(clickSquare(index))
  };
};

const ConnectedSquare = function(props) {
  let cls = "square";
  if (props.isWinSquare) cls = "winning-square";
  return (
    <button className={cls} onClick={props.clickSquare.bind(this, props.index)}>
      {props.squares[props.index]}
    </button>
  );
};

const Square = connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectedSquare);

export { Square };
