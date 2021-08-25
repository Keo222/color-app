import React, { Component } from 'react';
import ColorBox from './ColorBox';

export default class SingleColorPalette extends Component {
    constructor(props){
        super(props);
        // this.state = {
        //     format: "hex"
        // }
        this._shades = this.gatherShades(this.props.palette, this.props.colorId)
    }
    gatherShades(palette, filterColor){
        let shades = [];
        let allColors = palette.colors;

        for(let key in allColors){
            shades = shades.concat(
                allColors[key].filter(color => color.id === filterColor)
            )
        }
        return shades.slice(1)
    }
    render() {
        // const { format } = this.state;
        // const { id } = this.props.palette;
        const colorBoxes = this._shades.map(c => (
            <ColorBox name={c.name} key={c.name} background={c.hex} showLink={false} />
        ));
        return (
            <div className="Palette">
                <h1>Single Color Palette!!</h1>
                <div className="Palette-colors">
                    {colorBoxes}
                </div>
            </div>
        )
    }
}
