import React from "react";

function Section(props) {
    // functionality

    return (
        <section className={`section ${props.name}`}>
            <h2 className="section__title">{props.title}</h2>
            <div className="section__divider"></div>
            <div className={`section__content ${props.name}__content`}>
                {props.children}
            </div>
        </section>
    );

}

export default Section;