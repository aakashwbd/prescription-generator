import React from "react";
import PageLoading from "../components/Shared/PageLoading";

export const routerElement = (
    path,
    element,
    isLazy = false,
    index = false,
    loader = () => {},
    action = () => {}
) => ({
    path,
    element: isLazy ? (
        <React.Suspense fallback={<PageLoading />}>{element}</React.Suspense>
    ) : (
        element
    ),
    index,
});

const LANDING_BASE_URL = "";
const DOCTOR_BASE_URL = "/doctors";

export const LandingUrls = {
    BASE_URL: LANDING_BASE_URL,
    AUTH: {
        LOGIN: LANDING_BASE_URL + '/login',
        REGISTER: LANDING_BASE_URL + '/register',
        FORGET: LANDING_BASE_URL + '/forget',
        RESET_PASSWORD: LANDING_BASE_URL + '/reset-password',
    }
};

export const DoctorUrls = {
    BASE_URL: DOCTOR_BASE_URL,
    PRESCRIPTIONS: {
        LIST: DOCTOR_BASE_URL + '/prescription/list',
        CREATE: DOCTOR_BASE_URL + '/prescription/create',
        PRINT: DOCTOR_BASE_URL + '/prescription/print/:id',
    },
    DRUG_DATABASE: DOCTOR_BASE_URL + '/drug-database',
    TEMPLATES: {
        DRUGS: DOCTOR_BASE_URL + '/template/drugs',
        TREATMENTS: DOCTOR_BASE_URL + '/template/treatments',
        ADVICES: DOCTOR_BASE_URL + '/template/advices',
        CUBIC_CENTIMETERS: DOCTOR_BASE_URL + '/template/cubic-centimeters',
        ON_EXAMINATIONS: DOCTOR_BASE_URL + '/template/on-examinations',
        INVESTIGATIONS: DOCTOR_BASE_URL + '/template/investigations',
        DOSES: DOCTOR_BASE_URL + '/template/doses',
        DURATIONS: DOCTOR_BASE_URL + '/template/durations',
        ON_EXAMINATION_OPTIONS: DOCTOR_BASE_URL + '/template/on-examination-options',
    },
    APPOINTMENTS: DOCTOR_BASE_URL + '/appointments',
    PAYMENTS: DOCTOR_BASE_URL + '/payments',
    PRESCRIPTION_TEMPLATES: {
        SELECT_TEMPLATE: DOCTOR_BASE_URL + '/prescription-templates/select',
        HEADER_EDIT: DOCTOR_BASE_URL + '/prescription-templates/header-edit',
    },
    PAGE_SETUPS: {
        SETUP: DOCTOR_BASE_URL + '/page-setups/setups',
        OPTIONS: DOCTOR_BASE_URL + '/page-setups/options',
        SETTINGS: DOCTOR_BASE_URL + '/page-setups/settings'
    },
    SMS: DOCTOR_BASE_URL + '/sms'
};

export const SuperAdminUrls = {};
