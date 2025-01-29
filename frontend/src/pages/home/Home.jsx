import React from "react";
import { Link } from "react-router-dom";
import "bulma/css/bulma.min.css";
import "./home.css";

function Home() {
  return (
    <>
      <div className="background-home">
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

      
    </>
  );
}

export default Home;
