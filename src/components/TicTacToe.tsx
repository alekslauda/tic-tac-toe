import { useEffect, useState } from "react";
import { Game, GameState } from "../constants/app-constants";
import { Board } from "./board/Board";
import GameInfo from "./game-info/GameInfo";


export default function TicTacToe() {

  const [marker, setMarker] = useState<Array<Game.MARKER_X | Game.MARKER_O>>([]);
  const [turn, setTurn] = useState<Game.PLAYER1 | Game.PLAYER2>(Game.PLAYER1)
  const [nextMove, setNextMove] = useState(turn);
  const [gameState, setGameState] = useState<GameState>(GameState.NOT_STARTED)
  const [gameBoard, setGameBoard] = useState(Array(9).fill(null));

  const gameInit = function() {
    const answer = prompt("Are you ready to play? (y/n)");

    if (!answer || !['yes', 'y'].includes(answer.toLocaleLowerCase())) {
      return;
    }
    
    const marker = prompt("Player 1: Do you want to be X or O?");
    
    if (!marker) {
      return;
    }
    const markerToUpper: any = marker.toLocaleUpperCase();
    
    if (![Game.MARKER_X, Game.MARKER_O].includes(markerToUpper)) {
      return;
    }
    
    setGameState(GameState.GAME_ON)

    if (markerToUpper === 'X') {
      setMarker([Game.MARKER_X, Game.MARKER_O]);
    } else {
      setMarker([Game.MARKER_O, Game.MARKER_X])
    }

    const turn = Math.round(Math.random()) > 0 ? Game.PLAYER1 : Game.PLAYER2;
    setTurn(turn);
    setNextMove(turn);
  }

  useEffect(() => {
    gameInit();
  }, []);

  const checkWin = function(board: any[], marker: Game.MARKER_X | Game.MARKER_O) {
    const possibleWinPaths = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 4, 8],
      [2, 4, 6],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
    ];

    return possibleWinPaths.some(winPaths => {
      return (board[winPaths[0]] === marker && board[winPaths[1]] === marker && board[winPaths[2]] === marker);
    });

  }

  const checkDraw = function(board: any[], marker: Game.MARKER_X | Game.MARKER_O) {
    return !checkWin(board, marker) && board.filter(v => v === null).length === 0
  }

  const checkIsPositionTaken = function(board: any[], position: number) {
    return board[position] !== null;
  }

  const resetGameHandler = function() {
    setMarker([]);
    setTurn(Game.PLAYER1);
    setNextMove(turn);
    setGameState(GameState.NOT_STARTED);
    setGameBoard(Array(9).fill(null));
    
    gameInit();
  }

  const placeMarker = function(board: any[], marker: Game.MARKER_X | Game.MARKER_O, position: number) {
    
    if (checkIsPositionTaken(board, position)) {
      alert('Position is taken');
      return false;
    }

    board[position] = marker;
    setGameBoard(board);

    if (checkWin(board, marker)) {
      setGameState(GameState.WIN)
      return false;
    }

    if (checkDraw(board, marker)) {
      setGameState(GameState.DRAW)
      return false;
    }

    return true
  }

  const clickedSquareHanlder = (index: number) => {
    let newBoard = [...gameBoard]

    if (nextMove === Game.PLAYER1) {
      if (placeMarker(newBoard, marker[0], index)) {
        setNextMove(Game.PLAYER2);
      }
    } else {
      if (placeMarker(newBoard, marker[1], index)) {
        setNextMove(Game.PLAYER1);
      }
    }
  };


  return (
    <div className="gameContainer">
      <h1>Tic Tac Toe</h1>
      <GameInfo
        marker={marker}
        gameState={gameState}
        turn={turn}
        resetGame={resetGameHandler}
        nextMove={nextMove}
      />
      <Board 
          clickedSquare={gameState === GameState.GAME_ON ? clickedSquareHanlder : undefined}
          gameBoard={gameBoard}
      />
    </div>
  )
}
