import React from 'react';
import Navigation from '../components/Navigation';
import 'bootstrap/dist/css/bootstrap.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProposerLivraison = () => {
  const [prix, setPrix] = useState('');
  const [depart, setDepart] = useState('');
  const [destination, setDestination] = useState('');
  const [date_max, setDate_max] = useState('');
  const [poids, setPoids] = useState('');
  const [taille, setTaille] = useState('');
  const [nom, setNom] = useState('');
  const [notification, setNotification] = useState('');
  const [photo, setPhoto] = useState('');
    const navigate = useNavigate();

  const createColis = async () => {
    if (localStorage.getItem('membre') === null) {
        navigate('/connexion');}
        else{
    try {
      const res = await fetch('http://localhost:8080/projet/rest/colis/createcolis', {
        method: 'POST',
        body: JSON.stringify({ nom, prix, photo, depart, destination, date_max, poids, taille, 'proprietaire': JSON.parse(localStorage.getItem('membre')) }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (res.ok) {
        console.log('creation ok');
        console.log(res.json());
        setNotification('Votre colis a bien été créé');
        navigate('/my-compte/colis');
      } else {
        console.log('Request failed with status:', res.status);
        setNotification('Une erreur est survenue');
      }
    } catch (error) {
      console.log(error);
      setNotification('Une erreur est survenue');
      
    }
}
  };

  return (
    <div>
      <Navigation />
        <div className="proposer">
          <h1 className='titre' style={{ textAlign: "center" }}>Créer un colis</h1>
          <form>
            <div className="form-group">
              <input type="text" className="form-control" id="nom" name="nom" placeholder="Nom du colis" onChange={(e) => setNom(e.target.value)} />
            </div>
            <div className="form-group">
              <input type="file" accept=".png, .jpg, .jpeg" className="form-control" id="photo" name="photo" placeholder="Photo du colis" onChange={(e) => setPhoto(e.target.value)} />
            </div>
            <div className="form-group">
              <input type="number"
                className="form-control"
                min="1"
                placeholder="Prix d'expédition du colis"
                onChange={(e) => setPrix(e.target.value)}
              />
            </div>
            <div className="form-group">
              <input type="text" className="form-control" id="depart" name="depart" placeholder="Lieu de départ" onChange={(e) => setDepart(e.target.value)} />
            </div>
            <div className="form-group">
              <input type="text" id="destination" className="form-control" name="destination" placeholder="Lieu de destination" onChange={(e) => setDestination(e.target.value)} />
            </div>
            <div className="form-group">
              <input type="date" id="date_max" min="2023-05-30" className="form-control" name="date_max" placeholder="Date maximale d'arrivée" onChange={(e) => setDate_max(e.target.value)} />
            </div>
            <div className="form-group">
              <input type="number" min="10" max="300" id="poids" className="form-control" name="poids" placeholder="Poids (en Kg)" onChange={(e) => setPoids(e.target.value)} />
            </div>
            <div className="form-group">
              <input type="number" min="10" id="taille" className="form-control" name="taille" placeholder="Taille (en cm)" onChange={(e) => setTaille(e.target.value)} />
            </div>
            <div style={{ textAlign: 'center', color:'violet' }}>{notification}</div> 
            <input type="submit" style={{ textAlign: 'center' }} className="btn btn-primary" onClick={createColis} value="Proposer" />
          </form>
        </div>
    </div>
  );
};

export default ProposerLivraison;
