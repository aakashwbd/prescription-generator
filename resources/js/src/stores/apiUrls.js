// export const ROOT_URL = import.meta.env.VITE_API_URL + "/api/v1";
export const ROOT_URL = window.origin + "/api/v1";

const ApiUrls = {
    auth: {
        register: ROOT_URL + '/auth/register',
        register_verify: ROOT_URL + '/auth/register/verify',
        resend: ROOT_URL + '/auth/register/resend',
        login: ROOT_URL + '/auth/login',
        logout: ROOT_URL + '/auth/logout',
        change_password: ROOT_URL + '/auth/change-password',
        reset: {
            request: ROOT_URL + '/auth/reset/request',
            verify: ROOT_URL + '/auth/reset/verify',
            confirm: ROOT_URL + '/auth/reset/confirm'
        },
    },
    medicines: {
        index: ROOT_URL + '/medicines',
        show: ROOT_URL + '/medicines/:id',
        getAll: ROOT_URL + '/medicines/get-all'
    },
    generics: {
        index: ROOT_URL + '/generics',
        show: ROOT_URL + '/generics/:id',
    },
    indications: {
        index: ROOT_URL + '/indications',
        show: ROOT_URL + '/indications/:id',
    },
    therapeutics: {
        index: ROOT_URL + '/therapeutic-classes',
        show: ROOT_URL + '/therapeutic-classes/:id',
    },
    prescriptions: {
        index: ROOT_URL + '/prescriptions',
        show: ROOT_URL + '/prescriptions/:id',
        summary: ROOT_URL + '/prescription-summary',
    },
    prescription_settings: {
        index: ROOT_URL + '/prescription-settings',
        show: ROOT_URL + '/prescription-settings/:id',
    },
    templates: {
        settings: {
          index: ROOT_URL + '/template-settings',
          show: ROOT_URL + '/template-settings/:id'
        },
        medicines_templates: {
            index: ROOT_URL + '/templates/medicines',
            show: ROOT_URL + '/templates/medicines/:id',
        },
        treatments_templates: {
            index: ROOT_URL + '/templates/treatments',
            show: ROOT_URL + '/templates/treatments/:id',
        },
        advice_templates: {
            index: ROOT_URL + '/templates/advices',
            show: ROOT_URL + '/templates/advices/:id',
        },
        cubic_centimeters: {
            index: ROOT_URL + '/templates/cubic-centimeters',
            show: ROOT_URL + '/templates/cubic-centimeters/:id',
        },
        on_exam: {
            index: ROOT_URL + '/templates/on-examinations',
            show: ROOT_URL + '/templates/on-examinations/:id',
        },
        investigations: {
            index: ROOT_URL + '/templates/investigations',
            show: ROOT_URL + '/templates/investigations/:id',
        },
        doses: {
            index: ROOT_URL + '/templates/doses',
            show: ROOT_URL + '/templates/doses/:id',
        },
        durations: {
            index: ROOT_URL + '/templates/durations',
            show: ROOT_URL + '/templates/durations/:id',
        },
        on_exam_options: {
            index: ROOT_URL + '/templates/on-examination-options',
            show: ROOT_URL + '/templates/on-examination-options/:id',
        },
    },
    page_setup: {
        index: ROOT_URL + '/page-setups',
        show: ROOT_URL + '/page-setups/:id',
    }
}

export default ApiUrls
