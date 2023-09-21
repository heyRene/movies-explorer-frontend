import React from "react";
import studentPhoto from "../../images/student-photo.jpg";
import './AboutMe.css';

function AboutMe() {
  return (
    <section className="about-me">
      <h3 className="about-me__title">Студент</h3>
      <div className="about-me__info">
        <div className="about-me__text">
          <h2 className="about-me__name">Рената</h2>
          <p className="about-me__caption">Фронтенд-разработчик, 21 год</p>
          <p className="about-me__description">
            Я родилась в Казани, в старшей школе переехала в Москву. Закончила
            школу с золотой медалью. Поступила в МИРЭА на "информатику и
            вычислительную технику". Подрабатываю репетитором по математике и
            информатике. Прошла курс Яндекс Практикума и сейчас ищу работу.
          </p>
          <ul className="about-me__contacts">
            <li><a className="about-me__link" href="https://github.com/heyRene" target="_blank" rel="noreferrer">Github</a></li>
            <li><a className="about-me__link" href="https://instagram.com/renetta.dq?igshid=MzRlODBiNWFlZA==" target="_blank" rel="noreferrer">Instagram</a></li>
          </ul>
        </div>
        <img
          src={studentPhoto}
          className="about-me__photo"
          alt="фотография"
        ></img>
      </div>
    </section>
  );
}

export default AboutMe;
