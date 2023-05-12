import { useState, useCallback } from "react";
import validator from 'validator';
import { messages } from "./constants";

//хук управления формой и валидации формы
export function useFormWithValidation(initialState = {}) {
    const [values, setValues] = useState({ ...initialState });
    const [errors, setErrors] = useState({});
    const [isValid, setIsValid] = useState(false);

    const handleChange = (event) => {
      const target = event.target;
      const name = target.name;
      const value = target.value;
      
      setValues({...values, [name]: value});
      setErrors({...errors, [name]: target.validationMessage });
      setIsValid(target.closest("form").checkValidity());

      if (name === 'email') {
        !validator.isEmail(value) && setErrors({...errors, [name]: messages.emailNotValid });
        setIsValid(false);
      }
    };

    const resetForm = useCallback(
      (newValues = { ...initialState }, newErrors = {}, newIsValid = false) => {
        setValues(newValues);
        setErrors(newErrors);
        setIsValid(newIsValid);
      },
      [setValues, setErrors, setIsValid, initialState]
    );

    return { values, handleChange, errors, isValid, setIsValid, resetForm, setValues, setErrors };
  }