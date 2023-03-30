import React from "react";
import studentPicPath from "../../images/pic_student.png";

function AboutMe() {
    // functionality

    return (
        <div className="about-me">

            <img 
                src={studentPicPath} 
                alt="фото студента" 
                className="about-me__pic about-me__pic_vertical" 
            />

            <div className="about-me__info">

                <h3 className="about-me__title">Виталий</h3>

                <h4 className="about-me__subtitle">
                    Фронтенд-разработчик, 30 лет
                </h4>

                <p className="about-me__text">
                    Я родился и живу в Саратове, закончил факультет 
                    экономики СГУ. У меня есть жена и дочь. Я люблю слушать 
                    музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 
                    2015 года работал в компании «СКБ Контур». После того, 
                    как прошёл курс по веб-разработке, начал заниматься 
                    фриланс-заказами и ушёл с постоянной работы.
                </p>

                <a 
                    href="https://github.com/dzhaneta" 
                    className="about-me__link about-me__link"
                    target="_blank"
                    rel="noreferrer"
                >
                    GitHub
                </a>

            </div>

        </div>
);

}

export default AboutMe;