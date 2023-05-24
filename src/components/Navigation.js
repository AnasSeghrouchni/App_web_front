import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import Logo from './Logo';

const Navigation = () => {
  const [stickyClass, setStickyClass] = useState('');

  useEffect(() => {
    const stickNavbar = () => {
      const windowHeight = window.scrollY;
      windowHeight > 0 ? setStickyClass('sticky') : setStickyClass('');
    };

    window.addEventListener('scroll', stickNavbar);
    return () => {
      window.removeEventListener('scroll', stickNavbar);
    };
  }, []);

  return (
    <div className={`navigation ${stickyClass}`}>
      <Logo />
      <ul className='nav_gauche'>
        <NavLink to='/' activeclassname='nav-active' className={(nav) => (nav.isActive ? "nav-active" : "")}>
          <li>Accueil</li>
        </NavLink>
        <NavLink to='/livrer-colis' activeclassname='nav-active' className={(nav) => (nav.isActive ? "nav-active" : "")}>
          <li>Livrer un colis</li>
        </NavLink>
        <NavLink to='/proposer-livraison' activeclassname='nav-active' className={(nav) => (nav.isActive ? "nav-active" : "")}>
          <li>Proposer une livraison</li>
        </NavLink>
        
        <NavLink to='/connexion' activeclassname='nav-active' className={(nav) => (nav.isActive ? "nav-active" : "")}>
          <li>Connexion</li>
        </NavLink>
        <NavLink to='/inscription' activeclassname='nav-active' className={(nav) => (nav.isActive ? "nav-active" : "")}>
          <li>Inscription</li>
        </NavLink>
      </ul>
    </div>
  );
};

export default Navigation;