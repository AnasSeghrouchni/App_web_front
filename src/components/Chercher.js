import React, { useState } from 'react';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useNavigate } from 'react-router-dom';

const Chercher = () => {
  const [pointDepart, setPointDepart] = useState('');
  const [pointArrivee, setPointArrivee] = useState('');
  const [date, setDate] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log('Point de départ:', pointDepart);
    console.log('Point d\'arrivée:', pointArrivee);
    console.log('Date:', date);

    try {
      const res = await fetch('http://localhost:8080/projet/rest/colis/getcolisbydepartarrivee', {
        method: 'POST',
        body: JSON.stringify({ 'depart': pointDepart, 'destination': pointArrivee, 'date_max': date }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (res.ok) {
        const colisList = await res.json();
        console.log(colisList);
        console.log('ok');
        navigate('/trajets', { state: { colisList } });
      } else {
        console.log('Request failed with status:', res.status);
      }
    } catch (error) {
      console.log('An error occurred:', error);
    }
  };

  return (
    <div className='chercher'>
      <Form onSubmit={handleSubmit}>
        <Row className='justify-content-center'>
          <Col>
            <Form.Control
              type="text"
              placeholder="Point de départ"
              value={pointDepart}
              onChange={(e) => setPointDepart(e.target.value)}
            />
          </Col>
          <Col>
            <Form.Control
              type="text"
              placeholder="Point d'arrivée"
              value={pointArrivee}
              onChange={(e) => setPointArrivee(e.target.value)}
            />
          </Col>
          <Col>
            <Form.Control
              type="date"
              placeholder="Date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </Col>
        </Row>
        <Row className='justify-content-center'>
          <Col>
            <input type="submit" value="Submit" />
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default Chercher;
