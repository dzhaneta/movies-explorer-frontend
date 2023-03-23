import React from "react";
import Section from "../Section/Section";

function Techs() {
    // functionality

    return (
        <Section
            name="techs"
            title="Технологии"
        >
            <h2 className="techs__subtitle">7 технологий</h2>
            <p className="techs__text">
                На курсе веб-разработки мы освоили технологии, которые 
                применили в дипломном проекте.
            </p>
            <div className="stack">

                <div className="stack__item">
                    <p className="stack__item-text">
                        HTML
                    </p>
                </div>

                <div className="stack__item">
                    <p className="stack__item-text">
                        CSS
                    </p>
                </div>

                <div className="stack__item">
                    <p className="stack__item-text">
                        JS
                    </p>
                </div>

                <div className="stack__item">
                    <p className="stack__item-text">
                        React
                    </p>
                </div>

                <div className="stack__item">
                    <p className="stack__item-text">
                        Git
                    </p>
                </div>

                <div className="stack__item">
                    <p className="stack__item-text">
                        Express.js
                    </p>
                </div>

                <div className="stack__item">
                    <p className="stack__item-text">
                        mongoDB
                    </p>
                </div>

            </div>

        </Section>
    );

}

export default Techs;