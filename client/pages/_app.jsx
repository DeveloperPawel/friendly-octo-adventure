import React from "react";
import { Client } from "../functions/client";
import { Header } from "../components/header";
import "bootstrap/dist/css/bootstrap.css";

const AppComponent = ({ Component, pageProps, user }) => {
  console.log("user", user);
  return (
    <div>
      <Header />
      <div className="container">
        <Component {...pageProps} />
      </div>
    </div>
  );
};

AppComponent.getInitialProps = async (appContext) => {
  const client = Client(appContext.ctx);
  const { data } = await client.get("/api/auth/current");
  let pageProps = {};
  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(
      appContext.ctx,
      client,
      data.user
    );
  }

  return {
    pageProps,
    ...data,
  };
};

export default AppComponent;
