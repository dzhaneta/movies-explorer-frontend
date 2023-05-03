function ButtonSubmit({ isValid, submitButtonText}) {

    return (
        <button
          className={`
            submit-button 
            ${!isValid && 'submit-button_inactive'}
            `}
          type='submit'
          disabled={!isValid}
        >
          {submitButtonText}
        </button>
    );
}

export default ButtonSubmit;