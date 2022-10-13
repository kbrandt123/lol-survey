import Card from "../components/Card";
import "../styles/global.css";
import "../styles/submission.css";
function MyApp({ Component, pageProps }) {
  return (
    <Card>
      <Component {...pageProps} />
    </Card>
  );
}

export default MyApp;
