import { BoardService } from "./services/board.service";

const boardService = new BoardService();

const board = boardService.generateBoard(23);

console.warn(board);
