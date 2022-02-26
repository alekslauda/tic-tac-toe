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

  const outcomeInlineStyle = function(color: string) {
    return {color: color, fontSize: 15, textDecoration: "underline", textUnderlinePosition: "under"}
  }

  const templateFactory = function (): any[] {
    let template = [];

    let resetGamePossibility = false;
    if (gameState === GameState.GAME_ON) {
      template.push(
        (<li key={`'game_on_1_${ new Date().getTime() }`}>First plays: <strong>{turn}</strong></li>), 
        (<li key={`'game_on_2_${ new Date().getTime() }`}>{Game.PLAYER1} plays with: <strong>{marker[0]}</strong></li>), 
        (<li key={`'game_on_3_${ new Date().getTime() }`}>{Game.PLAYER2} plays with: <strong>{marker[1]}</strong></li>)
      );
    } else if(gameState === GameState.DRAW) {
      resetGamePossibility = true;
      template.push(
        (<li key={`'game_draw_1_${ new Date().getTime() }`}>The End! Game is draw</li>),
        (<li style={outcomeInlineStyle('orange')} key={`'game_draw_2_${ new Date().getTime() }`}>Nobody wins! <strong>:X :X :X</strong></li>)
      )
    } else if(gameState === GameState.WIN) {
      resetGamePossibility = true;
      template.push(
        (<li key={`'game_win_1_${ new Date().getTime() }`}>We have a winner!</li>), 
        (<li style={outcomeInlineStyle('green')} key={`'game_win_2_${ new Date().getTime() }`}>{nextMove} wins the game! <strong>:) :) :)</strong></li>),
      )
    } else if(gameState === GameState.NOT_STARTED) {
      resetGamePossibility = true;
      template.push(
        (<li key={`'game_not_started_1_${ new Date().getTime() }`}>Give correct answers to the Questions!</li>),
        (<li key={`'game_not_started_2_${ new Date().getTime() }`}>Otherwise no Tic Tac Toe for you! <strong>:( :( :(</strong></li>)
      )
    }

    if (resetGamePossibility) {
      template.push((<li key={`'reset_game_${ new Date().getTime() }`}><button onClick={() => resetGame()}>Reset</button></li>));
    }

    return template
  }

  return (
    <div id="infobox">
      <h1 className="about">Game info:</h1>

      <ul id="infolist">
        {templateFactory().map(t => t)}
      </ul>
    </div>
  )
}
