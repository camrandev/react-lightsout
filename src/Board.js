import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows = 5, ncols = 5, chanceLightStartsOn = 0.5 }) {
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = [];
    // TODO: create array-of-arrays of true/false values
    for (let i = 0; i < nrows; i++) {
      let row = [];
      for (let j = 0; j < ncols; j++) {
        row.push(Math.random() < chanceLightStartsOn);
      }
      initialBoard.push(row);
    }
    return initialBoard;
  }

  function hasWon(board) {
    // TODO: check the board in state to determine whether the player has won.
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[0].length; j++) {
        if (!board[i][j]) return false;
      }
    }
    return true;
  }

  function flipCellsAround(coord) {
    setBoard((oldBoard) => {
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      // TODO: Make a (deep) copy of the oldBoard
      let newBoard = oldBoard.map(row => [...row])


      // TODO: in the copy, flip this cell and the cells around it
      newBoard[y][x] = flipCell(y, x, newBoard)
      newBoard[y][x+1] = flipCell(y, x+1, newBoard)
      newBoard[y][x-1] = flipCell(y, x-1, newBoard)
      newBoard[y+1][x] = flipCell(y+1, x, newBoard)
      newBoard[y-1][x] = flipCell(y-1, x, newBoard)


      // TODO: return the copy
      return newBoard
    });
  }

  // if the game is won, just show a winning msg & render nothing else
  return (
    <div className="Board">
      { hasWon(board) && <h1>You win!</h1>}
      { !hasWon(board) && board.map((row, y) => row.map(
          (c, x) => (
            <Cell
              key={`${y}${x}`}
              flipCellsAroundMe={() => {flipCellsAround(`${y}-${x}`)}}
              isLit={c}/>
        ))
      )}
    </div>

  )
  // TODO

  // make table board

  // TODO
}

export default Board;
