import React, { useEffect, useState } from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import Avis from '../components/Avis';
import { useNavigate, useParams } from 'react-router-dom';

const Profil = () => {
  const { membreId } = useParams();
  const [membre, setMembre] = useState({});
  const [avisRecus, setAvisRecus] = useState([]);
  const [commentaire, setCommentaire] = useState('');
  const [etoiles, setEtoiles] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const getMembre = async () => {
      try {
        const res = await fetch(
          `http://localhost:8080/projet/rest/membre/getmembrebyid?id=${membreId}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        if (res.ok) {
          const membreData = await res.json();
          setMembre(membreData);
          console.log(membreData);
          console.log('ok membre');
        } else {
          console.log('Request failed with status:', res.status);
        }
      } catch (error) {
        console.log('Request failed:', error);
      }
    };

    getMembre();
  }, [membreId]);

  useEffect(() => {
    getAvisRecus();
  }, []);

  const getAvisRecus = async () => {
    try {
      const res = await fetch(
        `http://localhost:8080/projet/rest/membre/getallavisrecu?id=${membreId}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if (res.ok) {
        const avis = await res.json();
        setAvisRecus(avis);
        console.log(avis);
        console.log('ok avis');
      } else {
        console.log('Request failed with status:', res.status);
      }
    } catch (error) {
      console.log('Request failed:', error);
    }
  };

  const ajoutAvis = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:8080/projet/rest/avis/createavis`, {
        method: 'POST',
        body: JSON.stringify({
          etoiles,
          commentaire,
          auteur: JSON.parse(localStorage.getItem('membre')),
          cible: membre,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (res.ok) {
        console.log('ok avis');
        console.log('avis créé');
        navigate('/profil/' + membre.id);
      } else {
        console.log('Request failed with status:', res.status);
      }
    } catch (error) {
      console.log('Request failed:', error);
    }
  };

  return (
    <div className='profil'>
      <Navigation />
      <h1>Profil</h1>
      <p>{membre.nom}</p>
      <p>{membre.email}</p>

      <h2>Avis reçus</h2>
      {avisRecus.map((avis) => (
        <Avis key={avis.id} avis={avis} />
      ))}
      <h2>Laisser un avis</h2>
      <form onSubmit={ajoutAvis}>
        <div className='row form-group'>
          <div className='col-25'>
            <label htmlFor='note'>Note</label>
          </div>
          <div className='col-75'>
            <input
              type='number'
              className='form-control'
              id='note'
              name='note'
              placeholder='Note'
              onChange={(e) => setEtoiles(e.target.value)}
            />
          </div>
        </div>
        <div className='row form-group'>
          <div className='col-25'>
            <label htmlFor='commentaire'>Commentaire</label>
          </div>
          <div className='col-75'>
            <input
              className='form-control'
              id='commentaire'
              name='commentaire'
              placeholder='Commentaire'
              onChange={(e) => setCommentaire(e.target.value)}
            />
          </div>
        </div>
        <div className='row form-group'>
          <input type='submit' value='Envoyer' />
        </div>
      </form>

      <Footer />
    </div>
  );
};

export default Profil;
