import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
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

  renderSquare(i) {
    return (
      <Square
        key={i}
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  createBoard() {
    let counter = 0;
    let rows = [];

    for (let column = 0; column < 3; column++) {
      let cells = [];
      for (let row = 0; row < 3; row++) {
        cells.push(this.renderSquare(counter++));
      }
      rows.push(<div key = {column} className="board-row">{cells}</div>);
    }
    return rows;
  }

  render() {
    let status = `Turn of ${this.state.isXNext ? "X" : "O"}`;
    let result = getWinner(this.state.squares, this.state.lastPlayedIndex);
    if (result.won) {
      status = `${result.winner} has won!`;
    }

    if (!this.state.squares.includes(null)) {
      status = `Game is drawn.`;
    }

    return (
      <div>
        <div className="status">{status}</div>
        {this.createBoard()}
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

const hasWon = function(squares) {
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
    comb =>
      squares[comb[0]] &&
      squares[comb[0]] === squares[comb[1]] &&
      squares[comb[1]] === squares[comb[2]]
  );

  return hasWon;
};

const getWinner = function(squares, lastPlayedIndex) {
  if (hasWon(squares)) {
    return { won: true, winner: squares[lastPlayedIndex] };
  }
  return { won: false, winner: null };
};

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));
