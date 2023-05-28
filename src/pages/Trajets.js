import React from 'react';
import Navigation from '../components/Navigation';
import Chercher from '../components/Chercher';
import Colis from '../components/Colis';
import Footer from '../components/Footer';
import { useLocation } from 'react-router-dom';


const Trajets = () => {
  const location = useLocation();
  const colisList = location.state.colisList;
  console.log(colisList);
  console.log(Array.isArray(colisList));

  // Render the list of colis
  const renderColisList = () => {
    if (Array.isArray(colisList)) {
      return colisList.map((colis) => (
        <Colis key={colis.id} colis={colis} />
      ));
    } else {
      return <p>Pas de colis disponible</p>;
    }
  };

  return (
    <div className='trajet'>
      <Navigation />
      <Chercher />
      {renderColisList()}
      <Footer />
    </div>
  );
};

export default Trajets;
