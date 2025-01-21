import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className="background-image">
      <div className="screen-background">
        <h1>Projet Geek</h1>
      <a href="/api/users/login" className="button is-light">Se connecter</a>
      <a href="/api/users/create" className="button is-link">S'inscrire</a>
    </div>
    </div>
  );
}

export default Home;
