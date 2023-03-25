import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
    // functionality

    return (
        <main className="not-found">
                <h2 className="not-found__title">
                    404
                    <p className="not-found__subtitle">
                        Страница не найдена
                    </p>
                </h2>

                <Link
                     to="/signin"
                            className="not-found__link"
                        >
                            Назад
                        </Link>
            
        </main>
);

}

export default NotFound;