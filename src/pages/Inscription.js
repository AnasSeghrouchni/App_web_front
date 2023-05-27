import React from 'react';
import Navigation from '../components/Navigation';
import { useState } from 'react';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';

const Inscription = () => {
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [email, setEmail] = useState('');
    const [mdp, setMotdepasse] = useState('');
    const [motdepasse2, setMotdepasse2] = useState('');
    const [adresse, setAdresse] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async () => {
        // Effectuer des validations sur les champs de saisie
        if (!nom || !prenom || !email || !mdp || !motdepasse2 || !adresse) {
          setError('Rentrez l\'ensemble des champs');
          return;
        }

        if (mdp !== motdepasse2) {
            setError('Les mots de passe ne correspondent pas');
            return;
        }
    
        try {
          // Appeler l'API d'inscription avec les informations fournies
          const res = await fetch('http://localhost:8080/projet/rest/membre/createMembre', {
            method: 'POST',
            body: JSON.stringify({ prenom, nom, email, mdp, adresse}),
            headers: {
              'Content-Type': 'application/json',
            },
          });
    
          if (res.ok) {
            console.log('inscription ok');
            navigate('/connexion');
          } else {
            // Gérer les erreurs d'inscription (par exemple, nom d'utilisateur déjà utilisé)
            setError('Signup failed. Please try again.');
          }
        } catch (error) {
          // Gérer les erreurs de requête (par exemple, erreur de réseau)
          setError('An error occurred. Please try again.');
        }
      };
    return (
        <div>
            
            
            <Navigation />
            <div>
      <h1>Signup</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nom"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
        />
        <br/>
        <input
            type="text"
            placeholder="Prenom"
            value={prenom}
            onChange={(e) => setPrenom(e.target.value)}
            />
        <br/>
        <input
          type="password"
          placeholder="Password"
          value={mdp}
          onChange={(e) => setMotdepasse(e.target.value)}
        />
        <br/>
        <input
            type="password"
            placeholder="Password"
            value={motdepasse2}
            onChange={(e) => setMotdepasse2(e.target.value)}
            />
        <br/>
        <input
            type="text"
            placeholder="Adresse"
            value={adresse}
            onChange={(e) => setAdresse(e.target.value)}
            />
        <br/>
        <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />
        <br/>
        <input type="submit" 
                            value="S'inscrire"
          />
      </form>
      {error && <p>{error}</p>}
    </div>
      <Footer />
    </div>
    );
};

export default Inscription;