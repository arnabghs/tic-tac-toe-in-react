export function clickSquare(index) {
  return { type: "Click_Square", index };
}

export function jumpTo(step) {
  return { type: "Jump_To", step };
}