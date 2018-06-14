import React from 'react';

import Block from './Block';
import '../css/board.scss';

const Board = (props) => {
  // console.log(props);
  return (
    <div className="board">
      {props.board.map((array, x) => {
        return (
          <div className="row" key={x}>
            {array.map(function(item, y) {
              return (<Block key={y} row={x} column={y} value={item}/>);
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Board;
