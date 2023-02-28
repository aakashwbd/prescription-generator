import React, {useCallback, useEffect, useState} from 'react'
import {Container, Grid, Stack,} from "@mui/material";
import CubicCentimeterTable from "../../../components/Doctors/Prescriptions/CubicCentimeterTable";
import HistoryOptionTable from "../../../components/Doctors/Prescriptions/HistoryOptionTable";
import OnExaminationTable from "../../../components/Doctors/Prescriptions/OnExaminationTable";
import DiseaseTable from "../../../components/Doctors/Prescriptions/DiseaseTable";
import InvestigationTable from "../../../components/Doctors/Prescriptions/InvestigationTable";
import PlanTable from "../../../components/Doctors/Prescriptions/PlanTable";
import MalignantHypothermiaTable from "../../../components/Doctors/Prescriptions/MalignantHypothermiaTable";
import OralHygieneTable from "../../../components/Doctors/Prescriptions/OralHygieneTable";
import PrescriptionAdditionalBox from "../../../components/Doctors/Prescriptions/PrescriptionAdditionalBox";
import MedicineBox from "../../../components/Doctors/Prescriptions/MedicineBox";
import PatientBox from "../../../components/Doctors/Prescriptions/PatientBox";
import ReportEntryTable from "../../../components/Doctors/Prescriptions/ReportEntryTable";
import MedicalInformation from "../../../components/Doctors/Prescriptions/MedicalInformation";
import MeasurementInformation from "../../../components/Doctors/Prescriptions/MeasurementInformation";
import {debounce} from "../../../utils/helpers";
import useStore from "../../../stores";
import {lengthValidate, phoneValidation} from "../../../utils/validateHelpers";
import CrudDialog from "../../../components/Shared/CrudDialog";
import PrescriptionPreview from "../../../components/Doctors/Prescriptions/PrecriptionPreview";
import {useNavigate} from "react-router-dom";
import {DoctorUrls} from "../../../routes/siteUrls";
import Cookies from "js-cookie";

