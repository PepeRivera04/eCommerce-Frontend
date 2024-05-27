import * as Yup from "yup";

// LIBRERIA YUP PARA VALIDACIÓN DE LOS CAMPOS DEL FORMULARIO

// FUNCIÓN QUE CREA LOS VALORES INICIALES QUE VA A CONTENER EL FORMULARIO
export function initialValues() {
  return {
    email: "",
    username: "",
    name: "",
    password: "",
  };
}

// FUNCIÓN QUE COMRPUEBA LOS CAMPOS DEL FORMULARIO
export function validationSchema() {
  return Yup.object({
    email: Yup.string().email(true).required(),
    username: Yup.string().required(true),
    name: Yup.string().required(true),
    password: Yup.string().required(true),
  });
}
