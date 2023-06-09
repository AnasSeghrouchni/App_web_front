import React from 'react';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { MyContext } from '../context/Context';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';



const FormulaireConnexion = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');  
    const { updateMembre } = useContext(MyContext); // Utilisation du hook useContext pour accéder au contexte
    const navigate = useNavigate();

    

    const handleSubmit = async (event) => {
                event.preventDefault();
                // Effectuer des validations sur les champs de saisie
                if (!email || !password) {
                    setError('Rentrez l\'ensemble des champs');
                    return;
                  }

                  console.log('Mail:', email);
              
                  try {
                    // Appeler l'API d'inscription avec les informations fournies
                    const res = await fetch('http://localhost:8080/projet/rest/membre/connect', {
                      method: 'POST',
                      body: JSON.stringify({ 'email' : email, 'mdp' : password}),
                      headers: {
                        'Content-Type': 'application/json'
                      },
                    });
              
                    if (res.ok) {
                      console.log('connection ok');

                      const membre = await res.json();
                      console.log('membre', membre);
                      updateMembre(membre);
                      console.log('update effectuée');
                      navigate('/');

                      // Store the authentication token in localStorage
                      localStorage.setItem('membre', JSON.stringify(membre));                   
                     }else {
                      // Gérer les erreurs d'inscription (par exemple, nom d'utilisateur déjà utilisé)
                      setError('Signin failed. Please try again.');
                    }
                  
                  } catch (error) {
                    // Gérer les erreurs de requête (par exemple, erreur de réseau)
                    setError('Une erreur est survenue. Veuillez reessayer.');
                  }
    }
    return (
        <div className='formcon'>
            <Form >
                <input type="email" placeholder="Adresse e-mail" 
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                />
                <input type="password" placeholder="Mot de passe"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                 />
                <input type="submit" 
                            value="Se connecter"
                            onClick={handleSubmit}
                /> 
            </Form>
            {error && <p>{error}</p>}
            <p>Pas encore inscrit ? <a href="/inscription">Inscrivez-vous</a>
            </p>

        </div>
    );
};

export default FormulaireConnexion;
