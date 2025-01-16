// Code inspired from https://devdreaming.com/blogs/react-form-validation-custom-hook

import { useState } from "react";


export default function useForm() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});

  function validateInput(e, name, value) {
    const lowerCase = /[a-z]/g;
    const upperCase = /[A-Z]/g;
    const numbers = /[0-9]/g;
    const specialChars = /[!@#$%^&*()_+={}\[\]:;"'<>,.?/\\|`~\-]/g;

    switch(name) {
      case 'username':
        if(value.length <= 4) {
          setErrors({
            ...errors,
            username: 'Username must be at least 4 letters'
          })
        } else if (specialChars.test(value)) {
          setErrors({
            ...errors,
            username: 'Username can not have special characters'
          })
        } else {
          let newErrorObj = errors;
          delete newErrorObj.username;
          setErrors(newErrorObj);
        }
        break;
      
      case 'email': 
        if(value.length <= 4) {
          setErrors({
            ...errors,
            email: 'Email must be at least 5 characters'
          })
        } else if (!new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/).test(value)) {
          setErrors({
            ...errors,
            email: 'Email must be in correct format'
          })
        } else {
          let newErrorObj = errors;
          delete newErrorObj.email;
          setErrors(newErrorObj);
        }
        break;

        case 'password': 

        if (value.length <= 6) {
          setErrors({
            ...errors,
            password: 'Password must be at least 6 characters'
          })
        } else if (!value.match(lowerCase)) {
          setErrors({
            ...errors,
            password: 'Password must contain lowercase letter'
          })
        } else if (!value.match(upperCase)) {
          setErrors({
            ...errors,
            password: 'Password must contain uppercase letter'
          })
        } else if (!value.match(numbers)) {
          setErrors({
            ...errors,
            password: 'Password must contain a number'
          })
        } else if (!specialChars.test(value)) {
          setErrors({
            ...errors,
            password: 'Password must contain a special character'
          })
        } else {
          let newErrorObj = errors;
          delete newErrorObj.password;
          setErrors(newErrorObj);
        }
        break;
      
      case 'confirmPassword':
        if (value !== values.password) {
          setErrors({
            ...errors,
            confirmPassword: 'Passwords do not match'
          })
        } else {
          let newErrorObj = errors;
          delete newErrorObj.confirmPassword;
          setErrors(newErrorObj);
        }
        break;

      default:
        break;
    }
  }

  function handleChange(e) {
    //To stop default events
    e.persist();
    let name = e.target.name;
    let val = e.target.value;

    validateInput(e, name, val)

    //Let's set these values in state
    setValues({
        ...values,
        [name]:val,
    })
  }

  return {
      values,
      errors,
      handleChange,
  }
}