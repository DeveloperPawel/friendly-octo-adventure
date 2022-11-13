import { mount } from "auth/Auth";
import React, { useEffect, useRef } from "react";

export const AuthApp = ({ onSignIn }) => {
  const ref = useRef(null);

  useEffect(() => {
    console.log("auth component exists: ", !!onSignIn);
    mount(ref.current);
  }, []);

  return <div ref={ref} />;
};
