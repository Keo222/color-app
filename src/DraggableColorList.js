import React from 'react';
import DraggableColorBox from './DraggableColorBox';

import {SortableContainer} from "react-sortable-hoc";

const DraggableColorList = SortableContainer((props) => {
    const {colors, handleDelete} = props;
    return (
        <div style={{height: "100%"}}>
            {colors.map((c, i) => (
            <DraggableColorBox color={c.color} name={c.name} key={c.name} handleDelete={handleDelete} index={i}/>
          ))}
        </div>
    )
})

export default DraggableColorList
