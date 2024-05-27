import { useState, useEffect, createContext } from "react";
import { Token, User } from "@/api";

// CLASES CREADAS CON METODOS PERSONALIZADOS
const tokenCtrl = new Token();
const userCtrl = new User();

export const AuthContext = createContext();

export function AuthProvider(props) {
  const { children } = props;

  //   DATOS DEL USUARIO EN ESTADOS PARA PODER ACTUALIZARLOS
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  //   USO UNA FUNCIÓN AUTOEJECUTABLE DENTRO DEL USEEFFECT QUE CONTROLA EL TOKEN
  useEffect(() => {
    (async () => {
      const token = tokenCtrl.getToken();

      if (!token) {
        logout();
        setLoading(false);
        return;
      }

      if (tokenCtrl.hasExpired(token)) {
        logout();
      } else {
        await login(token);
      }
    })();
  }, []);

  //   FUNCIÓN QUE GUARDA LOS DATOS DEL USUARIO PARA HACER EL LOGIN
  const login = async (token) => {
    try {
      tokenCtrl.setToken(token);
      const response = await userCtrl.getMe();
      setUser(response);
      setToken(token);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  //   FUNCIÓN QUE DESLOGGEA
  const logout = () => {
    tokenCtrl.removeToken();
    setToken(null);
    setUser(null);
  };

  const updateUser = (key, value) => {
    setUser({
      ...user,
      [key]: value,
    });
  };

  const data = {
    accessToken: token,
    user,
    login,
    logout,
    updateUser: null,
  };

  if (loading) return null;

  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
}
