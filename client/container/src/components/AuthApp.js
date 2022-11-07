import { mount } from "auth/Auth";
import React, { useEffect, useRef } from "react";

export const AuthApp = () => {
  const ref = useRef(null);

  useEffect(() => {
    mount(ref.current);
  }, []);

  return <div ref={ref} />;
};
