import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import classNames from "classnames";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { Button } from '@material-ui/core/';
import { withStyles } from '@material-ui/core/styles';


import PaletteMetaForm from './PaletteMetaForm';

import styles from './styles/PaletteFormNavStyles'

class PaletteFormNav extends Component {
    render() {
        const { classes, open, handleSubmit, handleDrawerOpen, palettes } =  this.props
        return (
            <div className={classes.root}>
                <CssBaseline />
                <AppBar
                position='fixed'
                className={classNames(classes.appBar, {
                    [classes.appBarShift]: open
                })}
                color='default'
                >
                    <Toolbar disableGutters={!open}>
                        <IconButton
                        color='inherit'
                        aria-label='Open drawer'
                        onClick={handleDrawerOpen}
                        className={classNames(classes.menuButton, open && classes.hide)}
                        >
                        <MenuIcon />
                        </IconButton>
                        <Typography variant='h6' color='inherit' noWrap>
                        Create a Palette
                        </Typography>
                    </Toolbar>
                    <div className={classes.navBtns}>
                        <Link to="/">
                            <Button 
                                variant="contained" 
                                color="secondary"
                            >
                                Go Back
                            </Button>
                        </Link>
                        <PaletteMetaForm 
                            handleSubmit={handleSubmit}
                            palettes={palettes}
                        />
                    </div>
                </AppBar>
            </div>
        )
    }
}

export default withStyles(styles, {withTheme: true})(PaletteFormNav);