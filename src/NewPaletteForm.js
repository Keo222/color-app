import React, { Component } from 'react';
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { Button } from '@material-ui/core/';

import DraggableColorList from './DraggableColorList';
import PaletteFormNav from './PaletteFormNav';
import ColorPickerForm from './ColorPickerForm';

import { arrayMove } from 'react-sortable-hoc';

import styles from './styles/NewPaletteFormStyles'


class NewPaletteForm extends Component {
  static defaultProps = {
    maxColors: 20
  }
  constructor(props){
    super(props);
    this.state = {
    open: true,
    colors: this.props.palettes[0].colors
  };
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  addNewColor = (newColor) => {
    this.setState({colors: [...this.state.colors, newColor]})
  };
  handleSubmit = (newPaletteName, emoji) => {
    let newId = newPaletteName.toLowerCase().replace(/ /g, "-")
    const newPalette = {paletteName: newPaletteName, id: newId, colors: this.state.colors, emoji: emoji}
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
  // addRandom = () => {
  //   const pLength = this.props.palettes.length;
  //   const rPalette = Math.floor(Math.random() * pLength);
  //   const cLength = this.props.palettes[rPalette].colors.length;
  //   const rColor = Math.floor(Math.random() * cLength);
  //   const randomColor = this.props.palettes[rPalette].colors[rColor];
  //   this.setState(({colors}) => ({
  //     colors: [...colors, randomColor]
  //   }));
  //   console.log(randomColor)
  // }

  updatedAddRandom = () => {
    const pLength = this.props.palettes.length;
    const rPalette = Math.floor(Math.random() * pLength);
    const cLength = this.props.palettes[rPalette].colors.length;
    const rColor = Math.floor(Math.random() * cLength);
    const randomColor = this.props.palettes[rPalette].colors[rColor];
    const colorIncluded = this.state.colors.includes(randomColor)
    if(colorIncluded){
      this.updatedAddRandom()
    } else {
      this.setState(({colors}) => ({
        colors: [...colors, randomColor]
      }));
    }
  }

  onSortEnd = ({oldIndex, newIndex}) => {
    this.setState(({colors}) => ({
      colors: arrayMove(colors, oldIndex, newIndex),
    }));
  };

  render() {
    const { classes, maxColors, palettes } = this.props;
    const { open, colors, currentColor } = this.state;
    const paletteFull = colors.length >= maxColors;
    console.log(colors)
    return (
      <div className={classes.root}>
        <PaletteFormNav 
          open={open}
          palettes={palettes}
          handleSubmit={this.handleSubmit}
          handleDrawerOpen={this.handleDrawerOpen}
        />
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
          <div className={classes.container}>
            <Typography variant="h4" gutterBottom>Design Your Palette</Typography>
            <div className={classes.buttons}>
              <Button 
                variant="contained" 
                color="primary"
                disabled = {paletteFull}
                onClick={this.updatedAddRandom}
                className={classes.button}
              >
                Random Color
              </Button>
              <Button 
                variant="contained" 
                color="secondary"
                onClick={this.clearPalette}
                className={classes.button}
              >
                Clear Palette
              </Button>
            </div>
            <ColorPickerForm 
              currentColor={currentColor}
              paletteFull={paletteFull}
              updateCurrentColor={this.updateCurrentColor}
              addNewColor={this.addNewColor}
              colors={colors}
            />
          </div>
        </Drawer>
        <main
          className={classNames(classes.content, {
            [classes.contentShift]: open
          })}
        >
          <div className={classes.drawerHeader} />
          <DraggableColorList handleDelete={this.handleDelete} colors={colors} axis="xy" onSortEnd={this.onSortEnd} distance={20}/>
        </main>
      </div>
    );
  }
}

export default withStyles(styles, {withTheme: true})(NewPaletteForm);