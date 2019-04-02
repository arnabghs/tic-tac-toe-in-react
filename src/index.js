import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

function Square(props) {
	let cls = "square";
	if(props.isWinSquare) cls= "winning-square";
  return (
    <button className={cls} onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: new Array(9).fill(null),
      isXNext: true,
      lastPlayedIndex: null
    };
  }

  handleClick(i) {
    let result = getWinner(this.state.squares, this.state.lastPlayedIndex);
    if (
      result.won ||
      this.state.squares[i] ||
      !this.state.squares.includes(null)
    )
      return;

    const updatedSquares = this.state.squares.slice();
    updatedSquares[i] = this.state.isXNext ? "X" : "O";
    this.setState({
      squares: updatedSquares,
      isXNext: !this.state.isXNext,
      lastPlayedIndex: i
    });
  }

  renderSquare(i, winnningBlock) {
    return (
      <Square
        key={i}
        value={this.state.squares[i]}
				onClick={() => this.handleClick(i)}
				isWinSquare={winnningBlock}
      />
    );
  }

  createBoard(winningComb) {
    let counter = 0;
    let rows = [];

    for (let column = 0; column < 3; column++) {
      let cells = [];
      for (let row = 0; row < 3; row++) {
        let winnningBlock = false;
        if(winningComb.includes(counter)) winnningBlock = true;
        cells.push(this.renderSquare(counter++,winnningBlock));
      }
      rows.push(
        <div key={column} className="board-row">
          {cells}
        </div>
      );
    }
    return rows;
  }

  render() {
    let winComb = [];
    let status = `Turn of ${this.state.isXNext ? "X" : "O"}`;
    const { won, winner, winnningComb } = getWinner(
      this.state.squares,
      this.state.lastPlayedIndex
    );

    if (!this.state.squares.includes(null)) {
      status = `Game is drawn.`;
    }

    if (won) {
      status = `${winner} has won!`;
			winComb = winnningComb.slice();
    }

    return (
      <div>
        <div className="status">{status}</div>
        {this.createBoard(winComb)}
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

const checkWinningCondition = function(squares, combination) {
  return (
    squares[combination[0]] &&
    squares[combination[0]] === squares[combination[1]] &&
    squares[combination[1]] === squares[combination[2]]
  );
};

const isGameWon = function(squares) {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  const hasWon = winningCombinations.some(
    checkWinningCondition.bind(null, squares)
  );

  const winningComb = winningCombinations.find(
    checkWinningCondition.bind(null, squares)
  );

  return { hasWon, winningComb };
};

const getWinner = function(squares, lastPlayedIndex) {
  const { hasWon, winningComb } = isGameWon(squares);
  if (hasWon) {
    return {
      won: true,
      winner: squares[lastPlayedIndex],
      winnningComb: winningComb
    };
  }
  return { won: false, winner: null, winnningComb: [] };
};

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));
