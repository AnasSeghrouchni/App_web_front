import React, { useEffect, useState } from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { Col, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

const ColisQuestion = () => {
  const { colisId } = useParams();
  const [colis, setColis] = useState(null);

  useEffect(() => {
    const recupColis = async () => {
      try {
        var memberId = localStorage.getItem('membre');
        
        const res = await fetch(
          `http://localhost:8080/projet/rest/colis/getallcolis?id=${memberId}`,
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

  const handleClickDelete = async () => {
    console.log('Supprimer le colis');
    try {
      const res = await fetch(
        `http://localhost:8080/projet/rest/colis/deletecolis?id=${colis.id}`,
        {
          method: 'POST',
          body: localStorage.getItem('membre'),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if (res.ok) {
        console.log('ok colis supprimé');
      } else {
        console.log('Request failed with status:', res.status);
      }
    } catch (error) {
      console.log('Request failed:', error);
    }
  };

    const handleClickLivraisonConfirme = async () => {
        console.log(' livraison confirmee');
        try {
            const res = await fetch(
                `http://localhost:8080/projet/rest/colis/confirmerlivraison?id=${colis.id}`,
                {
                    method: 'POST',
                    body: localStorage.getItem('membre'),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            if (res.ok) {
                console.log('ok livraison confirmee');
            } else {
                console.log('Request failed with status:', res.status);
            }
        } catch (error) {
            console.log('Request failed:', error);
        }
    };

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
            <button onClick={handleClickDelete}>Supprimer colis</button>
          </div>
        </Col>
        <Col>
          <div className="actions">
            <button onClick={() => handleClickLivraisonConfirme}>
              Confirmer livraison
            </button>
          </div>
        </Col>
      </Row>

      <Footer />
    </div>
  );
};

export default ColisQuestion;
