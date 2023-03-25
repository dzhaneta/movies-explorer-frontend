import React from 'react';

function AuthInput({
    label,
    value,
    name,
    type,
    onChange,
    errorMessage,
  }) {
    

    return (
        
        <label className='input'>
            {label}
            <input
                type={type}
                value={value}
                name={name}
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