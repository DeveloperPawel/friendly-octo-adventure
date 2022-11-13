import { mount } from "auth/Auth";
import React, { useEffect, useRef } from "react";

export const AuthApp = ({ onSignIn }) => {
  const ref = useRef(null);

  useEffect(() => {
    mount(ref.current, {
      onSignIn,
    });
  }, []);

  return <div ref={ref} />;
};
