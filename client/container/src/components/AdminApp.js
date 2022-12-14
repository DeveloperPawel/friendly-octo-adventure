import { mount } from "admin/Admin";
import React, { useEffect, useRef } from "react";

export const AdminApp = ({ user }) => {
  const ref = useRef(null);

  useEffect(() => {
    mount(ref.current);
  }, []);

  return <div ref={ref} />;
};
