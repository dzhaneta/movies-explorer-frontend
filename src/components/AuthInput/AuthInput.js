import React from 'react';

function AuthInput({
    label,
    value,
    name,
    placeholder,
    type,
    pattern,
    minLength,
    maxLength,
    onChange,
    errorMessage,
  }) {
    

    return (
        
        <label className='input'>
            {label}
            <input
                name={name}
                value={value}
                type={type}
                placeholder={placeholder}
                pattern={pattern}
                minLength={minLength}
                maxLength={maxLength}
                required
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