import { mount } from "provider/Provider";
import React, { useEffect, useRef } from "react";

export const ProviderApp = () => {
  const ref = useRef(null);

  useEffect(() => {
    mount(ref.current);
  }, []);

  return <div ref={ref} />;
};
