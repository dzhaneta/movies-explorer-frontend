import React from "react";
import { useHistory } from "react-router-dom";

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
                

                <button
                    onClick={handleGoBack}
                    className="not-found__link"
                >
                    Назад
                </button>
            
        </main>
);

}

export default NotFound;