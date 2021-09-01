import React, { Component } from 'react';
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { Button } from '@material-ui/core/';

import { ChromePicker } from 'react-color';

import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

import DraggableColorList from './DraggableColorList';
import { arrayMove } from 'react-sortable-hoc';


const drawerWidth = 400;

const styles = theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
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
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
    ...theme.mixins.toolbar,
    justifyContent: "flex-end"
  },
  content: {
    flexGrow: 1,
    height: "calc(100vh - 64px)",
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: -drawerWidth
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  },
  buttons: {
    marginLeft: "auto"
  }
});

class NewPaletteForm extends Component {
  static defaultProps = {
    maxColors: 20
  }
  constructor(props){
    super(props);
    this.state = {
    open: true,
    currentColor: "teal",
    newColorName: "",
    colors: this.props.palettes[0].colors,
    newPaletteName: ""
  };
  };

  componentDidMount(){
    ValidatorForm.addValidationRule('isNameUnique', (value) => 
      this.state.colors.every(
        ({name}) => name.toLowerCase() !== value.toLowerCase()
      )
    );
    ValidatorForm.addValidationRule('isColorUnique', () => 
      this.state.colors.every(
        ({color}) => color !== this.state.currentColor
      )
    );
    ValidatorForm.addValidationRule('isPaletteNameUnique', () => 
      this.props.palettes.every(
        ({id}) => id !== this.state.newPaletteName.toLowerCase().replace(/ /g, "-")
      )
    );
  }

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  updateCurrentColor = (color) => {
    this.setState({ currentColor: color.hex });
  };

  addNewColor = () => {
    const newColor = {color: this.state.currentColor, name: this.state.newColorName}
    this.setState({colors: [...this.state.colors, newColor], newColorName: ""})
  };
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  };
  handleSubmit = () => {
    let newName = this.state.newPaletteName;
    let newId = newName.toLowerCase().replace(/ /g, "-")
    const newPalette = {paletteName: newName, id: newId, colors: this.state.colors, emoji: "hi"}
    this.props.savePalette(newPalette);
    this.props.history.push("/")
  };
  handleDelete = (deleteColor) => {
    const updatedColors = this.state.colors.filter(c => c.color !== deleteColor);
    this.setState({colors: updatedColors})
  };
  clearPalette = () => {
    this.setState({ colors: [] });
  };
  addRandom = () => {
    const pLength = this.props.palettes.length;
    const rPalette = Math.floor(Math.random() * pLength);
    const cLength = this.props.palettes[rPalette].colors.length;
    const rColor = Math.floor(Math.random() * cLength);
    const randomColor = this.props.palettes[rPalette].colors[rColor];
    this.setState(({colors}) => ({
      colors: [...colors, randomColor]
    }), console.log(this.state.colors));
  }
  onSortEnd = ({oldIndex, newIndex}) => {
    this.setState(({colors}) => ({
      colors: arrayMove(colors, oldIndex, newIndex),
    }));
  };

  render() {
    const { classes, maxColors } = this.props;
    const { open, colors } = this.state;
    const paletteFull = colors.length >= maxColors;

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
              onClick={this.handleDrawerOpen}
              className={classNames(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant='h6' color='inherit' noWrap>
              Persistent drawer
            </Typography>
            <ValidatorForm onSubmit={this.handleSubmit}>
              <TextValidator 
                label="Palette Name" 
                value={this.state.newPaletteName} 
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
            <Button 
              variant="contained" 
              color="secondary"
              href="/"
            >
              Go Back
            </Button>
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant='persistent'
          anchor='left'
          open={open}
          classes={{
            paper: classes.drawerPaper
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={this.handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <Typography variant="h4">Design Your Palette</Typography>
          <div>
            <Button 
              variant="contained" 
              color="primary"
              disabled = {paletteFull}
              onClick={this.addRandom}
            >
              Random Color
            </Button>
            <Button 
              variant="contained" 
              color="secondary"
              onClick={this.clearPalette}
            >
              Clear Palette
            </Button>
          </div>
          <ChromePicker 
            color={this.state.currentColor}
            onChangeComplete={ this.updateCurrentColor }
          />
          <ValidatorForm onSubmit={this.addNewColor}>
            <TextValidator 
              value={this.state.newColorName}
              name="newColorName" 
              onChange={this.handleChange}
              validators={["required", "isNameUnique", "isColorUnique"]}
              errorMessages={["This field is required", "Name needs to be unique",  "Color needs to be unique"]}
            />
            <Button 
            variant="contained" 
            color="primary"
            type="submit"
            disabled = {paletteFull}
            style={{backgroundColor: paletteFull ? "grey" : this.state.currentColor}}
            >
              Add Color
            </Button>
          </ValidatorForm>
        </Drawer>
        <main
          className={classNames(classes.content, {
            [classes.contentShift]: open
          })}
        >
          <div className={classes.drawerHeader} />
          <DraggableColorList handleDelete={this.handleDelete} colors={colors} axis="xy" onSortEnd={this.onSortEnd}/>
        </main>
      </div>
    );
  }
}

export default withStyles(styles, {withTheme: true})(NewPaletteForm);