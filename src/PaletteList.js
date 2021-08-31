import React, { Component } from 'react';
import MiniPalette from './MiniPalette';

import { withStyles } from '@material-ui/styles';
import styles from './styles/PaletteListStyles';
import { Link } from 'react-router-dom';

class PaletteList extends Component {
    goToPalette(id) {
        this.props.history.push(`/palette/${id}`);
    }
    render() {
        const {palettes, classes} = this.props;
        return (
            <div className={classes.root}>
                <div className={classes.container}>
                    <nav className={classes.nav}>
                        <h1>Palette List!!!!</h1>
                        <Link to="/palette/new">Add a Palette</Link>
                    </nav>
                    <div className={classes.palettes}>
                        {palettes.map(p => (
                            <MiniPalette {...p} key={p.id} handleClick={()=> this.goToPalette(p.id)} />
                        ))}
                    </div>
                </div>
            </div>
        )
    }
}


export default withStyles(styles)(PaletteList);