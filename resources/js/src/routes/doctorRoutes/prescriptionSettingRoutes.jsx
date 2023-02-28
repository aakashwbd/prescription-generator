import React from "react";
import {DoctorUrls, routerElement} from "../siteUrls";

const HeaderEdit = React.lazy(() =>
    import("../../pages/Doctors/PrescriptionTemplates/HeaderEdit")
);

const SelectTemplate = React.lazy(() =>
    import("../../pages/Doctors/PrescriptionTemplates/SelectTemplate")
);
const PageSizeSetup = React.lazy(() =>
    import("../../pages/Doctors/PrescriptionTemplates/PageSizeSetup")
);
const PageOption = React.lazy(() =>
    import("../../pages/Doctors/PrescriptionTemplates/PageOption")
);
const PageSetting = React.lazy(() =>
    import("../../pages/Doctors/PrescriptionTemplates/PageSetting")
);

const prescriptionSettingRoutes = [
    routerElement(
        DoctorUrls.PRESCRIPTION_TEMPLATES.HEADER_EDIT,
        <HeaderEdit />,
        true
    ),
    routerElement(
        DoctorUrls.PRESCRIPTION_TEMPLATES.SELECT_TEMPLATE,
        <SelectTemplate />,
        true
    ),
    routerElement(
        DoctorUrls.PAGE_SETUPS.SETUP,
        <PageSizeSetup />,
        true
    ),
    routerElement(
        DoctorUrls.PAGE_SETUPS.OPTIONS,
        <PageOption />,
        true
    ),
    routerElement(
        DoctorUrls.PAGE_SETUPS.SETTINGS,
        <PageSetting />,
        true
    ),
];

export default prescriptionSettingRoutes;
