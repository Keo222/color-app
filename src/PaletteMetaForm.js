import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart';

export class PaletteMetaForm extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            newPaletteName: "",
            open: false,
            emojiOpen: false
        };
    }
    componentDidMount(){
        ValidatorForm.addValidationRule('isPaletteNameUnique', () => 
            this.props.palettes.every(
                ({id}) => id !== this.state.newPaletteName.toLowerCase().replace(/ /g, "-")
            )
        );
    };
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    };
    handleClickOpen = () => {
        this.setState({open: true})
    };

    handleClose = () => {
        this.setState({open: false})
    };

    handleEmojiClose = () => {
        this.setState({emojiOpen: false})
    };

    savePalette = (em) => {
        const emoji = em.native
        this.props.handleSubmit(this.state.newPaletteName, emoji)
        this.setState({
            emojiOpen: false
        })
    }
    
    testSelect = (emoji) => {
        console.log(emoji)
    }

    toEmoji = () => {
        this.setState({open: false, emojiOpen: true})
    }

    render() {
        const {newPaletteName} = this.state;
        return (
            <div>
            <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
                Save
            </Button>
            <Dialog open={this.state.emojiOpen} onClose={this.handleEmojiClose}>
                <DialogTitle id="form-dialog-title">Choose an Emoji</DialogTitle>
                <Picker onSelect={this.savePalette}/>
            </Dialog>
            <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Choose a Palette Name</DialogTitle>
                <ValidatorForm onSubmit={this.toEmoji}>
                <DialogContent>
                    <DialogContentText>
                        Please enter a name for your new palette. It must be unique!
                    </DialogContentText>
                    <TextValidator 
                        label="Palette Name" 
                        value={newPaletteName} 
                        name="newPaletteName"
                        onChange={this.handleChange}
                        fullWidth
                        margin="normal"
                        validators={["required", 'isPaletteNameUnique']}
                        errorMessages={["This field is required", "Name must be unique"]}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button 
                        variant="contained" 
                        color="primary"
                        type="submit"
                    >
                        Save Palette
                    </Button>
                </DialogActions>
                </ValidatorForm>
            </Dialog>
            </div>
        );
    }
}

export default PaletteMetaForm
