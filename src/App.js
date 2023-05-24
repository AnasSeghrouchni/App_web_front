import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Inscription from './pages/Inscription';
import Connexion from './pages/Connexion';
import Acceuil from './pages/Accueil';
import NotFound from './pages/NotFound';
import ProposerLivraison from './pages/ProposerLivraison';
import LivrerColis from './pages/LivrerColis';

const App = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Acceuil />} />
        <Route path="/connexion" element={<Connexion />} />
        <Route path='/livrer-colis' element={<LivrerColis />} />
        <Route path="/inscription" element={<Inscription />} />
        <Route path="/proposer-livraison" element={<ProposerLivraison />} />
        <Route path="*" element={<NotFound />} />

      </Routes>
    </BrowserRouter>
  );
};

export default App;