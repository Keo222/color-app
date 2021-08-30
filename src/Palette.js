import React, { Component } from 'react';

import Navbar from './Navbar';
import ColorBox from './ColorBox';
import PaletteFooter from './PaletteFooter';

import './Palette.css'


export default class Palette extends Component {
    constructor(props){
        super(props);
        this.state = { level: 500, format:"hex" };
        this.changeLevel = this.changeLevel.bind(this);
        this.changeFormat = this.changeFormat.bind(this);
    };
    changeLevel(level){
        this.setState({level})
    }
    changeFormat(val){
        this.setState({format: val})
    }
    render() {
        const {colors, paletteName, emoji, id } = this.props.palette;
        const {level, format} = this.state
        const colorBoxes = colors[level].map(c => (
            <ColorBox background={c[format]} name={c.name} key={c.id} paletteId={id} colorId={c.id} showingFullPalette={true} />
        ));
        return (
            <div className="Palette">
                <Navbar level={level} changeLevel={this.changeLevel} changeFormat={this.changeFormat}  showSlider={true}/>
                <div className="Palette-colors">
                    {colorBoxes}
                </div>
                <PaletteFooter emoji={emoji} paletteName={paletteName}/>
            </div>
        )
    }
}
