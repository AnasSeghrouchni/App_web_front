import React from 'react';
import { Row, Col } from 'react-bootstrap';

const Logo = () => {
    return (
        <div className='custom-logo'>

            <img src='./logo.png' alt='logo' fluid className='logo-image' />

            <h2>ColisVoiturage</h2>

        </div>
    );
};

export default Logo;