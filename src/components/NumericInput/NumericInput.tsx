import React, { Component } from 'react';
import plus from 'bootstrap-icons/icons/plus.svg';
import dash from 'bootstrap-icons/icons/dash.svg';

interface INumericInputProps {
    value: number;
    onValueChange: (value: number) => void;
    label: string;
    min?: number;
    max?: number;
}

export default class NumericInput extends Component<INumericInputProps> {

    onValueChange = (value: number): void => {
        const { min = 1, max = 20 } = this.props;
        value = Math.max(min, Math.min(max, value)) || 1;
        this.props.onValueChange(value);
    };

    capitalize = (label: string): string => {
        return label[0].toUpperCase() + label.slice(1);
    };

    render() {
        const id = this.props.label.toLowerCase();
        return (
            <div className="form-group" id={ `${id}-container` }>
                <label className="font-weight-bold" htmlFor="sides">{this.capitalize(this.props.label)}</label>
                <div className="input-group">
                    <div className="input-group-prepend">
                        <button
                            onClick={() => this.onValueChange(this.props.value - 1)}
                            className="btn btn-outline-secondary"><img src={dash} alt="Minus" /></button>
                    </div>
                    <input
                        id={id}
                        type="text"
                        className="form-control text-center"
                        value={this.props.value}
                        onChange={e => {this.onValueChange(parseInt(e.target.value))}}
                    />
                    <div className="input-group-append">
                        <button
                            onClick={() => this.onValueChange(this.props.value + 1)}
                            className="btn btn-outline-secondary"><img src={plus} alt="Plus"/></button>
                    </div>
                </div>
            </div>
        );
    }
}