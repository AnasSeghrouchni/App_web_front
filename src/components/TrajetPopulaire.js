import React from 'react';
import PropTypes from 'prop-types';

const TrajetPopulaire = ({ Depart, Arrivee }) => {
  return (
    <div className='trajetpop'>
      <button>
        <p className='text_trajetpop'>{Depart} &#x2192; {Arrivee}
        </p> <br/>
        {/* <img className='felche' src='./fleche.png' alt='fleche'/> */}
        </button>
    </div>
  );
};

TrajetPopulaire.propTypes = {
  Depart: PropTypes.string.isRequired,
  Arrivee: PropTypes.string.isRequired,
};

export default TrajetPopulaire;
