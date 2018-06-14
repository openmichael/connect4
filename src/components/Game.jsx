import React from 'react';

import Board from './Board';

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      board: []
    };
  }

  componentDidMount() {
    this.initBoard();
  }

  initBoard() {
    let row = 6;
    let column = 7;
    let board = Array(row).fill().map(() => Array(column).fill(0));
    this.setState({
      loading: false,
      board: board
    });
  }

  render() {
    const isLoading = this.state.loading;
    return (
      <div>
        {isLoading ?
          (<div>Game Loading</div>) : (<Board board={this.state.board}/>)
        }
      </div>
    );
  }
};

export default Game;
