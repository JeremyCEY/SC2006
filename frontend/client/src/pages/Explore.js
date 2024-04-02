//Explore.js
import React from 'react';
import LoggedInNavbar from '../components/LoggedInNavbar';
import Map from '../components/Map';

function Explore(){
    return(
        <>
            <LoggedInNavbar />
            <h2>Explore</h2>
            <Map/>
        </>
    );
}

export default Explore