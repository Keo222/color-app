import React, { Component } from 'react';
import {CopyToClipboard} from "react-copy-to-clipboard";
import { Link } from 'react-router-dom';
import chroma from "chroma-js";

import { withStyles } from '@material-ui/styles';

import "./ColorBox.css";

const styles = {
    colorBox: {
        width: "20%",
        height: props => props.showingFullPalette ? "25%" : "50%",
        margin: "0 auto",
        display: "inline-block",
        position: "relative",
        cursor: "pointer",
        marginBottom: "-4px",
        "&:hover button": {
            opacity: "1",
            transition: "0.5s"
        }
    },
    copyText: {
        color: props => chroma(props.background).luminance() >= 0.6 ? "rgba(0, 0, 0, 0.7)" : "white"
    },
    colorName: {
        color: props => chroma(props.background).luminance() <= 0.11 ? "white" : "rgba(0, 0, 0, 0.7)"
    },
    seeMore: {
        background: "rgba(255, 255, 255, 0.3)",
        position: "absolute",
        margin: "0.4rem",
        border: "none",
        right: "0px",
        bottom: "0px",
        color: props => chroma(props.background).luminance() >= 0.6 ? "black" : "white",
        fontSize: "12px",
        fontWeight: "500",
        width: "50px",
        height: "25px",
        textAlign: "center",
        lineHeight: "25px",
        textTransform: "uppercase"
    },
    copyButton: {
        color: props => chroma(props.background).luminance() >= 0.6 ? "black" : "white",
        width: "100px",
        height: "30px",
        position: "absolute",
        display: "inline-block",
        top: "50%",
        left: "50%",
        marginLeft: "-50px",
        marginTop: "-15px",
        textAlign: "center",
        outline: "none",
        background: "rgba(255, 255, 255, 0.3)",
        fontSize: "1rem",
        lineHeight: "30px",
        textTransform: "uppercase",
        border: "none",
        opacity: "0"
    }
}

class ColorBox extends Component {
    constructor(props) {
        super(props);
        this.state = { copied: false };
        this.changeCopyState = this.changeCopyState.bind(this);
    }
    changeCopyState() {
        this.setState({copied: true}, () => {
            setTimeout(() => this.setState({copied: false}), 1500);
        });
    }
    render() {
        const {name, background, paletteId, colorId, showingFullPalette, classes} =  this.props;
        const {copied} = this.state
        console.log(chroma(background).luminance());
        return (
            <CopyToClipboard text={background} onCopy={this.changeCopyState}>
                <div style={{background}} className={classes.colorBox}>
                    <div 
                        style={{background}} 
                        className={`copy-overlay ${copied && 'show'}`} 
                    />
                    <div className={`copy-msg ${copied && 'show'}`}>
                        <h1>Copied!</h1>
                        <p className={classes.copyText}>{background}</p>
                    </div>
                    <div className="copy-container">
                        <div className="box-content">
                            <span className={classes.colorName}>{name}</span>
                        </div>
                        <button className={classes.copyButton}>Copy</button>
                    </div>
                    {showingFullPalette &&
                        <Link to={`/palette/${paletteId}/${colorId}`} onClick={(e) => e.stopPropagation()}>
                            <span className={classes.seeMore}>More</span>
                        </Link>
                    }
                </div>
            </CopyToClipboard>
        )
    }
}

export default withStyles(styles)(ColorBox);