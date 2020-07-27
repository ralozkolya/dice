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

    componentDidMount = (): void => {
        this.setNoSleep(this.state.value);
    };

    componentWillUnmount = (): void => {
        this.setNoSleep(false);
    };

    onChange = ({ currentTarget: { checked } }: SyntheticEvent<HTMLInputElement>): void => {
        this.setState({ value: checked }, () => this.setNoSleep(checked));
    };

    setNoSleep = (enable: boolean): void => {
        try {
            enable ? noSleep.enable() : noSleep.disable();
        } catch (e) {
            // Just trying to disable non-enabled lock, fine to ignore
        }
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
