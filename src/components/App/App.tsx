import React from 'react';
import { debounce } from 'lodash';
import Bluebird from 'bluebird';
import './App.css';
import github from '../../assets/GitHub-Mark-32px.png';

import Die from '../Die/Die';
import NumericInput from '../NumericInput/NumericInput';

import { getRolls, getFakeRolls } from '../../services/api';

interface IAppState {
  diceCount: number;
  sideCount: number;
  loading: boolean;
  rolling: boolean;
  rolls: number[];
  currentRolls: number[];
  warning?: string | null;
}

export default class App extends React.Component<unknown, IAppState> {

  state = {
    diceCount: 2,
    sideCount: 6,
    loading: true,
    rolling: false,
    rolls: [],
    currentRolls: [],
    warning: null
  };

  componentDidMount = (): void => {
    this.getRolls();
  };

  getRolls = async (): Promise<void> => {
    this.setState({ loading: true });
    const response = await getRolls(this.state.sideCount);
    this.setState({ loading: false, rolls: response.data, warning: response.warning });
  };

  getRollsDebounced = debounce(this.getRolls, 1000);

  getDice = (): JSX.Element[] => {
    const dice = [];
    const { diceCount, currentRolls } = this.state;
    for (let i = 0; i < diceCount; i++) {
      const value = Number.isInteger(currentRolls[i]) ? currentRolls[i] : i;
      dice.push(<Die value={value} key={i} />);
    }
    return dice;
  };

  getRollButton = (): JSX.Element => {
    return (
      <button
        className="btn btn-primary btn-block btn-lg roll-btn font-weight-bold mb-3"
        disabled={this.state.loading || this.state.rolling}
        onClick={this.roll}>
        {this.state.loading ? 'Loading...' : this.state.rolling ? 'Rolling...' : 'Roll!'}
      </button>
    );
  };

  setSides = (sideCount: number): void => {
    this.setState({ sideCount, loading: true });
    this.getRollsDebounced();
  };

  roll = async (): Promise<void> => {

    this.setState({ rolling: true });

    const fakeRolls = getFakeRolls(this.state.sideCount, this.state.diceCount);

    while (fakeRolls.length) {
      const currentRolls = fakeRolls.splice(0, this.state.diceCount);
      this.setState({ currentRolls });
      await Bluebird.delay(70);
    }

    const currentRolls = this.state.rolls.splice(0, this.state.diceCount);
    this.setState({ rolls: this.state.rolls, currentRolls, rolling: false });
  };

  render(): JSX.Element {

    const className = `${this.state.diceCount < 3 ? 'col-6' : 'col-4'} col-lg-6 col-xl-4 my-3`;

    return (
      <div className="container">
        <div className="row">
          <div className="col-lg-8">
            <div className="row justify-content-center">
              {
                this.getDice().map((die, i) => {
                  return <div key={i} className={className}>{die}</div>
                })
              }
            </div>
          </div>
          <div className="col-12 col-lg-4 pt-3">

            <NumericInput
              label="Sides"
              min={2}
              value={this.state.sideCount}
              onValueChange={this.setSides} />

            <NumericInput
              label="Dice"
              max={6}
              value={this.state.diceCount}
              onValueChange={diceCount => this.setState({ diceCount })} />

            {this.getRollButton()}
            {
              this.state.warning
            ? <div className="alert alert-warning">{this.state.warning}</div>
                : null
            }
            <div className="text-center">
              <a className="text-decoration-none text-secondary" href="https://github.com/ralozkolya/dice" target="_blank" rel="noopener noreferrer">
                <img className="sm-logo mr-2" src={github} alt="GitHub"/>Source
              </a>
              <a className="ml-3 text-decoration-none text-secondary" href="https://random.org" target="_blank" rel="noopener noreferrer">
                Powered by https://random.org
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
