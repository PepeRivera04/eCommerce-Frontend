import { ENV, authFetch } from "@/utils";

// FUNCIONALIDAD PARA OBTENER LOS DATOS DEL USUARIO HACIENDO FETCH A MI BD DE STRAPI
export class User {
  async getMe() {
    try {
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.USERS_ME}`;

      const response = await authFetch(url);
      const result = await response.json();

      if (response.status !== 200) return result;

      return result;
    } catch (error) {
      throw error;
    }
  }
}
 