const PrescriptionCreate = () => {
    const navigate = useNavigate()
    const { edit } = Object.fromEntries(new URLSearchParams(location.search));
    const prescription = useStore(state => state.prescription)

    const prescriptionStore = useStore(state => state.prescriptionStore)
    const updatePrescription = useStore(state => state.updatePrescription)
    const fetchPrescription = useStore(state => state.fetchPrescription)

    const setDrugTemplates = useStore(state => state.setDrugTemplates)
    const setTreatmentTemplates = useStore(state => state.setTreatmentTemplates)
    const setAdviceTemplates = useStore(state => state.setAdviceTemplates)
    const setCubicTemplates = useStore(state => state.setCubicTemplates)
    const setDoseTemplates = useStore(state => state.setDoseTemplates)
    const setDurationTemplates = useStore(state => state.setDurationTemplates)
    const setInvestigationTemplates = useStore(state => state.setInvestigationTemplates)
    const setOnExamOptTemps = useStore(state => state.setOnExamOptTemps)
    const setOnExamTemplates = useStore(state => state.setOnExamTemplates)
    const setPrescriptions = useStore(state => state.setPrescriptions)
    const setPrescription = useStore(state => state.setPrescription)

    const [addDialog, setAddDialog] = useState(false)

    const [form, setForm] = useState({
        name: "",
        age: "",
        gender: "Male",
        address: "",
        mobile: "",
        registration_no : "",
        date: new Date(),
        paid: "0",
        last_visit: "0",
        visit_no: "0",
        referred_by: "",
        after_come: "",
        medicines: [
            {
                name: "",
                dose: "",
                instruction: "",
                duration: ""
            },
        ],
        cc: [
            {
                name: "",
                duration: "",
                unit: ""
            }
        ],
        ho: [],
        oe: [{name: "", value: "", unit: ""}],
        dx: [{name: ""}],
        ix: [{name: ""}],
        plan: [{name: ""}],
        oh: [{name: "",value: ""}],
        mh: [{name: "",value: "" }],

        bmi: {
            weight: "",
            height_feet: "",
            height_inch: "",
            result: "",
            class: "",
            ideal_weight: ""
        },
        insulin: {
            weight: "",
            unit: "0.3",
            time: "BD",
            result: "",
            dose: "",
        },
        z_score: {
            dob: null,
            gender: "",
            weight: "",
            result: "",
            days: "",
            ideal_weight: "",
            weight_excess: ""
        },
        bmr: {
            weight : "",
            height_feet : "",
            height_inch : "",
            gender : "Male",
            age : "",
            activity : "No Exercise",
            result : "",
            calorie_need : "",
        },
        edd: {
            lmp : null,
            age : "",
            result : ""
        },
        report_history: [{ date : new Date(),name : "",value : "",unit: ""}],
        ot_notes: [{name: "", value: ""}],
        salient_features: [{name: "", value: ""}],
        past_history: [{name: "", value: ""}],
        medical_certificates: [{name: "", value: ""}],
        others: [{name: "", value: ""}],
        notes: [],
        printing: [{past_history : false,notes: false, edd: false}],
        advices: '',
        status: 'done'
    })

    const [errors, setErrors] = useState({
        mobile: {text: '', show: false}
    })

    const fieldChangeHandler = (field, value) => {
        setErrors((prevState) =>({
            ...prevState,
            [field] : {text: '', show: false}
        }))
        setForm((prevState) => ({
            ...prevState,
            [field] : value
        }))
    }

    const resetHandler = () => {
        setForm((prevState)=> ({
            ...prevState,
            name: "",
            age: "",
            gender: "Male",
            address: "",
            mobile: "",
            registration_no : "",
            date: new Date(),
            paid: "0",
            last_visit: "0",
            visit_no: "0",
            referred_by: "",
            after_come: "",
            medicines: [
                {
                    name: "",
                    dose: "",
                    instruction: "",
                    duration: ""
                },
            ],
            cc: [
                {
                    name: "",
                    duration: "",
                    unit: ""
                }
            ],
            ho: [],
            oe: [{name: "", value: "", unit: ""}],
            dx: [{name: ""}],
            ix: [{name: ""}],
            plan: [{name: ""}],
            oh: [{name: "",value: ""}],
            mh: [{name: "",value: "" }],

            bmi: {
                weight: "",
                height_feet: "",
                height_inch: "",
                result: "",
                class: "",
                ideal_weight: ""
            },
            insulin: {
                weight: "",
                unit: "0.3",
                time: "BD",
                result: "",
                dose: "",
            },
            z_score: {
                dob: null,
                gender: "",
                weight: "",
                result: "",
                days: "",
                ideal_weight: "",
                weight_excess: ""
            },
            bmr: {
                weight : "",
                height_feet : "",
                height_inch : "",
                gender : "Male",
                age : "",
                activity : "No Exercise",
                result : "",
                calorie_need : "",
            },
            edd: {
                lmp : null,
                age : "",
                result : ""
            },
            report_history: [{ date : new Date(),name : "",value : "",unit: ""}],
            ot_notes: [{name: "", value: ""}],
            salient_features: [{name: "", value: ""}],
            past_history: [{name: "", value: ""}],
            medical_certificates: [{name: "", value: ""}],
            others: [{name: "", value: ""}],
            notes: [],
            printing: [{past_history : false,notes: false, edd: false}],
            advices: '',
            status: 'done'
        }))
    }

    const debouncedHandler = useCallback(debounce((fn, value, page = 1, offset = 15, cb = () => {
    }) => {
        fn(value, page, offset, () => {
            cb()
        })
    }, 500), []);

    const submitHandler = (e, forQuery = 'save') => {
        e.preventDefault();
        let formData={...form}
        let phoneValidate = phoneValidation(form.mobile, "mobile",setErrors,"Invalid mobile number")
        if(!phoneValidate) {
            phoneValidate = lengthValidate(form.mobile, 'mobile', 11, setErrors, "Phone number should be" +
                " minimum 11 character")
        }
        if(!phoneValidate){
            if(form.id){
                updatePrescription(formData, (data) => {
                    if(forQuery !== 'save'){
                        Cookies.set('printQuery', forQuery, {expires: 1})
                        navigate(DoctorUrls.PRESCRIPTIONS.PRINT.replace(":id", data.id))
                    }
                })
            }else{
                prescriptionStore(formData, (data) => {
                    if(forQuery !== 'save'){
                        Cookies.set('printQuery', forQuery, {expires: 1})
                        navigate(DoctorUrls.PRESCRIPTIONS.PRINT.replace(":id", data.id))
                    }
                })
            }
        }
    }

    useEffect(() => {
        setPrescription({})
        setDrugTemplates({data: []})
        setTreatmentTemplates({data: []})
        setAdviceTemplates({data: []})
        setCubicTemplates({data: []})
        setDoseTemplates({data: []})
        setDurationTemplates({data: []})
        setInvestigationTemplates({data: []})
        setOnExamTemplates({data: []})
        setOnExamOptTemps({data: []})
        setPrescriptions({data: []})
    }, [])

    useEffect(() => {
        if(edit){
            let id = parseInt(edit)
            fetchPrescription(id)
        }
    }, [edit]);

    useEffect(() => {
        if(prescription && Object.keys(prescription).length > 0){
            setForm((prevState) =>({
                ...prevState,
                ...prescription,
                name: prescription?.name,
                age: prescription?.age,
                gender: prescription?.gender,
                address: prescription?.address,
                mobile: prescription?.mobile,
                registration_no : prescription?.registration_no,
                date: prescription?.date,
                paid: prescription?.paid,
                last_visit: prescription?.last_visit,
                visit_no: prescription?.visit_no,
                referred_by: prescription?.referred_by,
                after_come: prescription?.after_come,

                medicines: prescription?.medicines ? prescription?.medicines : prevState.medicines,
                cc:  prescription?.cc ? prescription?.cc : prevState.cc,
                ho:  prescription?.ho ? prescription?.ho : prevState.ho,
                oe:  prescription?.oe ? prescription?.oe : prevState.oe,
                dx:  prescription?.dx ?  prescription?.dx : prevState.dx,
                ix: prescription?.ix ? prescription?.ix :  prevState.ix,
                plan: prescription?.plan ? prescription?.plan :   prevState.plan,
                oh: prescription?.oh ? prescription?.oh :  prevState.oh,
                mh: prescription?.mh ? prescription?.mh :  prevState.mh,

                bmi: prescription?.bmi ? prescription?.bmi :  prevState.bmi,
                insulin: prescription?.insulin ? prescription?.insulin :  prevState.insulin,
                z_score: prescription?.z_score ? prescription?.z_score :  prevState.z_score,
                bmr: prescription?.bmr ? prescription?.bmr : prevState.bmr,
                edd: prescription?.edd ? prescription?.edd : prevState.edd,
                report_history: prescription?.report_history ? prescription?.report_history : prevState.report_history,
                ot_notes: prescription?.ot_notes ? prescription?.ot_notes : prevState.ot_notes,
                salient_features: prescription?.salient_features ? prescription?.salient_features : prevState.salient_features,
                past_history: prescription?.past_history ? prescription?.past_history : prevState.past_history,
                medical_certificates: prescription?.medical_certificates ? prescription?.medical_certificates : prevState.medical_certificates,
                others: prescription?.others ? prescription?.others : prevState.others,
                notes: prescription?.notes ? prescription?.notes : prevState.notes,
                advices: prescription?.advices ? prescription?.advices : prevState.advices,
                printing: prescription?.printing ? prescription?.printing : prevState.printing,
                status: prescription?.status ? prescription?.status : prevState.status,
            }))
        }else {
            resetHandler()
        }
    }, [prescription]);

    return (
        <Container maxWidth="xl">
            <PatientBox
                form={form}
                fieldChange={fieldChangeHandler}
                errors={errors}
                formHandler={submitHandler}
                debouncedHandler={debouncedHandler}
                previewHandler={() => setAddDialog(true)}
            />
            <Grid container spacing={2}>
                <Grid item xs={12} sm={4} lg={4}>
                    <Stack direction="column" spacing={2}>
                        <CubicCentimeterTable form={form} setForm={setForm} debouncedHandler={debouncedHandler}/>
                        <HistoryOptionTable form={form} setForm={setForm} debouncedHandler={debouncedHandler}/>
                        <OnExaminationTable form={form} setForm={setForm} debouncedHandler={debouncedHandler}/>
                        <DiseaseTable form={form} setForm={setForm} debouncedHandler={debouncedHandler}/>
                        <InvestigationTable form={form} setForm={setForm} debouncedHandler={debouncedHandler}/>
                        <PlanTable form={form} setForm={setForm} debouncedHandler={debouncedHandler}/>
                        <OralHygieneTable form={form} setForm={setForm} debouncedHandler={debouncedHandler}/>
                        <MalignantHypothermiaTable form={form} setForm={setForm} debouncedHandler={debouncedHandler}/>
                    </Stack>
                </Grid>
                <Grid item xs={12} sm={8} lg={8}>
                    <MedicineBox
                        form={form}
                        setForm={setForm}
                        debouncedHandler={debouncedHandler}
                        fieldChangeHandle={fieldChangeHandler}
                    />
                    <PrescriptionAdditionalBox
                        form={form}
                        setForm={setForm}
                        fieldChangeHandle={fieldChangeHandler}
                        debouncedHandler={debouncedHandler}
                    />
                    <ReportEntryTable
                        form={form}
                        setForm={setForm}
                        fieldChangeHandle={fieldChangeHandler}
                        debouncedHandler={debouncedHandler}
                    />
                    <MeasurementInformation
                        form={form}
                        setForm={setForm}
                        debouncedHandler={debouncedHandler}
                        fieldChangeHandle={fieldChangeHandler}
                    />
                    <MedicalInformation
                        form={form}
                        setForm={setForm}
                        debouncedHandler={debouncedHandler}
                        fieldChangeHandler={fieldChangeHandler}
                    />
                </Grid>
            </Grid>

            <CrudDialog
                fullScreen={true}
                title='Preview'
                open={addDialog}
                size="lg"
                close={() => setAddDialog(false)}
            >
                <PrescriptionPreview data={form}/>
            </CrudDialog>
        </Container>
    );
}

export default PrescriptionCreate
