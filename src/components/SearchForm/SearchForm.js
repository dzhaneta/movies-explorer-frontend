import { useState } from 'react';
import iconLoupePath from '../../images/icon_loupe.svg'
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm() {
    const [isChecked, setIsChecked] = useState(true);

    return <div className="search-form">
        <div className="search-form__input-wrap">
            <input
                type="search"
                placeholder="Фильм"
                className="search-form__input"
            />
            <button className="search-form__button">
                <img src={iconLoupePath} alt="search_icon" />
            </button>
        </div>
        <FilterCheckbox checked={isChecked} onChange={e => setIsChecked(e.target.value)} />
    </div>;
}

export default SearchForm;
