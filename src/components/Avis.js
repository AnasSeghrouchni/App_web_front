import React from 'react';
import PropTypes from 'prop-types';

const Avis = ({ avis }) => {
  // Fonction pour générer les étoiles
  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < avis.etoiles; i++) {
      stars.push(<span key={i} style={{ color: 'orangered' }}>&#9733;</span>);
    }
    return stars;
  };

  return (
    <div
      style={{
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
        borderRadius: '8px',
        padding: '1rem',
        marginBottom: '1rem',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: '0.5rem',
        }}
      >
        <h3 style={{ fontWeight: 'bold', cursor: 'pointer' }}>{avis.auteur.nom} {avis.auteur.prenom}</h3>
      </div>
      <p>
        <strong>Note:</strong> {renderStars()}
      </p>
      <p>{avis.commentaire}</p>
    </div>
  );
};

Avis.propTypes = {
  avis: PropTypes.shape({
    etoiles: PropTypes.number.isRequired,
    commentaire: PropTypes.string.isRequired,
    auteur: PropTypes.shape({
      nom: PropTypes.string.isRequired,
      prenom: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Avis;
