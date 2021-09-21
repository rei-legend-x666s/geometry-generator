import Head from "next/head";

interface CustomHead {
  title: string;
}

const CustomHead = ({ title }: CustomHead) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
};

export default CustomHead;
