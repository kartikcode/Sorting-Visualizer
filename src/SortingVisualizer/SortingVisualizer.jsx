import React, { useEffect }from 'react';
import './index.css';
import Topbar from "../Topbar/Topbar";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import Slider from '@material-ui/core/Slider';
import Input from '@material-ui/core/Input';
import InputSlider from "../InputSlider/InputSlider";

const useStyles = makeStyles({
    root: {
        width: 250,
    },
    input: {
        width: 42,
    },
});

export default function SortingVisualizer(){
    const initialState = {
        array: []
    }
    const [state, setState] = React.useState(initialState);

    const classes = useStyles();
    const [value, setValue] = React.useState(30);

    const handleSliderChange = (event, newValue) => {
        setValue(newValue);
        resetArray();
    };

    const handleInputChange = (event) => {
        setValue(event.target.value === '' ? '' : Number(event.target.value));
        resetArray();
        console.log(event.target.value);
    };

    const handleBlur = () => {
        if (value < 0) {
            setValue(0);
        } else if (value > 100) {
            setValue(100);
        }
    };

    useEffect(() => {
        resetArray();
    },[]);
    
    const resetArray = () => {
        const array = [];
        for (let i = 0; i < value; i++) {
            array.push(randomIntfromInterval(20, 800));
        }
        setState({array});
    }

    const { array } = state;
        const width = 80 / value;
        return(
            <React.Fragment >
            <Topbar generateArray={() => resetArray()}></Topbar>
            <div className="holder">
                {
                    array.map((value, idx) => (
                        <div className="array-bar" key={idx} style={{ height: `${value}px`, width: `${width}%`, fontSize: `${width * 20}%` }}>
                            {value}
                        </div>
                    ))
                }
            </div>
            <div className="range-slider">
                    <div className={classes.root}>
                        <Grid container spacing={2} alignItems="center">
                            <Grid item xs>
                                <Slider
                                    value={typeof value === 'number' ? value : 0}
                                    onChange={handleSliderChange}
                                    aria-labelledby="input-slider"
                                    color="secondary"
                                    min={10}
                                    max={100}
                                />
                            </Grid>
                            <Grid item>
                                <Input
                                    className={classes.input}
                                    value={value}
                                    margin="dense"
                                    onChange={handleInputChange}
                                    onBlur={handleBlur}
                                    color="white"
                                    background="#4CAF50"
                                    inputProps={{
                                        step: 10,
                                        min: 10,
                                        max: 100,
                                        type: 'number',
                                        'aria-labelledby': 'input-slider',
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </div>
            </div>
            </React.Fragment >
        );
    };


function randomIntfromInterval(start, end) {
    return Math.floor(Math.random() * (start - end + 1) + end);
}
