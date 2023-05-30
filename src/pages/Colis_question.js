import React, { useEffect, useState } from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { Col, Row } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';

const ColisQuestion = () => {
  const { colisId } = useParams();
  const navigate = useNavigate();
  const [colis, setColis] = useState(null);

  useEffect(() => {
    const recupColis = async () => {
      try {
        
        const res = await fetch(
          `http://localhost:8080/projet/rest/colis/getcolisbyid?id=${colisId}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        if (res.ok) {
          const colisData = await res.json();
          setColis(colisData);
          console.log(colisData);
          console.log('ok colis');
        } else {
          console.log('Request failed with status:', res.status);
        }
      } catch (error) {
        console.log('Request failed:', error);
      }
    };

    recupColis();
  }, [colisId]);

  const handleClickLivraison = async () => {
    console.log('Proposer une livraison');
    try {
      const res = await fetch(
        `http://localhost:8080/projet/rest/colis/proposerlivreur?id=${colis.id}`,
        {
          method: 'POST',
          body: localStorage.getItem('membre'),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if (res.ok) {
        console.log('ok proposition faite');
      } else {
        console.log('Request failed with status:', res.status);
      }
    } catch (error) {
      console.log('Request failed:', error);
    }
  };

  const handleClickProprio = (id) => {
    navigate(`/profil/${id}`);
  };

  if (!colis) {
    return <div>Loading...</div>; // Add a loading state while fetching the colis
  }

  return (
    <div>
      <Navigation />

      <div className="colis-info">
        <h2>{colis.destination}</h2>
        <p>Prix : {colis.prix}</p>
        <p>Départ : {colis.depart}</p>
        <p>Date limite : {colis.date_max}</p>
        <p>Status : {colis.status}</p>
      </div>
      <Row>
        <Col>
          <div className="actions">
            <button onClick={handleClickLivraison}>Proposer une livraison</button>
          </div>
        </Col>
        <Col>
          <div className="actions">
            <button onClick={() => handleClickProprio(colis.proprietaire.id)}>
              En savoir plus sur le propriétaire
            </button>
          </div>
        </Col>
      </Row>

      <Footer />
    </div>
  );
};

export default ColisQuestion;
