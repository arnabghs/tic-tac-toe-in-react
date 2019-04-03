import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { getWinner } from "./util";

function Square(props) {
  let cls = "square";
  if (props.isWinSquare) cls = "winning-square";
  return (
    <button className={cls} onClick={props.onClick}>
      {props.value}
    </button>
  );
}

function Board(props) {
  function renderSquare(index, winnningBlock) {
    return (
      <Square
        key={index}
        value={props.squares[index]}
        onClick={() => props.onClick(index)}
        isWinSquare={winnningBlock}
      />
    );
  }

  function createBoard(winningComb) {
    let counter = 0;
    let rows = [];

    for (let column = 0; column < 3; column++) {
      let cells = [];
      for (let row = 0; row < 3; row++) {
        let winnningBlock = false;
        if (winningComb.includes(counter)) winnningBlock = true;
        cells.push(renderSquare(counter++, winnningBlock));
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

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: new Array(9).fill(null)
        }
      ],
      isXNext: true,
      lastPlayedIndex: null,
      stepNumber: 0
    };
  }

  handleClick(index) {
    const history = this.state.history.slice(0,this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    let result = getWinner(squares, this.state.lastPlayedIndex);
    if (result.won || squares[index] || !squares.includes(null)) return;

		squares[index] = this.state.isXNext ? "X" : "O";
		
    this.setState({
      history: this.state.history.concat([{ squares: squares }]),
      isXNext: !this.state.isXNext,
			lastPlayedIndex: index,
			stepNumber: history.length,
		});
  }

  jumpTo(step) {
		this.setState({
			stepNumber : step,
			isXNext : (step%2 === 0),
		})
	}

  render() {
    const history = this.state.history;
		const currentSquares = history[this.state.stepNumber].squares;

    let winComb = [];
    let status = `Turn of ${this.state.isXNext ? "X" : "O"}`;
    const { won, winner, winnningComb } = getWinner(
      currentSquares,
      this.state.lastPlayedIndex
    );

    if (!currentSquares.includes(null)) {
      status = `Game is drawn.`;
    }

    if (won) {
      status = `${winner} has won!`;
      winComb = winnningComb.slice();
    }

    //............
    const moves = history.map((step, move) => {
      const desc = move ? "Go to move #" + move : "Go to game start";
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });
    //..........

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={currentSquares}
            onClick={this.handleClick.bind(this)}
            lastPlayedIndex={this.state.lastPlayedIndex}
            winningCombination={winComb}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));
