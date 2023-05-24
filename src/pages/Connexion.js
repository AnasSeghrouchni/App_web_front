import React from 'react';
import Navigation from '../components/Navigation';
import FormulaireConnexion from '../components/FormulaireConnexion';
import Footer from '../components/Footer';

const Connexion = () => {
    return (
        <div>

            <Navigation />
            <h1 className='titre'>Connexion</h1>
            <FormulaireConnexion />
            <Footer />
        </div>
    );
};

export default Connexion;