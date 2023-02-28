import React from "react";
import {DoctorUrls, routerElement} from "../siteUrls";

const PrescriptionCreate = React.lazy(() =>
    import("../../pages/Doctors/Prescriptions/PrescriptionCreate")
);
const PrescriptionList = React.lazy(() =>
    import("../../pages/Doctors/Prescriptions/PrescriptionList")
);
const DrugDatabase = React.lazy(() =>
    import("../../pages/Doctors/DrugDatabase")
);
const Appointments = React.lazy(() =>
    import("../../pages/Doctors/Appointments")
);
const Payments = React.lazy(() =>
    import("../../pages/Doctors/Payments")
);

const Print = React.lazy(() =>
    import("../../components/Doctors/Prescriptions/PrescriptionPrint")
);

const prescriptionRoutes = [
    routerElement(
        DoctorUrls.PRESCRIPTIONS.LIST,
        <PrescriptionList />,
        true
    ),
    routerElement(
        DoctorUrls.PRESCRIPTIONS.CREATE,
        <PrescriptionCreate />,
        true
    ),
    routerElement(
        DoctorUrls.DRUG_DATABASE,
        <DrugDatabase />,
        true
    ),
    routerElement(
        DoctorUrls.APPOINTMENTS,
        <Appointments />,
        true
    ),
    routerElement(
        DoctorUrls.PAYMENTS,
        <Payments />,
        true
    ),
    routerElement(
        DoctorUrls.PRESCRIPTIONS.PRINT,
        <Print />,
        true
    ),
];

export default prescriptionRoutes;
