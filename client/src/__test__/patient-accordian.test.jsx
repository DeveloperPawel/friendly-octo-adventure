import { render, screen } from "@testing-library/react";
import { PatientAccordian } from "../../components/provider-patient-accordian";
import "@testing-library/jest-dom";

test('renders all of the patients', () => {
    render(<PatientAccordian patients={} />);

});

test('title indicates the status of the patients orders', () => {
    render(<PatientAccordian />);

});