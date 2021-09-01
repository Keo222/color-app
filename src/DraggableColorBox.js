import React from 'react';
import { withStyles } from '@material-ui/styles';

// import chroma from 'chroma-js';

import DeleteIcon from '@material-ui/icons/Delete';

import { SortableElement } from 'react-sortable-hoc';


const styles = {
    root: {
        width: "20%",
        height: "25%",
        backgroundColor: props => props.color,
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
        color: "rgba(0, 0, 0, 0.7)",
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

const DraggableColorBox = SortableElement((props) => {
    const { classes, name, color, handleDelete } = props;
    return (
        <div className={classes.root}>
            <div className={classes.boxContent}>
                <span>{name}</span>
                <DeleteIcon 
                    onClick={() => handleDelete(color)}
                    className={classes.deleteIcon}    
                    />
            </div>
        </div>
    )
});

export default withStyles(styles)(DraggableColorBox);
