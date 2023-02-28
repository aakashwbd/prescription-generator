import React from "react";
import {createBrowserRouter, Navigate} from "react-router-dom";
import landingRoutes from "./landingRoutes";
import {LandingUrls} from "./siteUrls";
import doctorRoutes from "./doctorRoutes";

const routes = createBrowserRouter([
    {
        path: LandingUrls.BASE_URL,
        element: <Navigate to={LandingUrls.AUTH.LOGIN} />,
    },
    ...landingRoutes,
    ...doctorRoutes
]);

export default routes;
