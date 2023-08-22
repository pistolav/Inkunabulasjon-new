import React, {useEffect, useState} from 'react';
import Grid from "../elements/collection/grid";

const collection = () => {

    return (
        <div className="collection section">
            <h1>Samling</h1>
            <p>Dette er samlingssiden</p>
            <Grid/>
        </div>
    );
};

export default collection;
