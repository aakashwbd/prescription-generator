import React from "react";
import {DoctorUrls, routerElement} from "../siteUrls";
import prescriptionRoutes from "./prescriptionRoutes";
import templateRoutes from "./templateRoutes";
import prescriptionSettingRoutes from "./prescriptionSettingRoutes";

const DoctorLayout = React.lazy(() =>
    import("../../layouts/DoctorLayout")
);

const doctorRoutes = [
    {
        ...routerElement(
            DoctorUrls.BASE_URL,
            <DoctorLayout />,
            true
        ),
        children: [
            ...prescriptionRoutes,
            ...templateRoutes,
            ...prescriptionSettingRoutes
        ],
    },
];

export default doctorRoutes;
