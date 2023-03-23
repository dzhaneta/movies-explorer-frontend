import React from "react";
import Section from "../Section/Section";

function Student() {
    // functionality

    return (
        <Section
            name="student"
            title="Студент"
        >
            {/* <AboutMe /> */}
            
            <div className="portfolio">
                <h3 className="portfolio__title">Портфолио</h3>
                <ul className="portfolio__links">
                    <li className="portfolio__link">
                        <a
                            href="https://github.com/dzhaneta/how-to-learn"
                            className="portfolio__text"
                            target="_blank"
                            rel="noreferrer">
                            Статичный сайт
                            <p className="portfolio__link_logo">↗</p>
                        </a>
                    </li>
                    <li className="portfolio__link">
                        <a
                            href="https://github.com/dzhaneta/russian-travel"
                            className="portfolio__text"
                            target="_blank"
                            rel="noreferrer">
                            Адаптивный сайт
                            <p className="portfolio__link_logo">↗</p>
                        </a>
                    </li>
                    <li className="portfolio__link">
                        <a
                            href="https://github.com/dzhaneta/react-mesto-api-full"
                            className="portfolio__text"
                            target="_blank"
                            rel="noreferrer">
                            Одностраничное приложение
                            <p className="portfolio__link_logo">↗</p>
                        </a>
                    </li>
                </ul>
            </div>

        </Section>
    );

}

export default Student;