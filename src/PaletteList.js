import React, { Component } from 'react';
import MiniPalette from './MiniPalette';

import { withStyles } from '@material-ui/styles';
import styles from './styles/PaletteListStyles';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';

class PaletteList extends Component {
    goToPalette(id) {
        this.props.history.push(`/palette/${id}`);
    }
    render() {
        const {palettes, classes, deletePalette} = this.props;
        return (
            <div className={classes.root}>
                <div className={classes.container}>
                    <nav className={classes.nav}>
                        <h1>Palette List!!!!</h1>
                        <Button variant="contained" color="secondary">
                            <Link to="/palette/new">Add a Palette</Link>
                        </Button>
                    </nav>
                    <div className={classes.palettes}>
                        {palettes.map(p => (
                            <MiniPalette {...p} key={p.id} id={p.id} handleClick={()=> this.goToPalette(p.id)}
                            deletePalette={deletePalette}
                            />
                        ))}
                    </div>
                </div>
            </div>
        )
    }
}


export default withStyles(styles)(PaletteList);