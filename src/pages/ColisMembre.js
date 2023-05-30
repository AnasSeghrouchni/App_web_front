import React, { useEffect, useState } from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const ColisMembre = () => {
  const [colisList, setColisList] = useState([]);
  const [ListMembre, setListMembre] = useState([]);
  const [colisId, setColisId] = useState(null); 
  const navigate = useNavigate();


  useEffect(() => {
    const recupColis = async () => {
      console.log(localStorage.getItem('membre'));
      const membreId =  JSON.parse(localStorage.getItem('membre')).id;
      try {
        
        const res = await fetch(
          `http://localhost:8080/projet/rest/colis/getcolisbyproprio?id=${membreId}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        if (res.ok) {
          const data = await res.json();
          setColisList(data);
          console.log('ok colis');
        } else {
          console.log('Request failed with status:', res.status);
        }
      } catch (error) {
        console.log('Request failed:', error);
      }
    };

    recupColis();
  }, []);

  const handleAccepter = async (id, membre) => {
    console.log('Accepter livraison');
    try {
      const res = await fetch(
        `http://localhost:8080/projet/rest/colis/putlivreur?id=${id}`,
        {
          method: 'POST',
          body: JSON.stringify(membre),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if (res.ok) {
        console.log('ok livraison acceptée');
        location.reload();
      } else {
        console.log('Request failed with status:', res.status);
      }
    } catch (error) {
      console.log('Request failed:', error);
    }
};


  const handleClickDelete = async (id) => {
      try {
        const res = await fetch(
          `http://localhost:8080/projet/rest/colis/deletecolis?id=${id}`,
          {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        if (res.ok) {
          console.log('ok colis supprimé');
          location.reload();

        } else {
          console.log('Request failed with status:', res.status);
        }
      } catch (error) {
        console.log('Request failed:', error);
      }
  };

  const handleClickLivraisonConfirme = async (id) => {

      try {
        const res = await fetch(
          `http://localhost:8080/projet/rest/colis/getlivreur?id=${id}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        if (res.ok) {
          const ListMembre = await res.json();
          console.log('ok livraison confirmée');
          console.log(ListMembre);
          setListMembre(ListMembre);
          setColisId(id);
        } else {
          console.log('Request failed with status:', res.status);
        }
      } catch (error) {
        console.log('Request failed:', error);
      }
  };

  const renderColisList = () => {
    if (Array.isArray(colisList) && colisList.length > 0) {
      return colisList.map((colis) => (
        <div
          key={colis.id}
          className="colis"
          style={{
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
            borderRadius: '8px',
            padding: '1rem',
            marginBottom: '1rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
          }}
        >
        
          <div>
            <h3>{colis.nom}</h3>
            
            <img
              src={colis.photo}
              style={{
                width: 'auto',  // Largeur souhaitée
                height: 'auto',  // Hauteur automatique pour maintenir les proportions
              }}
            />
            <p>Prix : {colis.prix}</p>
            <p>Lieu de départ : {colis.depart}</p>
            <p>Lieu de destination : {colis.destination}</p>
            <p>Date maximale : {colis.date_max}</p>
            <p>Poids : {colis.poids} Kg</p>
            <p>Taille : {colis.taille} cm</p>
            <p>Status : {colis.status}</p>
            {( colis.livreur ? <p>Livreur : {colis.livreur.nom} {colis.livreur.prenom}</p> : <p>Livreur : Pas de livreur</p> )}

          </div> 
           <div style={{ marginRight: '1rem' }}>
            <button
              onClick={() => handleClickDelete(colis.id)}
            >
              Supprimer colis
            </button>
          </div>
          <div style={{ marginRight: '1rem' }}>
            <button
              onClick={() => handleClickLivraisonConfirme(colis.id)}
            >
              Voir livreurs
            </button>
          </div>
        </div>
      ));
    } else {
      return <p>Pas de colis disponible</p>;
    }
  };

  const renderListMembre = () => {
    if (Array.isArray(ListMembre) && ListMembre.length > 0) {
      return ListMembre.map((membre) => (
        <div
          key={membre.id}
          className="membre"
          style={{
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
            borderRadius: '8px',
            padding: '1rem',
            marginBottom: '1rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <a href="#" onClick={() => navigate(`/profil/${membre.id}`)}>
            {membre.nom} {membre.prenom}
          </a>
          <button onClick={() => handleAccepter(colisId, membre)}> Accepter livraison</button>
        </div>
      ));
    } else {
      return null;
    }
  };
  
        

  return (
    <div>
      <Navigation />
      <h1 className="titre" style={{ textAlign: 'center' }}>
        Mes colis
      </h1>
      <Col>
      {renderColisList()}
      </Col>
      {renderListMembre()}


      <Footer />
    </div>
  );
};

export default ColisMembre;
