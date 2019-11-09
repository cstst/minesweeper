import { BoardService } from "./services/board.service";

const boardService = new BoardService();

boardService.createBoard();

const board = boardService.getBoard();

console.warn(board);
