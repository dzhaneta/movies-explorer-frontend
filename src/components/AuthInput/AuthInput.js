import React from 'react';

function AuthInput({
    label,
    value,
    name,
    type,
    pattern,
    minLength,
    maxLength,
    placeholder,
    onChange,
    errorMessage,
  }) {
    

    return (
        
        <label className='input'>
            {label}
            <input
                required
                type={type}
                value={value}
                name={name}
                pattern={pattern}
                minLength={minLength}
                maxLength={maxLength}
                placeholder={placeholder}
                onChange={onChange}
                className={`
                    input__container 
                    ${errorMessage ? 'input__container_error' : ''}
                `}
            />

            <span className={`input__error input__error_type_${name}`}>
                {errorMessage}
            </span>

        </label>

    );
}

export default AuthInput;