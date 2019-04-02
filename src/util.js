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

export { getWinner };