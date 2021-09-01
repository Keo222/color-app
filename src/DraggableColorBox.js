import React from 'react';
import { withStyles } from '@material-ui/styles';

import chroma from 'chroma-js';

import DeleteIcon from '@material-ui/icons/Delete';


const styles = {
    root: {
        width: "20%",
        height: "25%",
        margin: "0 auto",
        display: "inline-block",
        position: "relative",
        cursor: "pointer",
        marginBottom: "-4px",
        "&:hover svg": {
            color: "white",
            transform: "scale(1.25)"
        }
    },
    boxContent: {
        position: "absolute",
        width: "100%",
        left: "0px",
        bottom: "0px",
        padding: "10px",
        color: props => chroma(props.color).luminance() <= 0.11 ? "white" : "rgba(0, 0, 0, 0.7)",
        letterSpacing: "1px",
        textTransform: "uppercase",
        fontSize: "12px",
        display: 'flex',
        justifyContent: 'space-between'
    },
    deleteIcon: {
        color: "rgba(0, 0, 0, 0.7)",
        transition: "all 0.3s ease-in-out"
    }
}

function DraggableColorBox(props) {
    const { classes, name, color } = props;
    return (
        <div className={classes.root} style={{backgroundColor: color}}>
            <div className={classes.boxContent}>
                <span>{name}</span>
                <DeleteIcon 
                    onClick={() => props.handleDelete(color)}
                    className={classes.deleteIcon}    
                    />
            </div>
        </div>
    )
}

export default withStyles(styles)(DraggableColorBox);
