import React, { useState } from "react";
import { Header } from "./components/Header";
import { PatientApp } from "./components/PatientApp";
import { ProviderApp } from "./components/ProviderApp";
import { AdminApp } from "./components/AdminApp";
import { AuthApp } from "./components/AuthApp";

export const App = () => {
  const [user, setUser] = useState(null);
  return (
    <div>
      <Header user={user} />
      <PatientApp />
      <ProviderApp />
      <AdminApp />
      <AuthApp />
    </div>
  );
};
