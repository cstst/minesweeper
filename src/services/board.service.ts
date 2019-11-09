import { getRandomInt } from "../helpers/random.helper";

type Mine = "*";
type Clear = " ";
type Space = Mine | Clear;
type Row = Space[];

export interface Board {
  [key: string]: Row;
}

export class BoardService {
  private board: Board;

  constructor() {

  }

  createBoard(boardWidth: number = 7, mineCount: number = 10): void {
    const blankBoard = this.generateBlankBoard(boardWidth);
    const minedSpaces = this.generateMinePlacement(boardWidth, mineCount);
    const minedBoard = this.mineBoard(blankBoard, minedSpaces);

    this.board = minedBoard;
  }

  getBoard(): Board {
    return this.board;
  }

  private mineBoard(board: Board, minedSpaces: string[]): Board {
    return minedSpaces.reduce((acc, val) => {
      const [ row, column ] = val;

      const minedRow = [ ...acc[row] ];
      minedRow[parseInt(column, 10) - 1] = "*";

      return { ...acc, [row]: minedRow };
    }, { ...board });
  }

  private generateBlankBoard(boardWidth: number): Board {
    if (boardWidth > 26) {
      throw Error(`\nA board with of ${boardWidth} is too large. Please limit the width to 26.\n`);
    }
    if (boardWidth < 1) {
      throw Error(`\nA board with of ${boardWidth} is too small. Please request a width above 0.\n`);
    }

    const board: Board = {};

    for (let i = 1; i <= boardWidth; i++) {
      const letter = String.fromCharCode(64 + i);
      const blankRow: Row = Array.from({ length : boardWidth}).map(() => " ");
      board[letter] = blankRow;
    }

    return board;
  }

  private generateMinePlacement(boardWidth: number, mineCount: number): string[] {
    if (mineCount > Math.pow(boardWidth, 2)) {
      const errorMessage =
        `\nA board of width ${boardWidth} has ${boardWidth * boardWidth} squres.\n` +
        `You requested ${mineCount} mines.\n` +
        "Please request less mines or a larger board width.\n";

      throw Error(errorMessage);
    }

    const chosenSpaces: Set<string> = new Set();

    for (let i = 1; i <= mineCount; i++) {
      let space = this.getRandomSpace(boardWidth);

      while (chosenSpaces.has(space)) {
        space = this.getRandomSpace(boardWidth);
      }

      chosenSpaces.add(space);
    }

    return Array.from(chosenSpaces);
  }

  private getRandomSpace(boardWidth: number): string {
    const randomRow = String.fromCharCode(getRandomInt(65, 64 + boardWidth));
    const randomColumn = getRandomInt(1, boardWidth);

    return randomRow + randomColumn;
  }

}
