import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Inscription from './pages/Inscription';
import Connexion from './pages/Connexion';
import Acceuil from './pages/Acceuil';
import NotFound from './pages/NotFound';
import ProposerLivraison from './pages/ProposerLivraison';
import Login from "./pages/Login";
import Signup from "./pages/Signup"

const App = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Acceuil />} />
        <Route path="/connexion" element={<Connexion />} />
        <Route path="/inscription" element={<Inscription />} />
        <Route path="/proposer-livraison" element={<ProposerLivraison />} />
        <Route path="*" element={<NotFound />} />
        

      </Routes>
    </BrowserRouter>
  );
};
//<Route exact path="/signup" Component={Signup} />
//<Route  path="/login" Component={Login} />

export default App;