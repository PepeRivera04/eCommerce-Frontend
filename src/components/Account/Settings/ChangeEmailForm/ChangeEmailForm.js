import styles from "./ChangeEmailForm.module.scss";
import { Form } from "semantic-ui-react";
import { useFormik } from "formik";
import { initialValues, validationSchema } from "./ChangeEmailForm.form";
import { User } from "@/api";
import { useAuth } from "@/hooks";

const userController = new User();

export function ChangeEmailForm() {
  const { user, updateUser } = useAuth();

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        await userController.updateMe(user.id, { email: formValue.email });
        updateUser("email", formValue.email);
        formik.handleReset();
      } catch (error) {
        console.error(error);
      }
    },
  });

  return (
    <Form className={styles.form} onSubmit={formik.handleSubmit}>
      <label>Cambiar correo electrónico</label>

      <Form.Input
        name="email"
        placeholder="Nuevo correo electrónico"
        value={formik.values.email}
        onChange={formik.handleChange}
        error={formik.errors.email}
      ></Form.Input>
      <Form.Input
        name="repeatEmail"
        placeholder="Repetir correo electrónico"
        value={formik.values.repeatEmail}
        onChange={formik.handleChange}
        error={formik.errors.repeatEmail}
      ></Form.Input>
      <Form.Button type="submit" loading={formik.isSubmitting}>
        Enviar
      </Form.Button>
    </Form>
  );
}
