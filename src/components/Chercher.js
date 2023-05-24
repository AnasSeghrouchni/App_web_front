import React, { useState } from 'react';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

const Chercher = () => {
  const [pointDepart, setPointDepart] = useState('');
  const [pointArrivee, setPointArrivee] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Traitement des données de recherche ici
    console.log('Point de départ:', pointDepart);
    console.log('Point d\'arrivée:', pointArrivee);
    console.log('Date:', date);
  };

  return (
    <div className='chercher'>
      <Form inline onSubmit={handleSubmit}>
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
          <input type="submit" />
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default Chercher;
