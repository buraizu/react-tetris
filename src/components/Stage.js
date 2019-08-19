import React from 'react';

import Cell from './Cell';

// Map through rows provided by createStage(), then map through cells. Cell[0] refers to '0' provided to cell component in createStage
const Stage = ({ stage }) => (
    <div>
        {stage.map( (row) => row.map( (cell, x) => <Cell key={x} type={cell[0]} />) )}
    </div>
)

export default Stage;