import React from "react";
import Section from "../Section/Section";
import AboutMe from "../AboutMe/AboutMe";
import Portfolio from "../Portfolio/Portfolio";

function Student() {
    // functionality

    return (
        <Section
            name="student"
            title="Студент"
        >
            <AboutMe />
            
            <Portfolio />
            
        </Section>
    );

}

export default Student;