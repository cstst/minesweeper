import { BoardService } from "./services/board.service";

const boardService = new BoardService();

const board = boardService.generateBoard(2, 1);

console.warn(board);
