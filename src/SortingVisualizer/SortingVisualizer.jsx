import React, { useEffect }from 'react';
import './index.css';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Slider from '@material-ui/core/Slider';
import { Typography } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import Box from '@material-ui/core/Box';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
//import { BubbleSort } from "../SortingAlgorithms/BubbleSort.jsx";
import { getMergeSortAnimations } from "../SortingAlgorithms/mergeSort";
import { getBubbleSortAnimations } from "../SortingAlgorithms/bubbleSort";
import { doBubbleSort } from "../SortingAlgorithms/bubbleSort";
import { getQuickSortAnimations } from "../SortingAlgorithms/quickSort";
import { doQuickSort } from "../SortingAlgorithms/quickSort";
import { quickSortPartition } from "../SortingAlgorithms/quickSort";

const useStyles1 = makeStyles({
    root1: {
        width: 250,
    },
    input: {
        width: 42,
    },
});

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

const StyledMenu = withStyles({
    paper: {
        border: '1px solid #d3d4d5',
    },
})((props) => (
    <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}
        {...props}
    />
));

const StyledMenuItem = withStyles((theme) => ({
    root: {
        '&:focus': {
            backgroundColor: theme.palette.primary.main,
            '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
                color: theme.palette.common.white,
            },
        },
    },
}))(MenuItem);



