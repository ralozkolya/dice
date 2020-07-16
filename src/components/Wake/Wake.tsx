import React, { Component, SyntheticEvent } from 'react';
import NoSleep from 'nosleep.js';

const noSleep = new NoSleep();

export default class Wake extends Component {

    componentWillUnmount = () => {
        noSleep.disable();
    };

    onChange = ({ currentTarget: { checked } }: SyntheticEvent<HTMLInputElement>) => {
        if (checked) {
            noSleep.enable();
        } else {
            noSleep.disable();
        }
    };

    render() {
        return (
            <div>
                <label>
                    <input className="mr-2" type="checkbox" onChange={this.onChange} />
                    Prevent the screen from turning off
                </label>
            </div>
        );
    }
}
