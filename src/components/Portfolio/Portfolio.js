import React from "react";
import arrow from "../../images/arrow-link.svg";
import './Portfolio.css';

function Portfolio() {
  return (
    <section className="portfolio">
      <h3 className="portfolio__title">Портфолио</h3>
      <div className="portfolio__projects">
        <a href="https://github.com/heyRene/how-to-learn" target="_blank" rel="noreferrer" className="portfolio__link">
          Статичный сайт
          <img
            src={arrow}
            className="portfolio__link-arrow"
            alt="стрелка черная"
          ></img>
        </a>
        <a href="https://github.com/heyRene/russian-travel" target="_blank" rel="noreferrer" className="portfolio__link">
          Адаптивный сайт
          <img
            src={arrow}
            className="portfolio__link-arrow"
            alt="стрелка черная"
          ></img>
        </a>
        <a href="https://github.com/heyRene/react-mesto-auth" target="_blank" rel="noreferrer" className="portfolio__link">
          Одностраничное приложение
          <img
            src={arrow}
            className="portfolio__link-arrow"
            alt="стрелка черная"
          ></img>
        </a>
      </div>
    </section>
  );
}

export default Portfolio;
