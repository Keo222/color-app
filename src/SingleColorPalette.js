import React, { Component } from 'react';
import ColorBox from './ColorBox';
import Navbar from './Navbar';
import PaletteFooter from './PaletteFooter';

import { Link } from 'react-router-dom';

import { withStyles } from '@material-ui/styles';

const styles = {
    Palette: {
        height: '100vh',
        display: 'flex',
        flexDirection: 'column'
    },
    paletteColors: {
        height: '90%'
    },
    goBack: {
        width: "20%",
        height: "50%",
        margin: "0 auto",
        display: "inline-block",
        position: "relative",
        cursor: "pointer",
        marginBottom: "-4px",
        opacity: "1",
        backgroundColor: 'black',
    },
    backButton: {
        width: '100px',
        height: '30px',
        position: 'absolute',
        display: 'inline-block',
        top: '50%',
        left: '50%',
        marginLeft: '-50px',
        marginTop: '-15px',
        textAlign: 'center',
        outline: 'none',
        background: 'rgba(255, 255, 255, 0.3)',
        fontSize: '1rem',
        lineHeight: '30px',
        color: 'white',
        textTransform: 'uppercase',
        border: 'none',
    }
}

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
