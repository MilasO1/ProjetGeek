import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "bulma/css/bulma.min.css";
import "./home.css";

function Home() {
  const [ads, setAds] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    fetch("/api/ads")
      .then((reponse) => reponse.json())
      .then((data) => setAds(data))
      .catch((error) =>
        console.error("Erreur lors du chargement des annonces", error)
      );
  }, []);

  const filteredAds = filter ? ads.filter((ad) => ad.type === filter) : ads;

  return (
    <div className="background-home">
      {/* Bannière d'accueil */}
      <section className="hero is-primary">
        <div className="hero-body">
          <p className="title">Bienvenue sur la plateforme des annonces</p>
          <p className="subtitle">Trouvez ou publiez vos annonces ici</p>
        </div>
      </section>

      {/* Barre de filtre*/}
      <div className="container mt-4">
        <div className="field">
          <label className="label">Filtrer par type</label>
          <div className="control">
            <div className="select">
              <select onChange={(e) => setFilter(e.target.value)}>
                <option value="">Tous</option>
                <option value="vente">Vente</option>
                <option value="don">Don</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Liste des annonces*/}
      <div className="container mt-4">
        <div className="columns is-multiline">
          {filteredAds.map((ad) => (
            <div className="column is-one-third" key={ad.id}>
              <div className="card">
                <div className="card-content">
                  <p className="title">{ad.title}</p>
                  <p className="subtitle">{ad.type}</p>
                  <p>{ad.description}</p>
                  <Link to={`/ads/ ${ad.id}`} className="button is-info mt-2">
                    Voir les détails
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bouton pour créer une annonce*/}
      <div className="container mt-4 has-text-centered">
        <Link to="/ads/create" className="button is success">
          Créer une annonce
        </Link>
      </div>
      <div>
        <button>
          <Link to="/login" className="button is-light">
            Se connecter
          </Link>
        </button>
        <button>
          <Link to="/register" className="button is-link">
            S'inscrire
          </Link>
        </button>
      </div>
    </div>
  );
}

export default Home;
