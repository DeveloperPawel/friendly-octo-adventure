import { mount } from "patient/Patient";
import React, { useEffect, useRef } from "react";

export const PatientApp = ({ user }) => {
  const ref = useRef(null);

  useEffect(() => {
    mount(ref.current);
  }, []);

  return <div ref={ref} />;
};
