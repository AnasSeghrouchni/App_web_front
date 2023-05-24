import React from 'react';
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';

const Footer = () => {
    return (
        <div className='footer'>
           
    <MDBFooter bgColor='light' className='text-center text-lg-start text-muted'>
      <section className=''>
        <MDBContainer className='text-center text-md-start mt-5'>
          <MDBRow className='mt-3'>
            <MDBCol md="3" lg="4" xl="5" className='mx-auto mb-auto mt-auto'>
              <h6 className='text-uppercase fw-bold mb-4'>
                <MDBIcon icon="gem" className="me-3" />
                ColiVoiturage
              </h6>
              <p>
                Vous en avez marre de péter je sais pas où pour aller chercher vos colis ? 
                N&apos;attendez plus et rejoignez-nous ! 
                Vos colis se feront livrés par des particuliers, et vous pourrez vous-même livrer les colis des autres utilisateurs. 
                En plus, notre planète a bien besoin de ça...
              </p>
            </MDBCol>

            <MDBCol md="4" lg="3" xl="3" className='mx-auto mb-md-0 mb-3 mt-3'>
              <h6 className='text-uppercase fw-bold mb-4'>Contact</h6>
              <p>
                <MDBIcon icon="home" className="me-3" />
                ENSEEIHT, Toulouse, France
              </p>
              <p>
                <MDBIcon icon="envelope" className="me-3" />
                contact@colivoiturage.com
              </p>
              <p>
                <MDBIcon icon="phone" className="me-3" /> +33 6 52 95 29 19
              </p>
              <p>
                <MDBIcon icon="print" className="me-3" /> +33 7 82 58 56 59
              </p>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>

      <div className='text-center p-2' style={{ backgroundColor: 'rgba(0, 0, 0, 0.02)' }}>
        Copyright &copy;2023 :&nbsp;
        <a className='text-reset fw-bold' href='localhost:3000'>
          ColiVoiturage
        </a>
      </div>
    </MDBFooter>
        </div>
    );
};

export default Footer;