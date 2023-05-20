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
        <NavLink to='/proposer-livraison' activeClassName='nav-active'>
          <li>Proposer une livraison</li>
        </NavLink>
        <NavLink to='/' activeClassName='nav-active' className={(nav) => (nav.isActive ? "nav-active" : "")}>
          <li>Acceuil</li>
        </NavLink>
        <NavLink to='/connexion' activeClassName='nav-active' className={(nav) => (nav.isActive ? "nav-active" : "")}>
          <li>Connexion</li>
        </NavLink>
        <NavLink to='/inscription' activeClassName='nav-active' className={(nav) => (nav.isActive ? "nav-active" : "")}>
          <li>Inscription</li>
        </NavLink>
      </ul>
    </div>
  );
};

export default Navigation;