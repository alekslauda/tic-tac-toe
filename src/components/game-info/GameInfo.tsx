import { Game, GameState } from "../../constants/app-constants";
import './GameInfo.css';

interface GameInfoProps {
  turn: Game.PLAYER1 | Game.PLAYER2,
  marker: Array<Game.MARKER_X | Game.MARKER_O>,
  gameState: GameState,
  nextMove: Game.PLAYER1 | Game.PLAYER2,
  resetGame: () => void,
}

export default function GameInfo({ turn, gameState, marker, resetGame, nextMove }: GameInfoProps) {

  let resetGamePossibility = false;

  const outcomeInlineStyle = function(color: string) {
    return {color: color, fontSize: 15, textDecoration: "underline", textUnderlinePosition: "under"}
  }

  const getGameState = function() {
    if (gameState === GameState.GAME_ON) {
      return (
          <>
            <li key={`'game_on_1_${ new Date().getTime() }`}>First plays: <strong>{turn}</strong></li> 
            <li key={`'game_on_2_${ new Date().getTime() }`}>{Game.PLAYER1} plays with: <strong>{marker[0]}</strong></li> 
            <li key={`'game_on_3_${ new Date().getTime() }`}>{Game.PLAYER2} plays with: <strong>{marker[1]}</strong></li>
          </>
        );
    } else if(gameState === GameState.DRAW) {
      resetGamePossibility = true;
      return (
        <>
          <li key={`'game_draw_1_${ new Date().getTime() }`}>The End! Game is draw</li>
          <li style={outcomeInlineStyle('black')} key={`'game_draw_2_${ new Date().getTime() }`}>Nobody wins! &#129296;&#129296;&#129296;</li>
        </>
      )
    } else if(gameState === GameState.WIN) {
      resetGamePossibility = true;
      return (
        <>
          <li key={`'game_win_1_${ new Date().getTime() }`}>We have a winner!</li>
          <li style={outcomeInlineStyle('green')} key={`'game_win_2_${ new Date().getTime() }`}>{nextMove} wins the game! &#128526;&#128526;&#128526;</li>
        </>
      )
    } else if(gameState === GameState.NOT_STARTED) {
      resetGamePossibility = true;
      return (
        <>
          <li key={`'game_not_started_1_${ new Date().getTime() }`}>&#129313;&#129313;&#129313;</li>
          <li key={`'game_not_started_2_${ new Date().getTime() }`}>&#128565;&#128565;&#128565;</li>
        </>
      )
    }
   
  }

  return (
    <div id="infobox">
      <h1 className="about">GAME INFO</h1>

      <ul id="infolist">
        {getGameState()}
        {resetGamePossibility ? (<li><button onClick={() => resetGame()}>Reset</button></li>) : null}
      </ul>

    </div>
  )
}
