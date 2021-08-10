import React, { Component } from 'react';
import Palette from './Palette';
import seedColors from './seedColors';

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <Palette {...seedColors[4]}/>
      </div>
    )
  }
}
