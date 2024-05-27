import { Token } from "@/api";

// FETCHEO A LA API DE STRAPI PERO AUTENTICANDO CON UNO DE LOS USUARIOS
export async function authFetch(url, params) {
  const tokenController = new Token();
  const token = tokenController.getToken();

  //   FUNCION QUE ELIMINA EL TOKEN DEL LS
  const logout = () => {
    tokenController.removeToken();
    window.location.replace("/");
  };

  //   COMPROBACIÓN SOBRE EL TOKEN (FECHA, ...)
  if (!token) {
    logout();
  } else {
    if (tokenController.hasExpired(token)) {
      logout();
    } else {
      const paramsTemp = {
        ...params,
        headers: {
          ...params?.headers,
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        return await fetch(url, paramsTemp);
      } catch (error) {
        return error;
      }
    }
  }
}
