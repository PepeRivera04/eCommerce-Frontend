import { AuthProvider } from "@/context";
import "semantic-ui-css/semantic.min.css";
import "@/scss/global.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function App(props) {
  const { Component, pageProps } = props;

  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}
