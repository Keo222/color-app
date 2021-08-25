import React, { Component } from 'react';
import ColorBox from './ColorBox';
import Navbar from './Navbar';
import PaletteFooter from './PaletteFooter';

export default class SingleColorPalette extends Component {
    constructor(props){
        super(props);
        this.state = {
            format: "hex"
        }
        this._shades = this.gatherShades(this.props.palette, this.props.colorId)
        this.changeFormat = this.changeFormat.bind(this);
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
    changeFormat(val){
        this.setState({format: val})
    }
    render() {
        const { paletteName, emoji } = this.props.palette;
        const { format } = this.state;
        const colorBoxes = this._shades.map(c => (
            <ColorBox name={c.name} key={c.name} background={c[format]} showLink={false} />
        ));
        return (
            <div className="Palette">
            <Navbar changeFormat={this.changeFormat} showSlider={false}/>
                <h1>Single Color Palette!!</h1>
                <div className="Palette-colors">
                    {colorBoxes}
                </div>
                <PaletteFooter paletteName={paletteName} emoji={emoji} />
            </div>
        )
    }
}
