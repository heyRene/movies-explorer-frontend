import { useState, useCallback } from "react";
import { PATTERN_EMAIL } from "./constants";

export function useFormValidation() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: e.target.validationMessage });
    setIsValid(e.target.closest("form").checkValidity());
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  return {
    values,
    handleChange,
    errors,
    isValid,
    resetForm,
    setValues,
    setIsValid,
  };
}

export function validateEmail(email) {
  if (email !== undefined) {
    if (email.length === 0) {
      return { invalid: true, message: "Поле не должно быть пустым" };
    } else if (!PATTERN_EMAIL.test(email.toLowerCase())) {
      return { invalid: true, message: "Неверный формат почты" };
    } else if (PATTERN_EMAIL.test(email.toLowerCase())) {
      return { invalid: false, message: "" };
    }
  } else {
    return { invalid: true, message: "" };
  }
}
