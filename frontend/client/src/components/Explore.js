import React from 'react';
import LoggedInNavbar from '../components/LoggedInNavbar';
import Map from './Map';

function Explore(){

    return(
        <>
            <LoggedInNavbar />
            <h2>Explore</h2>
            <map/>
        </>
    );
}

export default Explore