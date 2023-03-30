function FilterCheckbox({ checked, onChange }) {
    return (
        <div className="filter-checkbox">
            
            <input
                className="filter-checkbox__switch"
                type="checkbox"
                value={checked}
                onChange={onChange}
            />

            <div className="filter-checkbox__label">
                Короткометражки
            </div>

        </div>
    );
}

export default FilterCheckbox;
