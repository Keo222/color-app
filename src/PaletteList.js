import React, { Component } from 'react';
import MiniPalette from './MiniPalette';

import { withStyles } from '@material-ui/styles';
import styles from './styles/PaletteListStyles';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import Avatar from '@mui/material/Avatar';
import blue from "@material-ui/core/colors/blue";
import red from "@material-ui/core/colors/red";

import {CSSTransition, TransitionGroup} from 'react-transition-group';

class PaletteList extends Component {
    constructor(props){
        super(props);
        this.state = {
            openDeleteDialog: false,
            deletingId: ""
        };
        this.openDialog = this.openDialog.bind(this);
        this.closeDialog = this.closeDialog.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.goToPalette = this.goToPalette.bind(this);
    }
    openDialog(id){
        this.setState({openDeleteDialog: true, deletingId: id})
    }
    closeDialog(){
        this.setState({openDeleteDialog: false, deletingId: ""})
    }
    handleDelete(){
        this.props.deletePalette(this.state.deletingId);
        this.closeDialog();
    }
    goToPalette(id) {
        this.props.history.push(`/palette/${id}`);
    }
    render() {
        const {palettes, classes} = this.props;
        const {openDeleteDialog} = this.state;
        return (
            <div className={classes.root}>
                <div className={classes.container}>
                    <nav className={classes.nav}>
                        <h1 className={classes.heading}>Palette List</h1>
                        <Button variant="contained" color="secondary">
                            <Link to="/palette/new">Add a Palette</Link>
                        </Button>
                    </nav>
                    <TransitionGroup className={classes.palettes}>
                        {palettes.map(p => (
                            <CSSTransition key={p.id} classNames='fade' timeout={500}>
                                <MiniPalette {...p} key={p.id} id={p.id} goToPalette={this.goToPalette}
                                // deletePalette={deletePalette}
                                openDialog={this.openDialog}
                                />
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                </div>
                <Dialog 
                    open={openDeleteDialog} 
                    aria-labelledby="delete-dalog-title"
                    onClose={this.closeDialog}
                >
                    <DialogTitle id="delete-dialog-title">Delete this Palette?</DialogTitle>
                    <ListItem button onClick={this.handleDelete}>
                        <ListItemAvatar>
                            <Avatar style={{backgroundColor: blue[100], color: blue[600]}}>
                                <CheckIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText>Delete</ListItemText>
                    </ListItem>
                    <ListItem button onClick={this.closeDialog}>
                        <ListItemAvatar>
                            <Avatar style={{backgroundColor: red[100], color: red[600]}}>
                                <CloseIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText>Cancel</ListItemText>
                    </ListItem>
                </Dialog>
            </div>
        )
    }
}


export default withStyles(styles)(PaletteList);