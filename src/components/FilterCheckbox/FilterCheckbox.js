function FilterCheckbox({ checked, onChange }) {
    
    return (
        <div className="filter-checkbox">
            
            <input
                name="filter"
                className="filter-checkbox__switch"
                type="checkbox"
                checked={checked}
                onChange={onChange}
            ></input>
            <label className="filter-checkbox__label">
                Короткометражки
            </label>

        </div>
    );
}

export default FilterCheckbox;
