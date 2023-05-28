import React from 'react';
import Navigation from '../components/Navigation';
import { NavLink } from 'react-router-dom';
import { MyContext } from '../context/Context';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useState } from 'react';

const My_page = () => {
  const myContext = useContext(MyContext);
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [email, setEmail] = useState('');
  const [mdp, setMotdepasse] = useState('');
  const [adresse, setAdresse] = useState('');
  const [error, setError] = useState('');
  const [isFormDisabled, setIsFormDisabled] = useState(true);
  const navigate = useNavigate();

  const handleLogout = () => {

    localStorage.removeItem('membre');

    myContext.updateMembre({});

    navigate('/');
  };

  const handleEnableForm = () => {
    setIsFormDisabled(!isFormDisabled);
    if (isFormDisabled){
      setNom(myContext.membre.nom);
      setPrenom(myContext.membre.prenom);
      setEmail(myContext.membre.email);
      setAdresse(myContext.membre.adresse);
    }
  };

  const handleSubmit = async () => {
    var membreId = parseInt(myContext.membre.id, 10);
    console.log('id membre', membreId);
    // Effectuer des validations sur les champs de saisie
    if (!nom || !prenom || !email || !mdp || !adresse) {
      setError('Rentrez l\'ensemble des champs');
      return;
    }

    try {
      // Appeler l'API d'Modification avec les informations fournies
      const res = await fetch(`http://localhost:8080/projet/rest/membre/updatemembre?id=${membreId}`, {
        method: 'PUT',
        body: JSON.stringify({ prenom, nom, email, mdp, adresse}),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (res.ok) {
        console.log('Modification ok');
        setError('Modification réussie');
      } else {
        // Gérer les erreurs d'Modification (par exemple, nom d'utilisateur déjà utilisé)
        setError('Modification failed. Please try again.');
      }
    } catch (error) {
      // Gérer les erreurs de requête (par exemple, erreur de réseau)
      setError('An error occurred. Please try again.');
    }
  };


  return (
    <div className='compte'>
      <Navigation />
      <br/>
      <br/>
      <br/>
      <ul className='navigation'>
        <NavLink to='/' activeclassname='nav-active' className={(nav) => (nav.isActive ? "nav-active" : "")}>
          <li><h4>Mes colis</h4></li>
        </NavLink>
        <NavLink to='/' activeclassname='nav-active' className={(nav) => (nav.isActive ? "nav-active" : "")}>
          <li><h4>Mes livraisons</h4></li>
        </NavLink>
      </ul>
      <div className='membre-info'>
      <Row className='justify-content-center'>
        <Col>
          <div style={{ textAlign: 'center' }}>
      <button onClick={handleEnableForm}>Modifier</button>
      </div> 
      </Col>
      <Col>
      <div style={{ textAlign: 'right' }}>
      <button onClick={handleLogout}>Deconnexion</button>
      </div>
      </Col>
      </Row> 
      <form className='modifierMembre'>
        <label>Nom</label>
        <input
          type="text"
          placeholder={myContext.membre.nom}
          value={nom}
          disabled={isFormDisabled}
          onChange={(e) => setNom(e.target.value)}
        />
        <br/>
        <label>Prenom</label>
        <input
            type="text"
            placeholder={myContext.membre.prenom}
            value={prenom}
            onChange={(e) => setPrenom(e.target.value)}
            disabled={isFormDisabled}
            />
        <br/>
        <label>Mot de passe</label>
        <input
          type="password"
          placeholder="Password"
          value={mdp}
          onChange={(e) => setMotdepasse(e.target.value)}
          disabled={isFormDisabled}
        />
        <br/>
        <label>Adresse</label>
        <input
            type="text"
            placeholder={myContext.membre.adresse}
            value={adresse}
            onChange={(e) => setAdresse(e.target.value)}
            disabled={isFormDisabled}
            />
        <br/>
        <label>Email</label>
        <input
            type="email"
            placeholder={myContext.membre.email}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isFormDisabled}
            />
        <br/>
        {error && <p>{error}</p>}
        <div style={{ textAlign: 'center' }}>
        <input type="submit" 
                            value="Soumettre"
                            onClick={handleSubmit}
                            disabled={isFormDisabled}
          />
          </div>
      </form>
      
      
    </div>
        
          
        
    </div>
  );
};

export default My_page;
