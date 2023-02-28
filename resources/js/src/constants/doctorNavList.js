import {DoctorUrls} from "../routes/siteUrls";

const doctorNavList = [
    {
        name: "Prescription",
        link: DoctorUrls.PRESCRIPTIONS.CREATE,
    },
    {
        name: "View All Prescription",
        link: DoctorUrls.PRESCRIPTIONS.LIST,
    },
    {
        name: "Drug Database",
        link: DoctorUrls.DRUG_DATABASE,
    },
    {
        name: "Template",
        link: null,
        children: [
            {
                name: "Drug Template",
                link: DoctorUrls.TEMPLATES.DRUGS,
            },
            {
                name: "Treatment Template",
                link: DoctorUrls.TEMPLATES.TREATMENTS,
            },
            {
                name: "Advice Template",
                link: DoctorUrls.TEMPLATES.ADVICES,
            },
            {
                name: "C/C Template",
                link: DoctorUrls.TEMPLATES.CUBIC_CENTIMETERS,
            },
            {
                name: "O/E Template",
                link: DoctorUrls.TEMPLATES.ON_EXAMINATIONS,
            },
            {
                name: "I/X Template",
                link: DoctorUrls.TEMPLATES.INVESTIGATIONS,
            },
            {
                name: "Dose Template",
                link: DoctorUrls.TEMPLATES.DOSES,
            },
            {
                name: "Duration Template",
                link: DoctorUrls.TEMPLATES.DURATIONS,
            },
            {
                name: "O/E Box Options",
                link: DoctorUrls.TEMPLATES.ON_EXAMINATION_OPTIONS,
            },
        ]
    },
    {
        name: "Appointment",
        link: DoctorUrls.APPOINTMENTS,
    },
    {
        name: "Payment",
        link: DoctorUrls.PAYMENTS,
    },
    {
        name: "Prescription Template",
        link: null,
        children: [
            {
                name: 'Select Template',
                link: DoctorUrls.PRESCRIPTION_TEMPLATES.SELECT_TEMPLATE
            },
            {
                name: 'Header Edit',
                link: DoctorUrls.PRESCRIPTION_TEMPLATES.HEADER_EDIT
            }
        ]
    },
    {
        name: "Page Setup",
        link: null,
        children: [
            {
                name: 'Page Size Setup',
                link: DoctorUrls.PAGE_SETUPS.SETUP
            },
            {
                name: 'Page Option',
                link: DoctorUrls.PAGE_SETUPS.OPTIONS
            },
            {
                name: 'Setting',
                link: DoctorUrls.PAGE_SETUPS.SETTINGS
            }
        ]
    },
    // {
    //     name: "SMS",
    //     link: DoctorUrls.SMS,
    // },
];

export default doctorNavList;
