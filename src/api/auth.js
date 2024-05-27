import { ENV } from "@/utils";

// Funcionalidad para el registro del usuario dentro de la base de datos de strapi
export class Auth {
  async register(data) {
    try {
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.AUTH.REGISTER}`;
      const params = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };

      const response = await fetch(url, params);
      const result = await response.json();

      //   Comprobación del fetcheo
      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }

  // Funcionalidad de loggeo dentro de la aplicación y comprobando usuario en strapi
  async login(data) {
    try {
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.AUTH.LOGIN}`;
      const params = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };

      const response = await fetch(url, params);
      const result = await response.json();

      //   Comprobación del fetcheo
      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }
}
