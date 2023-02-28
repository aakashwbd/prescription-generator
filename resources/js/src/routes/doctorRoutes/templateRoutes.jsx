import React from "react";
import {DoctorUrls, routerElement} from "../siteUrls";

const DrugTemplate = React.lazy(() =>
    import("../../pages/Doctors/Templates/DrugTemplate")
);
const TreatmentTemplate = React.lazy(() =>
    import("../../pages/Doctors/Templates/TreatmentTemplate")
);
const AdviceTemplate = React.lazy(() =>
    import("../../pages/Doctors/Templates/AdviceTemplate")
);
const CubicCentimeterTemplate = React.lazy(() =>
    import("../../pages/Doctors/Templates/CubicCentimeterTemplate")
);
const OnExaminationTemplate = React.lazy(() =>
    import("../../pages/Doctors/Templates/OnExaminationTemplate")
);
const InvestigationTemplate = React.lazy(() =>
    import("../../pages/Doctors/Templates/InvestigationTemplate")
);
const DoseTemplate = React.lazy(() =>
    import("../../pages/Doctors/Templates/DoseTemplate")
);
const DurationTemplate = React.lazy(() =>
    import("../../pages/Doctors/Templates/DurationTemplate")
);
const OnExaminationOptions = React.lazy(() =>
    import("../../pages/Doctors/Templates/OnExaminationOptions")
);

const templateRoutes = [
    routerElement(
        DoctorUrls.TEMPLATES.DRUGS,
        <DrugTemplate />,
        true
    ),
    routerElement(
        DoctorUrls.TEMPLATES.TREATMENTS,
        <TreatmentTemplate />,
        true
    ),
    routerElement(
        DoctorUrls.TEMPLATES.ADVICES,
        <AdviceTemplate />,
        true
    ),
    routerElement(
        DoctorUrls.TEMPLATES.CUBIC_CENTIMETERS,
        <CubicCentimeterTemplate />,
        true
    ),
    routerElement(
        DoctorUrls.TEMPLATES.ON_EXAMINATIONS,
        <OnExaminationTemplate />,
        true
    ),
    routerElement(
        DoctorUrls.TEMPLATES.INVESTIGATIONS,
        <InvestigationTemplate />,
        true
    ),
    routerElement(
        DoctorUrls.TEMPLATES.DOSES,
        <DoseTemplate />,
        true
    ),
    routerElement(
        DoctorUrls.TEMPLATES.DURATIONS,
        <DurationTemplate />,
        true
    ),
    routerElement(
        DoctorUrls.TEMPLATES.ON_EXAMINATION_OPTIONS,
        <OnExaminationOptions />,
        true
    ),
];

export default templateRoutes;
