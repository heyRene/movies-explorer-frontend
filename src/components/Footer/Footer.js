import React from "react";
import './Footer.css';

function Footer() {
  return (
    <section className="footer">
      <h4 className="footer__title">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </h4>
      <div className="footer__nav">
        <p className="footer__year">© 2023</p>
      <div className="footer__links">
          <a href="https://practicum.yandex.ru/" target="_blank" className="footer__link" rel="noreferrer">Яндекс.Практикум</a>
          <a href="https://github.com/heyRene" target="_blank" className="footer__link" rel="noreferrer">Github</a>
      </div>
      </div>
    </section>
  );
}

export default Footer;
