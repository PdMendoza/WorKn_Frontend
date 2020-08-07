import React from "react";
import { Link } from "react-router-dom";
import "./Footer-Style.css";
import Icon from "./Icon.jsx";

const Footer = () => {
  return (
    <div className="Footer">
      <div className="right-foot">
        <div className="up-text">
          Email:
          <a href="mailto:workninfo@gmail.com">workninfo@gmail.com</a>
        </div>
        <div className="down-text">
          <Link className="utobj" target="_blank" to="/Terms">
            Terms of Service.
          </Link>
          <Link className="utobj" target="_blank" to="/Privacy">
            Privacy Policy.
          </Link>
          <div className="Rights">
            &copy;{new Date().getFullYear()} All rights reserved.
          </div>
        </div>
      </div>
      <div className="left-foot">
        <div className="up-content">
          <div className="flogo">
            <Link to="/">
              <img src="https://imgur.com/21FKDzL.png" alt="workn-logo" />
            </Link>
          </div>
          <div className="fnavbar">
            <Link className="fobj" target="_blank" to="/Ofertas">
              Ofertas
            </Link>
            <Link className="fobj" target="_blank" to="/Exploracion">
              Exploración
            </Link>
            <Link className="fobj" target="_blank" to="/Resumen">
              Resumen
            </Link>
            <Link className="fobj" target="_blank" to="/Mensajeria">
              Mensajería
            </Link>
          </div>
        </div>
        <div className="middle-content">
          <div>
            <Icon
              path={"https://www.facebook.com/WorKn"}
              media={"XL6Cvrz.png"}
            />
          </div>
          <div>
            <Icon path={"https://twitter.com/WorKn"} media={"3mO0prt.png"} />
          </div>
          <div>
            <Icon
              path={"https://www.instagram.com/WorKn/"}
              media={"uxM8asb.png"}
            />
          </div>
        </div>
        <div className="down-content">
          <span>Desarrollado en la Republica Dominicana, SD</span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
