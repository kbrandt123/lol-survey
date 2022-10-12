import Head from "next/head";
import Survey from "../components/Survey";
const home = () => {
  return (
    <>
      <Head>
        <title>League of Legends Survey</title>
      </Head>
      <Survey></Survey>
    </>
  );
};

export default home;
