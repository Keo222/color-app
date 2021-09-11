import React from 'react';
import { withStyles } from '@material-ui/styles';

import DeleteIcon from '@material-ui/icons/Delete';

import { SortableElement } from 'react-sortable-hoc';

import styles from './styles/DraggableColorBoxStyles'

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
