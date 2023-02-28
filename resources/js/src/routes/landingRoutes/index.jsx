import React from "react";
import {LandingUrls, routerElement} from "../siteUrls";
import authRoutes from "./authRoutes";

const LandingLayout = React.lazy(() =>
    import("../../layouts/LandingLayout")
);

const landingRoutes = [
    {
        ...routerElement(
            LandingUrls.BASE_URL,
            <LandingLayout />,
            true
        ),
        children: [
            ...authRoutes,
        ],
    },
];

export default landingRoutes;
