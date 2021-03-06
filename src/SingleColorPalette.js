import React, { Component } from 'react';
import ColorBox from './ColorBox';
import Navbar from './Navbar';
import PaletteFooter from './PaletteFooter';

import { Link } from 'react-router-dom';

import { withStyles } from '@material-ui/styles';
import styles from './styles/PaletteStyles'

class SingleColorPalette extends Component {
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
        const { paletteName, emoji, id } = this.props.palette;
        const { classes } =  this.props
        const { format } = this.state;
        const colorBoxes = this._shades.map(c => (
            <ColorBox name={c.name} key={c.name} background={c[format]} showingFullPalette={false} />
        ));
        return (
            <div className={classes.Palette}>
            <Navbar changeFormat={this.changeFormat} showSlider={false}/>
                <div className={classes.paletteColors}>
                    {colorBoxes}
                    <div className={classes.goBack}>
                        <Link to={`/palette/${id}`} className={classes.backButton}>GO BACK</Link>
                    </div>
                </div>
                <PaletteFooter paletteName={paletteName} emoji={emoji} />
            </div>
        )
    }
}

export default withStyles(styles)(SingleColorPalette);
