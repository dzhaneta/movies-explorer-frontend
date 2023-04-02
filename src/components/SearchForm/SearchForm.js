import iconLoupePath from '../../images/icon_loupe.svg'
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import { useFormWithValidation } from '../../utils/useFormWithValidation';


function SearchForm({
    initialState = {},
    isChecked,
    onCheckboxChange,
    onSubmit,
}) {

    const { values, errors, handleChange, isValid } = useFormWithValidation();

    function handleInputChange(e) {
        handleChange(e);
    }

    function handleCheckboxChange(e) {
        onCheckboxChange(!isChecked);
    }

    function handleSubmit(e) {
        e.preventDefault();
        onSubmit({ text: values.text, isChecked });
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
                    value={values.text || initialState.text || ''}
                    required
                    name="text"
                    type="text"
                    placeholder="Фильм"
                    className="search-form__input"
                />

                <span className="profile__input-error">
                    {errors.text && 'Нужно ввести ключевое слово'}
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