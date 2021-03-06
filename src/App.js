import React, { Component } from 'react';
import Palette from './Palette';
import PaletteList from './PaletteList';
import SingleColorPalette from './SingleColorPalette';
import NewPaletteForm from './NewPaletteForm'
import seedColors from './seedColors';

import {Route, Switch} from 'react-router-dom';

import { generatePalette } from './colorHelpers';

export default class App extends Component {
  constructor(props){
    super(props);
    const savedPalettes = JSON.parse(window.localStorage.getItem('palettes'));
    this.state= {
      palettes: savedPalettes || seedColors
    }
    this.savePalette = this.savePalette.bind(this);
    this.findPalette = this.findPalette.bind(this);
    this.deletePalette = this.deletePalette.bind(this);
  }
    findPalette(id){
      return this.state.palettes.find(function(palette){
        return palette.id === id;
      });
    }
    deletePalette(id){
      this.setState(
        st => ({palettes: st.palettes.filter(p => p.id !== id)}),
        this.syncLocalStorage
      )
    }
    savePalette(newPalette){
      const newPalettes = [...this.state.palettes, newPalette]
      this.setState({
        palettes: newPalettes
      }, this.syncLocalStorage)
    }
    syncLocalStorage = () => {
      window.localStorage.setItem('palettes', JSON.stringify(this.state.palettes))
    }
  render() {
    const { palettes } = this.state
    return (
      <Switch>
        <Route exact path="/palette/new" render={(routeProps) => 
          <NewPaletteForm 
            savePalette={this.savePalette} 
            {...routeProps} 
            palettes={this.state.palettes} 
          />} 
        />
        <Route exact path="/" render={(routeProps) => <PaletteList   palettes={palettes} deletePalette={this.deletePalette} {...routeProps} />}/>
        <Route 
          exact path="/palette/:id" 
          render={(routeProps) =>   
            <Palette palette={generatePalette(this.findPalette(routeProps.match.params.id))} />
          } 
        />
        <Route exact path="/palette/:paletteId/:colorId" 
          render={(routeProps) => 
            <SingleColorPalette 
              palette={generatePalette(this.findPalette(routeProps.match.params.paletteId))} 
              colorId={routeProps.match.params.colorId}
            />
          }
        />
        </Switch>
    )
  }
}
