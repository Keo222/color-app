import React from 'react';
import { withStyles } from '@material-ui/styles';
import { Link } from 'react-router-dom';

import styles from './styles/MiniPaletteStyles';

function MiniPalette(props) {
    const {classes, paletteName, emoji, colors} = props;
    const miniColorBoxes = colors.map(c => (
        <div 
            className={classes.miniColor} 
            style={{backgroundColor: c.color}} 
            key={c.name}
        />
    ))
    return (
        <div className={classes.root} onClick={props.handleClick}>
            <div className={classes.colors}>
                {miniColorBoxes}
            </div>
            <h5 className={classes.title}>
                <Link to="/">{paletteName}</Link> 
                <span className={classes.emoji}>{emoji}</span>
            </h5>
        </div>
    )
}

export default withStyles(styles)(MiniPalette);