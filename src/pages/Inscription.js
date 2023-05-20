import React from 'react';
import Navigation from '../components/Navigation';
import { useState } from 'react';

const Inscription = () => {
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [email, setEmail] = useState('');
    const [motdepasse, setMotdepasse] = useState('');
    const [motdepasse2, setMotdepasse2] = useState('');
    const [adresse, setAdresse] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async () => {
        // Effectuer des validations sur les champs de saisie
        if (!nom || !prenom || !email || !motdepasse || !motdepasse2 || !adresse) {
          setError('Rentrez l\'ensemble des champs');
          return;
        }

        if (motdepasse !== motdepasse2) {
            setError('Les mots de passe ne correspondent pas');
            return;
        }
    
        try {
          // Appeler l'API d'inscription avec les informations fournies
          const res = await fetch('http://localhost:8080/projet/rest/membres/createMembre', {
            method: 'POST',
            body: JSON.stringify({ nom, prenom, email, motdepasse, motdepasse2, adresse }),
            headers: {
              'Content-Type': 'application/json',
            },
          });
    
          if (res.ok) {
            // Rediriger l'utilisateur vers la page de connexion ou afficher un message de succès
            // (par exemple, en utilisant React Router ou en mettant à jour l'état approprié)
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
      <form onSubmit={handleSubmit}>
      <h1 style={{align: "center", backgroundColor: "lightblue"}}>Inscription</h1>
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
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
          type="password"
          placeholder="Mot de passe"
          value={motdepasse}
          onChange={(e) => setMotdepasse(e.target.value)}
        />
        <br/>
        <input
            type="password"
            placeholder="Confirmer mot de passe"
            value={motdepasse2}
            onChange={(e) => setMotdepasse2(e.target.value)}
            />
        <input type="submit" />
        {error && <p>{error}</p>}
      </form>
      
    </div>
        </div>
    );
};

export default Inscription;