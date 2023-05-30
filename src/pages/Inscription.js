import React from 'react';
import Navigation from '../components/Navigation';
import { useState } from 'react';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import passwordValidator from 'password-validator';
import emailValidator from 'email-validator';

const Inscription = () => {
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [email, setEmail] = useState('');
    const [mdp, setMotdepasse] = useState('');
    const [motdepasse2, setMotdepasse2] = useState('');
    const [adresse, setAdresse] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const passwordSchema = new passwordValidator();

    passwordSchema
      .is().min(8)                // Au moins 8 caractères de longueur
      .has().uppercase()          // Doit contenir des lettres majuscules
      .has().lowercase()          // Doit contenir des lettres minuscules
      .has().digits()             // Doit contenir des chiffres
      .has().symbols()            // Doit contenir des symboles
      .has().not().spaces();      // Ne doit pas contenir d'espaces

    const err = () => {
      if (!nom || !prenom || !email || !mdp || !motdepasse2 || !adresse) {
        setError('Rentrez l\'ensemble des champs');
        return true;
        
      }
      if (!passwordSchema.validate(mdp)) {
        setError('Le mot de passe ne satisfait pas les exigences de sécurité.');
        return true;
      }
      if (!emailValidator.validate(email)) {
        setError('L\'adresse e-mail n\'est pas valide.');
        return true;
      }
      if (mdp !== motdepasse2) {
          setError('Les mots de passe ne correspondent pas');
          return true;
          
      }
      return false;
    }
    const handleSubmit = async () => {
        // Effectuer des validations sur les champs de saisie
        var erreur = err();
        if (!erreur) {
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
        }
      };
    return (
        <div>
            
            
            <Navigation />
            <div className='inscription'>
            <Col>
            <Row>
            <h1 className='titre'>Inscription</h1>
            </Row>
            <Row>
      <form>
        <input
          type="text"
          placeholder="Nom"
          value={nom}
          required
          onChange={(e) => setNom(e.target.value)}
        />
        <input
            type="text"
            placeholder="Prenom"
            value={prenom}
            required
            onChange={(e) => setPrenom(e.target.value)}
            />
        <input
          type="password"
          placeholder="Password"
          value={mdp}
          required
          onChange={(e) => setMotdepasse(e.target.value)}
        />
        <input
            type="password"
            placeholder="Password"
            value={motdepasse2}
            required
            onChange={(e) => setMotdepasse2(e.target.value)}
            />
        <input
            type="text"
            placeholder="Adresse"
            value={adresse}
            required
            onChange={(e) => setAdresse(e.target.value)}
            />

        <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />
            {error && <p>{error}</p>}
        <input type="submit" 
                            value="S'inscrire"
                            onClick={ handleSubmit}
          />
      </form>
      
      </Row>
      </Col>
    </div>
      <Footer />
    </div>
    );
};

export default Inscription;