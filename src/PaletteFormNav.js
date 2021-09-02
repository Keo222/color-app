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

import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

export default class PaletteFormNav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newPaletteName: ""
        }
    }
    componentDidMount(){
        ValidatorForm.addValidationRule('isPaletteNameUnique', () => 
            this.props.palettes.every(
                ({id}) => id !== this.state.newPaletteName.toLowerCase().replace(/ /g, "-")
            )
        );
    };
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    };
    render() {
        const { classes, open, handleSubmit, handleDrawerOpen } =  this.props
        const { newPaletteName } = this.state
        return (
            <div>
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
              Persistent drawer
            </Typography>
            <ValidatorForm onSubmit={() => handleSubmit(newPaletteName)}>
              <TextValidator 
                label="Palette Name" 
                value={newPaletteName} 
                name="newPaletteName"
                onChange={this.handleChange}
                validators={["required", 'isPaletteNameUnique']}
                errorMessages={["This field is required", "Name must be unique"]}
              />
              <Button 
              variant="contained" 
              color="primary"
              type="submit"
              >
                Save Palette
              </Button>
            </ValidatorForm>
            <Link to="/">
              <Button 
                variant="contained" 
                color="secondary"
              >
                Go Back
              </Button>
            </Link>
          </Toolbar>
        </AppBar>
            </div>
        )
    }
}

