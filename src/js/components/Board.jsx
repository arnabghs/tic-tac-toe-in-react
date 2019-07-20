import React from "react";

import { Square } from "./Square";

function Board(props) {
  function createBoard(winningComb) {
    let counter = 0;
    let rows = [];

    for (let column = 0; column < 3; column++) {
      let cells = [];
      for (let row = 0; row < 3; row++) {
        let winnningBlock = false;
        if (winningComb.includes(counter)) winnningBlock = true;
        cells.push(
          <Square key={counter} index={counter++} isWinSquare={winnningBlock} />
        );
      }
      rows.push(
        <div key={column} className="board-row">
          {cells}
        </div>
      );
    }
    return rows;
  }

  return <div>{createBoard(props.winningCombination)}</div>;
}

export { Board };
