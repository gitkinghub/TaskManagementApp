import { useState } from "react";

const FormHandler = (callback, validate) => {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate(values);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      callback(values); // Call the callback function with the form values
    } else {
      console.log("Form has errors:", validationErrors);
    }
  };

  const setValue = (name, value) => {
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value
    }));
  };

  return {
    handleChange,
    handleSubmit,
    setValue,
    values,
    errors
  };
};

export default FormHandler;
