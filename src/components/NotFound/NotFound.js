import React from "react";
import { Link, useHistory } from "react-router-dom";

function NotFound() {
    
    const history = useHistory();

    function handleGoBack() {
        history.goBack();
    }

    return (
        <main className="not-found">
                <div className="not-found__wrap">
                    <h2 className="not-found__title">
                        404
                    </h2>

                    <p className="not-found__subtitle">
                        Страница не найдена
                    </p>
                </div>
                

                <Link
                    onClick={handleGoBack}
                    className="not-found__link"
                >
                    Назад
                </Link>
            
        </main>
);

}

export default NotFound;