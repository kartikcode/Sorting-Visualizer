import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import Box from '@material-ui/core/Box';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import InputSlider from "../InputSlider/InputSlider";

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

export default function Topbar(props) {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Button variant="contained" color="secondary" onClick={props.generateArray}>
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
                            <ListItemText primary="Merge Sort" />
                        </StyledMenuItem>
                        <StyledMenuItem>
                            <ListItemText primary="Bubble Sort" />
                        </StyledMenuItem>
                        <StyledMenuItem>
                            <ListItemText primary="Quick Sort" />
                        </StyledMenuItem>
                        <StyledMenuItem>
                            <ListItemText primary="Selection Sort" />
                        </StyledMenuItem>
                    </StyledMenu>
                    <Typography variant="h6" className={classes.title}>
                    </Typography>
                    <Button variant="contained" color="secondary">
                        Sort!
                    </Button>

                </Toolbar>
            </AppBar>
        </div>
    );
}