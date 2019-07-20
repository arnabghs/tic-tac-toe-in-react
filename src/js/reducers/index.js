import { JUMP_TO, CLICK_SQUARE } from "../constants/action-types";
import { getWinner } from "../util";
const _ = require("lodash");

const initialState = {
  history: [
    {
      squares: new Array(9).fill(null)
    }
  ],
  isXNext: true,
  lastPlayedIndex: null,
  stepNumber: 0,
  currentSquares: new Array(9).fill(null),
  extraMessage: "",
  winResult: { won: false, winner: null, winnningComb: [] }
};

function rootReducer(state = initialState, action) {
  if (action.type === JUMP_TO) {
    const history = state.history.slice(0, action.step + 1);
    const current = _.last(history).squares.slice();

    return Object.assign({}, state, {
      stepNumber: action.step,
      currentSquares: current
    });
  }

  if (action.type === CLICK_SQUARE) {
    const currentSquares = _.last(state.history).squares.slice();
    if (state.winResult.won || currentSquares[action.index] || !currentSquares.includes(null)) {
      return state;
    }
    currentSquares[action.index] = state.isXNext ? "X" : "O";

    return Object.assign({}, state, {
      history: state.history.concat([{ squares: currentSquares }]),
      isXNext: !state.isXNext,
      lastPlayedIndex: action.index,
      stepNumber: state.history.length,
      currentSquares: currentSquares,
      extraMessage: "",
      winResult: getWinner(currentSquares, state.lastPlayedIndex)
    });
  }

  if (action.type === "Used_Cell") {
    return Object.assign({}, state, {
      extraMessage: `Sorry, cell ${action.index} already occupied`
    });
  }

  return state;
}
export default rootReducer;
