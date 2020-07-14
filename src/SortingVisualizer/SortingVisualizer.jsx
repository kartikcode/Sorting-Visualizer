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
    const initialState = {
        array: []
    }
    const [state, setState] = React.useState(initialState);
    const classes1 = useStyles1();
    const [value, setValue] = React.useState(30);
    const [width, setWidth] = React.useState(80 / 30);
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
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
    
    const resetArray = () => {
        const array = [];
        for (let i = 0; i < value; i++) {
            array.push(randomIntfromInterval(20, 800));
        }
        setState({array});
    }

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        console.log(anchorEl);
    };

    const handleClose = () => {
        console.log(algo);
        setAnchorEl(null);
    };

    const handleAlgo = (event) => {
        //console.log(event.currentTarget.id);
        setAlgo(event.currentTarget.id);
        //console.log(algo);
        handleClose();
    }

    const startSort = () => {
        if (algo === '') {
            alert('Hey there!\n This is a sorting visulaizer, so I expect you to pick a sorting algorithm of your choice !!\nHappy Coding!')
        }
    }

    const { array } = state;
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
                                    onClick={handleClick}
                                >
                                    Sorting Algorithm<ArrowDropDownIcon color="basic"></ArrowDropDownIcon>
                                </Button></Box>
                            <StyledMenu
                                id="customized-menu"
                                anchorEl={anchorEl}
                                keepMounted
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
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