export default function SortingVisualizer(){

    // Change this value for the speed of the animations.
const [speed,setSpeed] = React.useState(100);

// Change this value for the number of bars (value) in the array.
const NUMBER_OF_ARRAY_BARS = 350;

// This is the main color of the array bars.
const PRIMARY_COLOR = "red";

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = "green";




    const initialState = {
        array: []
    }

    const [state, setState] = React.useState(initialState);
    const classes1 = useStyles1();
    const [value, setValue] = React.useState(30);
    const [width, setWidth] = React.useState(80 / 30);
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [anchorEl1, setAnchorEl1] = React.useState(null);
    const [algo, setAlgo] = React.useState('');

    const handleSliderChange = (event, newValue) => {
        setValue(newValue);
        setWidth(80 / value);
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
    
    const  resetBars = () => {
        console.log("Reset Bars");
        const arrayBars = document.getElementsByClassName("array-bar");
        var arrayLength = arrayBars.length;
        for (let j = 0; j < arrayLength; j++) {
          var jBarStyle = arrayBars[j].style;
          jBarStyle.backgroundColor = "blueviolet";
        }
      }

    const resetArray = () => {
        const array = [];
        for (let i = 0; i < value; i++) {
            array.push(randomIntfromInterval(20, 600));
        }
        resetBars();
        setState({array});
    }

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        console.log(anchorEl1);
    };

    const handleClose = () => {
        console.log(algo);
        setAnchorEl(null);
    };

    const handleClick1 = (event) => {
        setAnchorEl1(event.currentTarget);
        console.log(anchorEl1);
    };

    const handleClose1 = () => {
        console.log(algo);
        setAnchorEl1(null);
    };

    const handleAlgo = (event) => {
        //console.log(event.currentTarget.id);
        setAlgo(event.currentTarget.id);
        //console.log(algo);
        handleClose1();
    }

    const handleSpeed = (event) => {
        //console.log(event.currentTarget.id);
        setSpeed(event.currentTarget.id);
        console.log(speed);
        handleClose();
    }

    const { array } = state;

    const  makeAllBarsGreen = () => {
        console.log("Sorted");
        const arrayBars = document.getElementsByClassName("array-bar");
        var arrayLength = arrayBars.length;
        for (let j = 0; j < arrayLength; j++) {
          var jBarStyle = arrayBars[j].style;
          jBarStyle.backgroundColor = "limegreen";
        }
      }

    const bubbleSort = () => {
        const animations = getBubbleSortAnimations(array);
        console.log(animations);
        const arrayBars = document.getElementsByClassName("array-bar");
    
        for (let i = 0; i < animations.length; i++) {
          setTimeout(() => {
            var [oldPosition, newPosition] = animations[i];
    
            var oldBarStyle = arrayBars[oldPosition].style;
            var newBarStyle = arrayBars[newPosition].style;
    
            var temp = array[oldPosition];
            array[oldPosition] = array[newPosition];
            array[newPosition] = temp;
    
            oldBarStyle.height = `${array[oldPosition]}px`;
            newBarStyle.height = `${array[newPosition]}px`;
    
            oldBarStyle.backgroundColor = "red";
            newBarStyle.backgroundColor = "green";
    
            var currentPosition = oldPosition;
            for (let j = 0; j < currentPosition; j++) {
              var jBarStyle = arrayBars[j].style;
              jBarStyle.backgroundColor = "red";
            }
            if (i === animations.length - 1) {
              makeAllBarsGreen();
            }
          }, i * speed);
        }
      }

    const quickSort = () => {
        // We leave it as an exercise to the viewer of this code to implement this method.
        const animations = getQuickSortAnimations(array);
        console.log(animations);
        const arrayBars = document.getElementsByClassName("array-bar");
    
        for (let i = 0; i < animations.length; i++) {
          setTimeout(() => {
            var [oldPosition, newPosition] = animations[i];
    
            var oldBarStyle = arrayBars[oldPosition].style;
            var newBarStyle = arrayBars[newPosition].style;
            var index;
            const dummyAnimations = [];
            if (array.length > 1) {
              index = quickSortPartition(
                array,
                0,
                array.length - 1,
                dummyAnimations
              ); //index returned from partition
              if (0 < index - 1) {
                //more elements on the left side of the pivot
                doQuickSort(dummyAnimations, array, 0, index - 1);
              }
              if (index < array.length) {
                //more elements on the right side of the pivot
                doQuickSort(dummyAnimations, array, 0, array.length - 1);
              }
            }
    
            oldBarStyle.height = `${array[oldPosition]}px`;
            newBarStyle.height = `${array[newPosition]}px`;
    
            oldBarStyle.backgroundColor = "green";
            newBarStyle.backgroundColor = "red";
    
            var currentPosition = oldPosition;
            for (let j = 0; j < currentPosition; j++) {
              var jBarStyle = arrayBars[j].style;
              jBarStyle.backgroundColor = "green";
            }
            if (i === animations.length - 1) {
              makeAllBarsGreen();
            }
          }, i*speed);
        }
      }
    
    
    const mergeSort = () => {
        const animations = getMergeSortAnimations(array);
    
        for (let i = 0; i < animations.length; i++) {
          const arrayBars = document.getElementsByClassName("array-bar");
          const isColorChange = i % 3 !== 2;
          if (isColorChange) {
            const [barOneIdx, barTwoIdx] = animations[i];
            const barOneStyle = arrayBars[barOneIdx].style;
            const barTwoStyle = arrayBars[barTwoIdx].style;
            const color = i % 3 === 0 ? PRIMARY_COLOR : SECONDARY_COLOR;
            setTimeout(() => {
              barOneStyle.backgroundColor = color;
              barTwoStyle.backgroundColor = color;
              if (i === animations.length - 1) {
                makeAllBarsGreen();
              }
            }, i * speed);
          } else {
            setTimeout(() => {
              const [barOneIdx, newHeight] = animations[i];
              const barOneStyle = arrayBars[barOneIdx].style;
              barOneStyle.height = `${newHeight}px`;
              if (i === animations.length - 1) {
                //makeAllBarsGreen();
              }
            }, i * speed);
          }
        }
      }

    const startSort = () => {
        if (algo === '') {
            alert('Hey there!\n This is a sorting visulaizer, so I expect you to pick a sorting algorithm of your choice !!\nHappy Coding!')
        }
        else if (algo === "merge") {
            //let sorted_array = BubbleSort(array);
            //setState({ sorted_array });
            mergeSort();
        }
        else if (algo === "bubble") {
            //let sorted_array = BubbleSort(array);
            //setState({ sorted_array });
            bubbleSort();
        }
        else if (algo === "quick") {
            //let sorted_array = BubbleSort(array);
            //setState({ sorted_array });
            quickSort();
        }
    }

        return(
            <React.Fragment >
                <div className={classes.root}>
                    <AppBar position="static">
                        <Toolbar>
                            <Button variant="contained" color="secondary" onClick={resetArray}>
                                Generate New Array
                    </Button>
                            <Box m={1}>
                                <Button
                                    aria-controls="customized-menu"
                                    aria-haspopup="true"
                                    variant="contained"
                                    color="secondary"
                                    onClick={handleClick1}
                                >
                                    Sorting Algorithm<ArrowDropDownIcon color="basic"></ArrowDropDownIcon>
                                </Button></Box>
                            <StyledMenu
                                id="customized-menu"
                                anchorEl={anchorEl1}
                                keepMounted
                                open={Boolean(anchorEl1)}
                                onClose={handleClose1}
                            >
                                <StyledMenuItem>
                                    <ListItemText primary="Merge Sort" id="merge" onClick={handleAlgo} />
                                </StyledMenuItem>
                                <StyledMenuItem>
                                    <ListItemText primary="Bubble Sort" id="bubble" onClick={handleAlgo} />
                                </StyledMenuItem>
                                <StyledMenuItem>
                                    <ListItemText primary="Quick Sort" id="quick" onClick={handleAlgo} />
                                </StyledMenuItem>
                                <StyledMenuItem>
                                    <ListItemText primary="Selection Sort" id="selection" onClick={handleAlgo} />
                                </StyledMenuItem>
                            </StyledMenu>
                            <Box m={1}>
                                <Button
                                    aria-controls="customized-menu"
                                    aria-haspopup="true"
                                    variant="contained"
                                    color="secondary"
                                    onClick={handleClick}
                                >
                                    Animation Speed<ArrowDropDownIcon color="basic"></ArrowDropDownIcon>
                                </Button></Box>
                            <StyledMenu
                                id="customized-menu"
                                anchorEl={anchorEl}
                                keepMounted
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                <StyledMenuItem>
                                    <ListItemText primary="1" id="1" onClick={handleSpeed} />
                                </StyledMenuItem>
                                <StyledMenuItem>
                                    <ListItemText primary="5" id="5" onClick={handleSpeed} />
                                </StyledMenuItem>
                                <StyledMenuItem>
                                    <ListItemText primary="10" id="10" onClick={handleSpeed} />
                                </StyledMenuItem>
                                <StyledMenuItem>
                                    <ListItemText primary="50" id="50" onClick={handleSpeed} />
                                </StyledMenuItem>
                                <StyledMenuItem>
                                    <ListItemText primary="100" id="100" onClick={handleSpeed} />
                                </StyledMenuItem>
                            </StyledMenu>
                            <Typography variant="h6" className={classes.title}>
                            </Typography>
                            <Button variant="contained" color="secondary" onClick={startSort}>
                                {algo} Sort!
                    </Button>

                        </Toolbar>
                    </AppBar>
                </div>
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
                    <div className={classes1.root1}>
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
                                <Typography>Adjust Array Size</Typography>
                            </Grid>
                        </Grid>
                    </div>
                </div>
                <div class="footer">
                    <p>Follow me: <a href="https://github.com/kartikcode">kartikcode@Github</a></p>
                </div>
            </React.Fragment >
        );
    };


function randomIntfromInterval(start, end) {
    return Math.floor(Math.random() * (start - end + 1) + end);
}
