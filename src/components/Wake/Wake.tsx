import React, { Component, SyntheticEvent } from 'react';
import NoSleep from 'nosleep.js';

const noSleep = new NoSleep();

interface IWakeState {
    value: boolean;
}

export default class Wake extends Component<unknown, IWakeState> {

    state = {
        value: false
    };

    onChange = ({ currentTarget: { checked } }: SyntheticEvent<HTMLInputElement>): void => {
        checked ? noSleep.enable() : noSleep.disable();
        this.setState({ value: checked });
    };

    render() {
        return (
            <div>
                <label>
                    <input className="mr-2" type="checkbox" checked={this.state.value} onChange={this.onChange} />
                    Prevent the screen from turning off
                </label>
            </div>
        );
    }
}
