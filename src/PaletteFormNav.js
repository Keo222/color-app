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

const drawerWidth = 400;

const styles = theme => ({
    root: {
        display: 'flex'
    },
    appBar: {
        transition: theme.transitions.create(["margin", "width"], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen
        }),
        flexDirection: "row",
        justifyContent: "space-between",
        height: "64px"
      },
      appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(["margin", "width"], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen
        })
      },
      menuButton: {
        marginLeft: 12,
        marginRight: 20
      },
      hide: {
        display: "none"
      },
      navBtns: {
        display: 'flex',
        flexDirection: "row",
        alignItems: "center",
        marginRight: "1rem",
        '& a': {
            textDecoration: "none"
        },
        '& button': {
            margin: "5px"
        }
      }
})

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
                        <PaletteMetaForm 
                            handleSubmit={handleSubmit}
                            palettes={palettes}
                        />
                        <Link to="/">
                            <Button 
                                variant="contained" 
                                color="secondary"
                            >
                                Go Back
                            </Button>
                        </Link>
                    </div>
                </AppBar>
            </div>
        )
    }
}

export default withStyles(styles, {withTheme: true})(PaletteFormNav);