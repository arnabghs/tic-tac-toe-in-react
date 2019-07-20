import React from "react";
import { connect } from "react-redux";

import { Board } from "./Board";
import { MovesHistoryContainer } from "./History";
import { StatusContainer } from "./Status";
import { ExtraMessage } from "./Message";

const ConnectedGame = props => {
  let winComb = [];
  const { won, winnningComb } = props.winResult;

  if (won) {
    winComb = winnningComb.slice();
  }

  return (
    <div className="game">
      <div>
        <ExtraMessage />
      </div>
      <div className="game-board">
        <Board winningCombination={winComb} />
      </div>
      <div className="game-info">
        <StatusContainer />
        <MovesHistoryContainer />
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    winResult: state.winResult
  };
};

const Game = connect(mapStateToProps)(ConnectedGame);

export { Game };
