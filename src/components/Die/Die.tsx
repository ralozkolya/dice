import React, { Component } from 'react';
import './Die.css';
import dice from '../../assets/dice.svg';

interface IDieProps {
  value: number;
}

function valueToCss(value: number): string {
  const x = value % 4 / 3 * 100;
  const y = Math.floor(value / 4) / 4 * 100;
  return `${x}% ${y}%`;
}

export default class App extends Component<IDieProps> {

  render() {
    return (
      <div className="die mx-auto" style={ {
        backgroundPosition: valueToCss(this.props.value),
        backgroundImage: `url(${dice})`
      } } />
    );
  }
}
