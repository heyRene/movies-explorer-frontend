import React from "react";
import './AboutProject.css';

function Promo() {
  return (
    <section className="about">
      <h3 className="about__title">О проекте</h3>
      <div className="about__tab">
        <div className="about__description">
          <h3 className="about__description-title">
            Дипломный проект включал 5 этапов
          </h3>
          <p className="about__caption">
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </p>
        </div>
        <div className="about__description">
          <h3 className="about__description-title">
            На выполнение диплома ушло 5 недель
          </h3>
          <p className="about__caption">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.
          </p>
        </div>
      </div>
      <div className="about__duration">
          <p className="about__time-line about__time-line_type_dark">1 неделя</p>
          <p className="about__time-line about__time-line_type_light">4 недели</p>
          <p className="about__tech">Back-end</p>
          <p className="about__tech">Front-end</p>
      </div>
    </section>
  );
}

export default Promo;
