import { ValidationError } from 'yup';

// A parte do lado esquerdo pode ser qualquer coisa
// e a parte do lado direito também, desde que ambas sejam strings
interface Errors {
    [key: string]: string;
}

export default function getValidationErrors(err: ValidationError): Errors {
    const validationErrors: Errors = {};
    
    err.inner.forEach(error => {
        validationErrors[error.path] = error.message;
    });

    return validationErrors;
}