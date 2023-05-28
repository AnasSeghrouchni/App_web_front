import React from 'react';
import Navigation from '../components/Navigation';
import { MyContext } from '../context/Context';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const My_page = () => {
  const myContext = useContext(MyContext);
  const navigate = useNavigate();
  const handleLogout = () => {

    localStorage.removeItem('membre');

    myContext.updateMembre({});

    navigate('/');
  };


  return (
    <div className='compte'>
      <Navigation />
      <div className='membre-info'>
        <div className='membre-photo'>
          {/* Afficher la photo du membre */}
        </div>
        <div className='membre-details'>
          {/* Afficher les informations du membre */}
          <h2>{myContext.membre.nom}</h2>
          <p>Email: {myContext.membre.email}</p>
          <p>Adresse: {myContext.membre.adresse}</p>
          {/* Afficher d'autres informations du membre si nécessaire */}
          {/* Deconnexion */}
          <button onClick={handleLogout}>Deconnexion</button>
        </div>
      </div>
    </div>
  );
};

export default My_page;
