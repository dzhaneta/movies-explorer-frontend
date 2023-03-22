import React from "react";
import Section from "../Section/Section";

function AboutProject() {
    // functionality

    return (
        <Section
            name="project"
            title="О проекте"
        >
            
            <div className="project__infos">

                <div className="project__info">
                    <h3 className="project__subtitle">
                        Дипломный проект включал 5 этапов
                    </h3>
                    <p className="project__text">
                        Составление плана, работу над бэкендом, вёрстку, 
                        добавление функциональности и финальные доработки.
                    </p>
                </div>

                <div className="project__info">
                    <h3 className="project__subtitle">
                        На выполнение диплома ушло 5 недель
                    </h3>
                    <p className="project__text">
                        У каждого этапа был мягкий и жёсткий дедлайн, которые 
                        нужно было соблюдать, чтобы успешно защититься.
                    </p>
                </div>

            </div>

            <div className="project__timeline">

            </div>

        </Section>
    );

}

export default AboutProject;