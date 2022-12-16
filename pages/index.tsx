import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Kit from "../components/Kit";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Drawing Tool</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Kit />
    </div>
  );
};

export default Home;
