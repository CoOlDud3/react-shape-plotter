import React, {Component} from 'react';

export default class SVGContainer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {width, height} = this.props;
        return (
            <svg width={width} height={height} style={{backgroundColor: '#fcffde', border: '1px solid black'}}>
                {this.props.children}
            </svg>
        );
    }
}