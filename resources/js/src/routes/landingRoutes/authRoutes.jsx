import React from "react";
import {LandingUrls, routerElement} from "../siteUrls";

const Login = React.lazy(() => import("../../pages/Landings/Auth/Login"));
const Register = React.lazy(() => import("../../pages/Landings/Auth/Register"));
const Forget = React.lazy(() => import("../../pages/Landings/Auth/Forget"));
const ResetPassword = React.lazy(() => import("../../pages/Landings/Auth/ResetPassword"));

const authRoutes = [
    routerElement(
        LandingUrls.AUTH.LOGIN,
        <Login />,
        true
    ),
    routerElement(
        LandingUrls.AUTH.REGISTER,
        <Register />,
        true
    ),
    routerElement(
        LandingUrls.AUTH.FORGET,
        <Forget />,
        true
    ),
    routerElement(
        LandingUrls.AUTH.RESET_PASSWORD,
        <ResetPassword />,
        true
    ),
];

export default authRoutes;
