import { useState } from 'react';
import iconLoupePath from '../../images/icon_loupe.svg'
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import { useFormWithValidation } from '../../utils/useFormWithValidation';


function SearchForm({
    searchInput,
    filter,
    setFilter,
    onSubmit,
}) {
    
    const [isChecked, setIsChecked] = useState(filter);
    const { values, errors, handleChange, isValid } = useFormWithValidation();

    function handleInputChange(e) {
        handleChange(e);
    }

    function handleCheckboxChange(e) {
        setIsChecked(!isChecked);
        setFilter(isChecked);
    }
    
    function handleSubmit(e) {
        
        e.preventDefault();
        let request = values.request;
        onSubmit({request, isChecked})
    }

    return (
        <form 
            onSubmit={handleSubmit}
            noValidate
            className="search-form"
        >

            <fieldset className="search-form__search">

                <input
                    onChange={handleInputChange}
                    value={values.request || searchInput || ''}
                    required
                    name="request"
                    type="text"
                    placeholder="Фильм"
                    className="search-form__input"
                />
                
                <span className="profile__input-error">
                    {errors.request && 'Нужно ввести ключевое слово'}
                </span>

                <button 
                    type='submit'
                    className="search-form__button"
                    disabled={!isValid}
                >
                    <img src={iconLoupePath} alt="search_icon" />
                </button>

            </fieldset>

            <fieldset className="search-form__filter">
                <FilterCheckbox 
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                />
            </fieldset>

        </form>
    ); 
}

export default SearchForm;
