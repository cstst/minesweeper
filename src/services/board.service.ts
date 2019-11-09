type Mine = "*";
type Clear = " ";
type Space = Mine | Clear;
type Row = Space[];

interface Board {
  [key: string]: Row;
}

export class BoardService {
  board: Board;

  constructor() {

  }

  generateBoard(boardWidth: number = 7, mineCount: number = 10): Board {
    if (boardWidth > 26) {
      throw Error(`\nA board with of ${boardWidth} is too large. Please limit the width to 26.\n`);
    }

    if (mineCount > Math.pow(boardWidth, 2)) {
      const errorMessage =
        `\nA board of width ${boardWidth} has ${boardWidth * boardWidth} squres.\n` +
        `You requested ${mineCount} mines.\n` +
        "Please request less mines or a larger board width.\n";

      throw Error(errorMessage);
    }

    const board: Board = {};

    // populate board with blank spaces
    for (let i = 1; i <= boardWidth; i++) {
      const letter = String.fromCharCode(64 + i);
      const blankRow: Row = Array.from({ length : boardWidth}).map(() => " ");
      board[letter] = blankRow;
    }

    return board;
  }

}
