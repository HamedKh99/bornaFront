import 'semantic-ui-css/semantic.min.css';
import Layout from '../components/global/layout'
import App from "next/app";
import Head from 'next/head';
import React from "react";

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return(
      <Layout>
        <Head>
          <title>موسسه مطالعات تربیتی برنا</title>
        </Head>
        <Component {...pageProps} />
      </Layout>
    );
  }
}

export default MyApp