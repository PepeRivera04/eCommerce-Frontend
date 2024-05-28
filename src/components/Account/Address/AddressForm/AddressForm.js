import { Form } from "semantic-ui-react";
import { useFormik } from "formik";
import { initialValues, validationSchema } from "./AddressForm.form";
import { Address } from "@/api";
import { useAuth } from "@/hooks";

const addressController = new Address();

export function AddressForm(props) {
  const { user } = useAuth();
  const { onClose, onReload, addressId, address } = props;

  // En el try catch compruebo si la direccion existe o no para hacer una accion u otra reultilizando el mismo modal
  const formik = useFormik({
    initialValues: initialValues(address),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        if (addressId) {
          await addressController.update(formValue, addressId);
        } else {
          await addressController.create(formValue, user.id);
        }
        formik.handleReset();
        onReload();
        onClose();
      } catch (error) {
        console.error(error);
      }
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Form.Input
        name="title"
        placeholder="Titulo de la dirección"
        value={formik.values.title}
        onChange={formik.handleChange}
        error={formik.errors.title}
      ></Form.Input>
      <Form.Group widths="equal">
        <Form.Input
          name="name"
          placeholder="Nombre y apellidos"
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.errors.name}
        ></Form.Input>
        <Form.Input
          name="address"
          placeholder="Dirección"
          value={formik.values.address}
          onChange={formik.handleChange}
          error={formik.errors.address}
        ></Form.Input>
      </Form.Group>
      <Form.Group widths="equal">
        <Form.Input
          name="state"
          placeholder="Provincia"
          value={formik.values.state}
          onChange={formik.handleChange}
          error={formik.errors.state}
        ></Form.Input>
        <Form.Input
          name="city"
          placeholder="Ciudad"
          value={formik.values.city}
          onChange={formik.handleChange}
          error={formik.errors.city}
        ></Form.Input>
      </Form.Group>
      <Form.Group widths="equal">
        <Form.Input
          name="postal_code"
          placeholder="Código Postal"
          value={formik.values.postal_code}
          onChange={formik.handleChange}
          error={formik.errors.postal_code}
        ></Form.Input>
        <Form.Input
          name="phone"
          placeholder="Teléfono"
          value={formik.values.phone}
          onChange={formik.handleChange}
          error={formik.errors.phone}
        ></Form.Input>
      </Form.Group>
      <Form.Button type="submit" loading={formik.isSubmitting} fluid>
        Enviar
      </Form.Button>
    </Form>
  );
}
