import { Game } from '../../constants/app-constants';
import './Board.css';

interface BoardProps {
  clickedSquare?: (index: number) => void;
  gameBoard: any[]
}


export function Board(props: BoardProps) {


  const buildRow = function (row: number) {
    let rowItems = null;

    if (row === 1) {
      rowItems = [0, 1, 2];
    } else if (row === 2) {
      rowItems = [3, 4, 5];
    } else if (row === 3) {
      rowItems = [6, 7, 8];
    }

    if (!rowItems) {
      throw new Error('Invalid row')
    }

    return (
      <tr>
        {rowItems.map((v, i) => {
          let rowClasses = [];

          switch(row) {
            case 1:
            case 3:
              if (i === 1) {
                rowClasses.push('vert')
              }
              break;
            case 2:
              if (i === 0 || i === 2) {
                rowClasses.push('hori')
              }
              if (i === 1) {
                rowClasses.push('vert', 'hori');
              }
              break;
          }

          if (props.gameBoard[v] === Game.MARKER_O) {
            rowClasses.push('markero')
          } else if (props.gameBoard[v] === Game.MARKER_X) {
            rowClasses.push('markerx')
          }

          return (
            <td className={rowClasses.join(' ')} onClick={props.clickedSquare ? () => props.clickedSquare && props.clickedSquare(v) : undefined} key={v + Math.random()}>
              {props.gameBoard[v]}
            </td>
          )
        })}
      </tr>
    )
  }

  return (
    <div className="boardContainer">
      <table>
        <tbody>
          {buildRow(1)}
          {buildRow(2)}
          {buildRow(3)}
        </tbody>
      </table>
    </div>
  )
}
