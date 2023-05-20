import React from 'react';
import Navigation from '../components/Navigation';
import Bande from '../components/Bande';
import { Row, Col } from 'react-bootstrap';
import BandeSuite from '../components/BandeSuite';


const Acceuil = () => {
    return (
        <div>
            <Navigation />
            <Bande />
            <BandeSuite />
        </div>
        
    );
};

export default Acceuil;