import React, { Component } from 'react';
import { Button } from '@material-ui/core/';

import { ChromePicker } from 'react-color';

import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

export default class ColorPickerForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentColor: "teal",
            newColorName: ""
        }
    }
    componentDidMount(){
        ValidatorForm.addValidationRule('isNameUnique', (value) => 
            this.state.colors.every(
            ({name}) => name.toLowerCase() !== value.toLowerCase()
            )
        );
        ValidatorForm.addValidationRule('isColorUnique', () => 
            this.state.colors.every(
            ({color}) => color !== this.state.currentColor
            )
        );
    };
    updateCurrentColor = (color) => {
        this.setState({ currentColor: color.hex });
      };
    handleChange = (e) => {
    this.setState({
        [e.target.name]: e.target.value
    })
    };
    handleSubmit = () => {
        const newColor = {color: this.state.currentColor, name: this.state.newColorName}
        this.props.addNewColor(newColor);
        this.setState({newColorName: ""})
    }

    render() {
        const { paletteFull } = this.props;
        const { newColorName, currentColor } = this.state;
        return (
            <div>
                <ChromePicker 
                    color={currentColor}
                    onChangeComplete={ this.updateCurrentColor }
                />
                <ValidatorForm onSubmit={this.handleSubmit}>
                    <TextValidator 
                    value={newColorName}
                    name="newColorName" 
                    onChange={this.handleChange}
                    validators={["required", "isNameUnique", "isColorUnique"]}
                    errorMessages={["This field is required", "Name needs to be unique",  "Color needs to be unique"]}
                    />
                    <Button 
                    variant="contained" 
                    color="primary"
                    type="submit"
                    disabled = {paletteFull}
                    style={{backgroundColor: paletteFull ? "grey" : currentColor}}
                    >
                    Add Color
                    </Button>
                </ValidatorForm>
            </div>
        )
    }
}
