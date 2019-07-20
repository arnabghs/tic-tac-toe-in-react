import { CLICK_SQUARE } from "../constants/action-types";

export function usedCellMiddleware(store) {
  return function(next) {
    return function(action) {
      if (action.type === CLICK_SQUARE) {
        let currentSquares = store.getState().currentSquares;
        let winResult = store.getState().winResult;
        if (currentSquares[action.index] && !winResult.won) {
          return store.dispatch({ type: "Used_Cell", index: action.index });
          //or same can be done, action = { type: "Used_Cell", index: action.index };
        }
      }
      return next(action);
    };
  };
}
