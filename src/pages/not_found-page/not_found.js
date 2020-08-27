import React from "react";
import { Link } from "react-router-dom";
import "./not_found-Style.css";

const NotFound = () => {
  return (
    <div className="not_found-page">
      <div className="not_found-container">
        <h1>404</h1>
        <h2>Esta pagina no existe</h2>
        <p>Lo sentimos, la pagina solicitada no existe</p>
        <a href="/loginpage" className="not_found-container__button">
          <div>Atrás</div>
        </a>
      </div>
    </div>
  );
};

export default NotFound;
