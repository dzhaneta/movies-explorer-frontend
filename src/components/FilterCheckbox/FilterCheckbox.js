function FilterCheckbox({ checked, onChange }) {
    return (
        <div className="filter-checkbox">
            <div className="filter-checkbox__label">
                Короткометражки
            </div>
            <input
                className="filter-checkbox__switch"
                type="checkbox"
                value={checked}
                onChange={onChange}
            />
        </div>
    );
}

export default FilterCheckbox;
