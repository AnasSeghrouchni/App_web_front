import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Inscription from './pages/Inscription';
import Connexion from './pages/Connexion';
import Acceuil from './pages/Accueil';
import NotFound from './pages/NotFound';
import ProposerLivraison from './pages/ProposerLivraison';
import LivrerColis from './pages/LivrerColis';
import {  MyProvider } from './context/Context';
import My_page from './pages/My_page';
import Trajets from './pages/Trajets';
import ColisQuestion from './pages/Colis_question';
import Profil from './pages/Profil';

const App = () => {

  return (
    <MyProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Acceuil />} />
        <Route path="/connexion" element={<Connexion />} />
        <Route path='/livrer-colis' element={<LivrerColis />} />
        <Route path="/inscription" element={<Inscription />} />
        <Route path="/proposer-livraison" element={<ProposerLivraison />} />
        <Route path="/my-compte" element={<My_page />} />
        <Route path="/trajets" element={<Trajets />} />
        <Route path="/colis_question/:colisId" element={<ColisQuestion />} />
        <Route path='/profil/:membreId' element={<Profil />} />
        <Route path="*" element={<NotFound />} />

      </Routes>
    </BrowserRouter>
    </MyProvider>
  );
};

export default App;