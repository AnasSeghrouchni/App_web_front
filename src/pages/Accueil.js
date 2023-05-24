import React from 'react';
import Navigation from '../components/Navigation';
import Bande from '../components/Bande';
import BandeSuite from '../components/BandeSuite';
import Footer from '../components/Footer';


const Accueil = () => {
    return (
        <div>
            <Navigation />
            <Bande />
            <BandeSuite />
            <Footer />
        </div>
        
    );
};

export default Accueil;