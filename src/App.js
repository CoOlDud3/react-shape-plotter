import React, {Component} from 'react';
import './App.css';
import SVGContainer from "./components/SVGContainer";
import {getRandomColor, parseInput} from "./helpers";

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            input: '',
            shapes: [],
            errors: []
        };
    }

    render() {
        const {input, shapes, errors} = this.state;

        return (
            <div>
                <div className='container pt-5 pb-5'>
                    <div className='row'>
                        <div className='col-6 d-flex flex-column'>
                            <h4>Input</h4>
                            <textarea
                                className='w-100 flex-grow-1'
                                value={input}
                                onChange={(e) => {
                                    this.setState({
                                        input: e.target.value,
                                    }, () => {
                                        let {shapes, errors} = parseInput(this.state.input);
                                        console.log({
                                            shapes,
                                            errors
                                        });
                                        this.setState({
                                            shapes,
                                            errors
                                        });
                                    });
                                }}/>
                        </div>
                        <div className='col-6 d-flex flex-column'>
                            <h4>Result</h4>
                            <SVGContainer width={250} height={250}>
                                {
                                    shapes.map(shape => {
                                        switch (shape.name) {
                                            case 'rectangle':
                                                return (
                                                    <rect fill={getRandomColor()} x={shape.x}
                                                          y={shape.y}
                                                          width={shape.w}
                                                          height={shape.h}/>
                                                );
                                            case 'circle':
                                                return (
                                                    <circle fill={getRandomColor()} cx={shape.x} cy={shape.y}
                                                            r={shape.r}/>
                                                );
                                            case 'polygon':
                                                return (
                                                    <polygon fill={getRandomColor()} points={shape.pairs.map(pair => {
                                                        return pair.x + ',' + pair.y;
                                                    }).join(' ')}/>
                                                );
                                            case 'line':
                                                return (
                                                    <line stroke={getRandomColor()} strokeWidth={2}
                                                          x1={shape.pairs[0].x} y1={shape.pairs[0].y}
                                                          x2={shape.pairs[1].x} y2={shape.pairs[1].y}/>
                                                );
                                            default:
                                                return (<React.Fragment/>);
                                        }
                                    })
                                }
                            </SVGContainer>
                        </div>
                    </div>
                    <div className='row mt-3 d-flex flex-row'>
                        <div className='col-6 d-flex flex-column'>
                            <h4>Errors</h4>
                            <textarea className='flex-grow-1' style={{height: '200px'}} value={errors.join('\n')}/>
                        </div>
                    </div>
                    <div className='row mt-3 d-flex flex-row'>
                        <div className='col-12'>
                            <button className='btn btn-warning ml-2' onClick={() => {
                                this.setState({
                                    input: '',
                                    shapes: [],
                                    errors: []
                                });
                            }}>Clear
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;