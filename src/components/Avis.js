import React from 'react';
import PropTypes from 'prop-types';

const Avis = ({ avis }) => {

  // Fonction pour générer les étoiles
  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < avis.etoiles; i++) {
      stars.push(<span key={i}>&#9733;</span>);
    }
    return stars;
  };

  return (
    <div>
      <div>{renderStars()}</div>
      <p>{avis.commentaire}</p>
      <p>{avis.auteur.nom}</p>
    </div>
  );
};

Avis.propTypes = {
    avis: PropTypes.shape({
      etoiles: PropTypes.number.isRequired,
      commentaire: PropTypes.string.isRequired,
      auteur: PropTypes.shape({
        nom: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  };

export default Avis;
