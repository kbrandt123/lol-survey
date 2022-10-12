import Card from "../components/Card";
import "../styles/global.css";
function MyApp({ Component, pageProps }) {
  return (
    <Card>
      <Component {...pageProps} />
    </Card>
  );
}

export default MyApp;
