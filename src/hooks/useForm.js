import { useEffect, useMemo, useState } from "react";

export const useForm = (initialForm = {}, formValidations = {}) => {
  // creamos un estado inicial del formulario
  const [formState, setFormState] = useState(initialForm);
  // creamos un estado para realizar las distintas validaciones del formulario
  const [formValidation, setFormValidation] = useState({});

  // cada vez que cambia el estado del formulario volvemos a genera una nueva validacion
  useEffect(() => {
    createValidators();
  }, [formState]);

  // cada vez que cambia el formulario que estamos recbiendo cambiamos los valores en el estado del formulario
  useEffect(() => {
    setFormState(initialForm);
  }, [initialForm]);

  // creamos una funcion que devuelve si el formulario es valido o no
  const isFormValid = useMemo(() => {
    for (const formValue of Object.keys(formValidation)) {
      if (formValidation[formValue] !== null) return false;
    }

    return true;
  }, [formValidation]);

  // funcion para cambiar el valor de un input
  const onInputChange = ({ target }) => {
    const { name, value } = target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // funcion para restablecer el formulario
  const onResetForm = () => {
    setFormState(initialForm);
  };

  // creamos una funcion que crea las validaciones del formulario
  const createValidators = () => {
    const formCheckedValues = {};

    for (const formField of Object.keys(formValidations)) {
      const [fn, errorMessage] = formValidations[formField];

      formCheckedValues[`${formField}Valid`] = fn(formState[formField])
        ? null
        : errorMessage;
    }

    setFormValidation(formCheckedValues);
  };

  // hacemos el retorno de las properties del hook
  return {
    ...formState,
    formState,
    onInputChange,
    onResetForm,
    ...formValidation,
    isFormValid,
  };
};
