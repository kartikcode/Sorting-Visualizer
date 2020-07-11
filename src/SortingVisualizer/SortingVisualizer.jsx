import React, { Component } from 'react';
import './index.css';

export default class SortingVisualizer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            array: [],
            n : null
        };
    }

    componentDidMount(){
    this.resetArray();
}
    
    resetArray() {
        const array = [];
        const n = 50;
        for (let i = 0; i < n; i++) {
            array.push(randomIntfromInterval(20, 800));
        }
        this.setState({array,n});
    }

    render() {
        const { array, n } = this.state;
        const width = 80 / n;
        return (
            <div className="holder">
                {
                    array.map((value, idx) => (
                        <div className="array-bar" key={idx} style={{ height: `${value}px`, width: `${width}%`, fontSize: `${width*20}%` }}>
                            {value}
                    </div>
                    ))
                }
            </div>
        );
}
}

function randomIntfromInterval(start, end) {
    return Math.floor(Math.random() * (start - end + 1) + end);
}
