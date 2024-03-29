import React from "react";
import './Techs.css';

function Techs() {
  return (
    <section className="techs">
      <h3 className="techs__title">Технологии</h3>
      <div className="techs__description">
        <h2 className="techs__description-title">7 технологий</h2>
        <p className="techs__caption">
          На курсе веб-разработки мы освоили технологии, которые применили в
          дипломном проекте.
        </p>
        <ul className="techs__list">
            <li className="techs__item">HTML</li>
            <li className="techs__item">CSS</li>
            <li className="techs__item">JS</li>
            <li className="techs__item">React</li>
            <li className="techs__item">Git</li>
            <li className="techs__item">Express.js</li>
            <li className="techs__item">mongoDB</li>
        </ul>
      </div>
    </section>
  );
}

export default Techs;
