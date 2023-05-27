import React from 'react';
import Navigation from '../components/Navigation';
import { MyContext } from '../context/Context';
import { useContext } from 'react';

const My_page = () => {
  const myContext = useContext(MyContext);

  return (
    <div className='compte'>
      <Navigation />
      <div className='membre-info'>
        <div className='membre-photo'>
          {/* Afficher la photo du membre */}
          <img src="./pp.jpg" alt='Photo du membre' />
        </div>
        <div className='membre-details'>
          {/* Afficher les informations du membre */}
          <h2>{myContext.membre.nom}</h2>
          <p>Email: {myContext.membre.email}</p>
          <p>Adresse: {myContext.membre.adresse}</p>
          {/* Afficher d'autres informations du membre si nécessaire */}
        </div>
      </div>
    </div>
  );
};

export default My_page;
