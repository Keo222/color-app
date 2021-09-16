import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';
import DeleteIcon from "@material-ui/icons/Delete"

import styles from './styles/MiniPaletteStyles';

class MiniPalette extends Component {
    handleDelete = (e) => {
        e.stopPropagation();
        this.props.deletePalette(this.props.id)
    }
    render() {
    const {classes, paletteName, emoji, colors} = this.props;
    const miniColorBoxes = colors.map(c => (
        <div 
            className={classes.miniColor} 
            style={{backgroundColor: c.color}} 
            key={c.name}
        />
    ))
    return (
        <div className={classes.root} onClick={this.props.handleClick}>
                <DeleteIcon 
                    className={classes.deleteIcon} 
                    style={{transition: "all 0.3s ease-in-out"}}
                    onClick={this.handleDelete}
                />
            <div className={classes.colors}>
                {miniColorBoxes}
            </div>
            <h5 className={classes.title}>
                {paletteName} 
                <span className={classes.emoji}>{emoji}</span>
            </h5>
        </div>
    )
}
}

export default withStyles(styles)(MiniPalette);