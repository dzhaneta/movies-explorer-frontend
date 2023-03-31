import { useState } from 'react';
import iconLoupePath from '../../images/icon_loupe.svg'
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import { useFormWithValidation } from '../../utils/useFormWithValidation';


function SearchForm({
    onSubmit,
    isSearchDisabled
}) {
    
    const [isChecked, setIsChecked] = useState(false);
    const { values, handleChange, isValid, setErrors } = useFormWithValidation();

    function handleInputChange(e) {
        handleChange(e);
        console.log(values.request);
    }
    
    function handleCheckboxChange(e) {
        setIsChecked(!isChecked);
        console.log(isChecked);
    }
    
    function handleSubmit(e) {
        
        e.preventDefault();
        console.log(values.request, isChecked);
        values.request
          ? onSubmit(values, isChecked)
          : setErrors('ошибка');
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
                    value={values.request || ''}
                    required
                    minLength="2"
                    name="request"
                    type="text"
                    placeholder="Фильм"
                    className="search-form__input"
                />

                <span className="profile__input-error">
                </span>

                <button 
                    type='submit'
                    className="search-form__button"
                    disabled={!isValid || isSearchDisabled}
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
