import React from 'react';
import { useEffect, useState } from 'react';
import Navigation from '../components/Navigation';

const LivraisonsMembre = () => {
    const [colisList, setColisList] = useState([]);

    useEffect(() => {
        const recupColis = async () => {
          console.log(localStorage.getItem('membre'));
          const membreId =  JSON.parse(localStorage.getItem('membre')).id;
          try {
            
            const res = await fetch(
              `http://localhost:8080/projet/rest/colis/getalllivrercolis?id=${membreId}`,
              {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                },
              }
            );
            if (res.ok) {
              const data = await res.json();
              console.log(data);
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

        const handleConfimerLivraision = async (id) => {   
            try {
                const res = await fetch(
                    `http://localhost:8080/projet/rest/colis/confimer?id=${id}`,
                    {
                        method: 'POST',
                        body: JSON.stringify(JSON.parse(localStorage.getItem('membre'))),
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }
                );
                if (res.ok) {
                    console.log('ok livraison confirmée');
                    location.reload();
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
                <p>Prix : {colis.prix}</p>
                <p>Lieu de départ : {colis.depart}</p>
                <p>Lieu de destination : {colis.destination}</p>
                <p>Date maximale : {colis.date_max}</p>
                <p>Poids : {colis.poids} Kg</p>
                <p>Taille : {colis.taille} cm</p>
                <p>Propriétaire : {colis.proprietaire.nom} {colis.proprietaire.prenom}</p>
                <p>Status :{colis.status} </p>

              </div> 
               <div style={{ marginRight: '1rem' }}>
                <button
                  onClick={() => handleConfimerLivraision(colis.id)}
                >
                  Confirmer livraison
                </button>
              </div>
            </div>
          ));
        } else {
          return <p>Pas de livraison en cours</p>;
        }
      };

    return (
        <div>
            <Navigation />
            <h1 className='titre'>Mes livraisons</h1>
            <div className="colis-list">{renderColisList()}</div>

            
        </div>
    );
};

export default LivraisonsMembre;