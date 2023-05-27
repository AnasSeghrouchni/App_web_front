import React, { createContext, useState } from "react";
import PropTypes from "prop-types";



// Créer un contexte avec une valeur par défaut
const MyContext = createContext();

// Créer un composant fournisseur de contexte
const MyProvider = ({ children }) => {
  // Définir les données partagées dans le state
  const [membre, setMembre] = useState(Object);

  // Fonction pour mettre à jour les données partagées
  const updateMembre = (newValue) => {
    setMembre(newValue);
  };

  // Valeur du contexte à fournir aux composants descendants
  const contextValue = {
    membre,
    updateMembre,
  };

  return (
    <MyContext.Provider value={contextValue}>
      {children}
    </MyContext.Provider>
  );
};

MyProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };

export { MyContext, MyProvider };
