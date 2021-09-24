import React, { Component } from 'react';
import MiniPalette from './MiniPalette';

import { withStyles } from '@material-ui/styles';
import styles from './styles/PaletteListStyles';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';

import {CSSTransition, TransitionGroup} from 'react-transition-group';

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
                        <h1 className={classes.heading}>Palette List</h1>
                        <Button variant="contained" color="secondary">
                            <Link to="/palette/new">Add a Palette</Link>
                        </Button>
                    </nav>
                    <TransitionGroup className={classes.palettes}>
                        {palettes.map(p => (
                            <CSSTransition key={p.id} classNames='fade' timeout={5000}>
                                <MiniPalette {...p} key={p.id} id={p.id} handleClick={()=> this.goToPalette(p.id)}
                                deletePalette={deletePalette}
                                />
                            </CSSTransition>
                    ))}
                    </TransitionGroup>
                </div>
            </div>
        )
    }
}


export default withStyles(styles)(PaletteList);