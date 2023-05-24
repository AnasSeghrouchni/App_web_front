import React from 'react';
import Chercher from '../components/Chercher';
import Navigation from '../components/Navigation';
import TrajetPopulaire from '../components/TrajetPopulaire';
import Footer from '../components/Footer';

const LivrerColis = () => {
    return (
        <div>
            <Navigation />
            <h1 className='titre'>Où voulez-vous livrer ?</h1>
            <Chercher className='chercher_middle'/>
            <h2 className='trajet_pop'>Trajets Populaires</h2>
            <TrajetPopulaire Depart="Paris" Arrivee="Marseille" />
            <TrajetPopulaire Depart="Paris" Arrivee="Lyon" />
            <TrajetPopulaire Depart="Marseille" Arrivee="Toulouse" />
            <TrajetPopulaire Depart="Lyon" Arrivee="Nice" />
            <TrajetPopulaire Depart="Paris" Arrivee="Nantes" />
            <TrajetPopulaire Depart="Paris" Arrivee="Montpellier" />
            <TrajetPopulaire Depart="Paris" Arrivee="Strasbourg" />
            <Footer />
        </div>
    );
};

export default LivrerColis;