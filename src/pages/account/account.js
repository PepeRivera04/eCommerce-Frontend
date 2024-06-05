import { BasicLayout } from "@/layouts";
import { useState } from "react";
import { useRouter } from "next/router";
import {
  Info,
  Settings,
  Address,
  Wishlist,
  Orders,
} from "@/components/Account";
import { Tab } from "semantic-ui-react";
import styles from "./account.module.scss";
import { useAuth } from "@/hooks";
import { Separator } from "@/components/Shared";

export default function Account() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const [reload, setReload] = useState(false);

  if (!user) {
    router.push("/");
    return null;
  }

  const onReload = () => setReload((prevState) => !prevState);

  // Cada una de las opciones de menú que se ve dentro del apartado de "Mi Cuenta"
  const panes = [
    {
      menuItem: "Mis pedidos",
      render: () => (
        <Tab.Pane attached={false}>
          <Orders></Orders>
          <Separator height={80}></Separator>
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Lista de deseos",
      render: () => (
        <Tab.Pane attached={false}>
          <Wishlist></Wishlist>
          <Separator height={80}></Separator>
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Direcciones",
      render: () => (
        <Tab.Pane attached={false}>
          <Address.AddAddress onReload={onReload}></Address.AddAddress>
          <Address.ListAddresses
            reload={reload}
            onReload={onReload}
          ></Address.ListAddresses>
          <Separator height={80}></Separator>
        </Tab.Pane>
      ),
    },
    {
      menuItem: { key: 20, icon: "settings", content: "Ajustes" },
      render: () => (
        <Tab.Pane attached={false}>
          <Settings.ChangeNameForm></Settings.ChangeNameForm>
          <div className={styles.containerForms}>
            <Settings.ChangeEmailForm></Settings.ChangeEmailForm>
            <Settings.ChangePasswordForm></Settings.ChangePasswordForm>
          </div>
          <Separator height={80}></Separator>
        </Tab.Pane>
      ),
    },
    {
      menuItem: {
        key: 21,
        icon: "log out",
        content: "",
        onClick: logout,
      },
    },
  ];

  return (
    <>
      <BasicLayout isContainer relative>
        <Info />

        <Tab
          menu={{ secondary: true, pointing: true }}
          panes={panes}
          className={styles.tab}
        ></Tab>
      </BasicLayout>
    </>
  );
}
