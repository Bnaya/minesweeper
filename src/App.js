import React, { Component } from 'react';
import './App.css';
import BoardModel from './Model/Board';
import BoardUi from './Components/Board';

class App extends Component {
  // Cheating react and the game by using context, double cheat :D
  static childContextTypes = {
    cheat: React.PropTypes.bool
  }

  state = {
    mines: 10,
    width: 10,
    height: 10,
    cheat: false
  };

  componentWillMount() {
    this.boardModel = new BoardModel(this.state.width, this.state.height, this.state.mines);
  }

  onChangeMines(e) {
    this.setState({
      mines: e.target.valueAsNumber
    });
  }

  onChangeWidth(e) {
    this.setState({
      width: e.target.valueAsNumber
    });
  }

  onChangeHeight(e) {
    this.setState({
      height: e.target.valueAsNumber
    });
  }

  onChangeCheat(e) {
    this.setState({
      cheat: e.target.checked
    });
  }

  onNewGame(e) {
    e.preventDefault();
    this.boardModel = new BoardModel(this.state.width, this.state.height, this.state.mines);
    this.forceUpdate();
  }

  onFlagRequest(location) {
    if (this.boardModel.toggleFlagAtLocation(location.x, location.y)) {
      setTimeout(function () {
       alert('You Won!!');
      }, 10);
    }

    this.forceUpdate();
  }

  onRevealRequest(location) {
    if (!this.boardModel.revealLocation(location.x, location.y)) {
      setTimeout(function () {
        alert('You lose!');
      }, 10);
    }

    this.forceUpdate();
  }

  render() {
    return (
      <div className="App">
        <span>Shift click to toggle flag at location</span>
        <form>
          Mines number: <input type="number" value={this.state.mines} onChange={this.onChangeMines.bind(this)} /> |
          width: <input type="number" value={this.state.width} onChange={this.onChangeWidth.bind(this)} /> |
          height: <input type="number" value={this.state.height} onChange={this.onChangeHeight.bind(this)} />
          <input type="submit" value="new game" onClick={this.onNewGame.bind(this)} />
        </form>
        Cheat: <input type="checkbox" checked={this.state.cheat} onChange={this.onChangeCheat.bind(this)} />
        <BoardUi 
          model={this.boardModel} 
          onRevealRequest={this.onRevealRequest.bind(this)} 
          onFlagRequest={this.onFlagRequest.bind(this)} 
        />
      </div>
    );
  }

  getChildContext() {
    return {
      cheat: this.state.cheat
    };
  }
}

export default App;
