import React from "react";
import { useLocation } from "react-router-dom";


function Footer() {
    
    const location = useLocation();

    return (
        <footer 
            className={`
                footer 
                ${location.pathname === "/" && 'footer_colored'}
            `}
        >

            <p className="footer__title">
                Учебный проект Яндекс.Практикум х BeatFilm.
            </p>

            <div className="footer__divider"></div>

            <div className="footer__wrapper">

                <p className="footer__copyright">&copy; 2022</p>

                <ul className="footer__links">

                    <li className="footer__link">
                        <a 
                            href="https://practicum.yandex.ru" 
                            className="footer__link_text"
                            target="_blank"
                            rel="noreferrer"
                        >
                            Яндекс.Практикум
                        </a>
                    </li>

                    <li className="footer__link">
                        <a 
                            href="https://github.com" 
                            className="footer__link_text"
                            target="_blank"
                            rel="noreferrer"
                        >
                            Github
                        </a>
                    </li>

                </ul>

            </div>
        </footer>
    );

}

export default Footer;