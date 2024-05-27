import { Form } from "semantic-ui-react";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { initialValues, validationSchema } from "./RegisterForm.form";
import { Auth } from "@/api";

const authControl = new Auth();

// VALIDACIÓN DEL FORMULARIO USANDO LA LIBRERÍA FORMIK
export function RegisterForm() {
  const router = useRouter();

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        await authControl.register(formValue);
        router.push("/join/sign-in");
      } catch (error) {
        console.error(error);
      }
    },
  });

  //   FORMULARIO DE REGISTRO
  return (
    <Form onSubmit={formik.handleSubmit}>
      {/* GRUPO DE EMAIL Y USERNAME */}
      <Form.Group widths="equal">
        <Form.Input
          name="email"
          type="text"
          placeholder="Correo electrónico"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.errors.email}
        ></Form.Input>
        <Form.Input
          name="username"
          type="text"
          placeholder="Nombre de usuario"
          value={formik.values.username}
          onChange={formik.handleChange}
          error={formik.errors.username}
        ></Form.Input>
      </Form.Group>

      {/* GRUPO DE NOMBRE COMPLETO Y CONTRASEÑA */}
      <Form.Group widths="equal">
        <Form.Input
          name="name"
          type="text"
          placeholder="Nombre y apellidos"
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.errors.name}
        ></Form.Input>
        <Form.Input
          name="password"
          type="password"
          placeholder="Contraseña"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.errors.password}
        ></Form.Input>
      </Form.Group>

      {/* BOTÓN DE CONFIRMACION */}
      <Form.Button type="submit" fluid loading={formik.isSubmitting}>
        Registrarse
      </Form.Button>
    </Form>
  );
}
