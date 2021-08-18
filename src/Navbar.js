import React, { Component } from 'react';

import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

import { Link } from 'react-router-dom';

import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

import './Navbar.css';

export default class Navbar extends Component {
  constructor(props){
    super(props);
      this.state = {format: "hex", open: false};
      this.handleChange = this.handleChange.bind(this);
      this.handleClose = this.handleClose.bind(this);
    }
    handleChange(e){
      this.setState({format: e.target.value, open: true});
      this.props.changeFormat(e.target.value);
    }
    handleClose(){
      this.setState({open: false})
    }
  render() {
    const {level, changeLevel} = this.props;
    const {format} = this.state;
    return (
      <header className="Navbar">
        <div className="logo">
          <Link to="/">reactcolorpicker</Link>
        </div>
        <div className="slider-container">
          <span>Level: {level}</span>
          <div className="slider">
            <Slider 
              defaultValue={level}
              min={100}
              max={900}
              step={100}
              onAfterChange={changeLevel}    
            />
          </div>
        </div>
        <div className="select-container">
          <Select value={format} onChange={this.handleChange}>
            <MenuItem value="hex">
              HEX - #ffffff
            </MenuItem>
            <MenuItem value="rgb">
              RGB - (255,255,255)
            </MenuItem>
            <MenuItem value="rgba">
              RGBA - (255,255,255, 1.0)
            </MenuItem>
          </Select>
        </div>
        <Snackbar 
          anchorOrigin={{vertical: "bottom", horizontal: "left"}} 
          open={this.state.open}
          autoHideDuration={3000}
          message={<span id="message-id">Format Changed to {format.toLocaleUpperCase()}</span>}
          ContentProps={{
            "aria-describedby": "message-id"
          }}
          onClose={this.handleClose}
          action={[
            <IconButton 
              onClick={this.handleClose} 
              key="close"
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          ]}
        />
      </header>
    )
  }
}
