import { getRandomInt } from "../helpers/random.helper";

export interface Board {
  [key: string]: string[];
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

  private addNeighboors(board: Board, neighbors: string[]): Board {
    return neighbors.reduce((acc, val) => {
      const [ row, column ] = val;
      const columnInd = parseInt(column, 10) - 1;
      const space = acc[row][columnInd];
      const rowCopy = [ ...acc[row] ];

      if (space === " ") {
        rowCopy[columnInd] = "1";
      } else if (!isNaN(parseInt(space, 10))) {
        const newCount = parseInt(space, 10) + 1;
        rowCopy[columnInd] = newCount.toString();
      }

      return { ...acc, [row]: rowCopy };

    }, { ...board });
  }

  private mineBoard(board: Board, minedSpaces: string[]): Board {
    return minedSpaces.reduce((acc, val) => {
      const [ row, column ] = val;
      const columnInd = parseInt(column, 10) - 1;

      const neighbors = this.getNeighbors(acc, row, column);

      const accWithNeighbors = this.addNeighboors(acc, neighbors);

      const rowCopy = [ ...accWithNeighbors[row] ];
      rowCopy[columnInd] = "*";

      return { ...accWithNeighbors, [row]: rowCopy };
    }, { ...board });
  }

  private getNeighbors(board: Board, row: string, column: string): string[] {
    const rowBefore =  String.fromCharCode(row.charCodeAt(0) - 1);
    const rowAfter =  String.fromCharCode(row.charCodeAt(0) + 1);
    const columnBefore = parseInt(column, 10) - 1;
    const columnAfter = parseInt(column, 10) +  1;

    const potentialNeighbors = [
      rowBefore + columnBefore,
      rowBefore + column,
      rowBefore + columnAfter,
      row + columnBefore,
      row + columnAfter,
      rowAfter + columnBefore,
      rowAfter + column,
      rowAfter + columnAfter,
    ];

    const neighbors = potentialNeighbors.filter((neighbor) => {
      const [ neighborRow, neighborColumn ] = neighbor;
      const numColumn = parseInt(neighborColumn, 10);

      if ( numColumn < 1 || numColumn > board[row].length || !board[neighborRow]) {
        return false;
      }

      return true;
    });

    return neighbors;

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
      const blankRow = Array.from({ length : boardWidth}).map(() => " ");
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
