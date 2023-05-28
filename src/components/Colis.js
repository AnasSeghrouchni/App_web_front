import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const Colis = ({ colis }) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Initialize the isHovered state based on the colis prop
    setIsHovered(false);
  }, [colis]); // Run this effect whenever the colis prop changes

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleClick = () => {
    console.log('clicked');
    console.log(colis);
    navigate(`/colis_question/${colis.id}`);
  };

  if (!colis) {
    // Render a placeholder or return null when colis is not defined
    return null;
  }

  return (
    <div
      className={`colis-item ${isHovered ? 'hovered' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <h3>{colis.nom}</h3>
      <p>De {colis.depart} à {colis.destination}</p>
      <p>A livrer avant le {colis.date_max}</p>
      <p className='owner'>Proposé par {colis.proprietaire.nom}</p>
      <p className='price'>{colis.prix} $</p>
    </div>
  );
};

Colis.propTypes = {
  colis: PropTypes.shape({
    id: PropTypes.number.isRequired,
    nom: PropTypes.string.isRequired,
    destination: PropTypes.string.isRequired,
    prix: PropTypes.number.isRequired,
    depart: PropTypes.string.isRequired,
    date_max: PropTypes.string.isRequired,
    proprietaire: PropTypes.shape({
      nom: PropTypes.string.isRequired,
    }),
  }),
};

export default Colis;
