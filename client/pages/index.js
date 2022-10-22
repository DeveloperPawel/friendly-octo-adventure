import React from "react";

const Index = ({ user }) => {
  return user ? (
    <h1>You are signed in as {user.role}</h1>
  ) : (
    <h1>You are signed out</h1>
  );
};

Index.getInitialProps = async (context, client, user) => {
  return { user };
};

export default Index;
