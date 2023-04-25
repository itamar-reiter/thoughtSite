
import {useState, useCallback} from 'react';

export function useFormAndValidation() {
  const [ values, setValues ] = useState({});
  const [ errors, setErrors ] = useState({});
  const [ isValid, setIsValid ] = useState(true);

  const handleChange = (e) => {
    const {name, value} = e.target;
    setValues({...values, [name]: value });
    setErrors({...errors, [name]: e.target.validationMessage});
    setIsValid(e.target.closest('form').checkValidity());
  };



  const resetForm = useCallback((newValues = {}, newErrors = {}, newIsValid = false) => {
    console.log('reset');
    setValues(newValues);
    setErrors(newErrors);
    setIsValid(newIsValid);
  }, [setValues, setErrors, setIsValid]);

  return { values, handleChange, errors, isValid, resetForm, setValues, setIsValid };
}

/* 
  const {values, handleChange, errors, isValid, setValues, resetForm} = useFormAndValidation()
 */

  /* a shorter method only for custom form using
  export function useForm(inputValues) {
  const [values, setValues] = useState(inputValues);

  const handleChange = (event) => {
    const {value, name} = event.target;
    setValues({...values, [name]: value});
  };
  return {values, handleChange, setValues};
}

const {values, handleChange, setValues} = useForm({})
  */

