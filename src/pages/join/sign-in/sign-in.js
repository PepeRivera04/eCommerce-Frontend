import { JoinLayout } from "@/layouts";
import Link from "next/link";
import styles from "./sign-in.module.scss";
import { LoginForm } from "@/components/Auth/LoginForm";

export default function SignInPage() {
  return (
    <>
      <JoinLayout>
        <div className={styles.signIn}>
          <h3>Iniciar sesión</h3>

          {/* LOGIN FORMULARIO */}

          <LoginForm></LoginForm>

          <div className={styles.actions}>
            <Link href="/join/sign-up">¿No tienes una cuenta?</Link>
          </div>
        </div>
      </JoinLayout>
    </>
  );
}
