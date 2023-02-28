import React, {useEffect, useState} from 'react'
import {Grid} from "@mui/material";
import TextBox from "../../Shared/TextBox";
import {LoadingAppButton} from "../../../styles/globalStyles";
import AppCard from "../../Shared/AppCard";
import SelectBox from "../../Shared/SelectBox";
import DateBox from "../../Shared/DateBox";
import {isRequiredValidate, lengthValidate, phoneValidation} from "../../../utils/validateHelpers";
import useStore from "../../../stores";

const AppointmentForm = ({closeHandler = () => {}, fetchHandler = () => {}}) => {
    /** fetcher variables **/
    const prescription = useStore(state => state.prescription)
    const prescriptionLoading = useStore(state => state.prescriptionLoading)
    const prescriptionValidateErrors = useStore(state => state.prescriptionValidateErrors)

    /** fetcher actions **/
    const prescriptionStore = useStore(state => state.prescriptionStore)
    const updatePrescription = useStore(state => state.updatePrescription)
    const setPrescription = useStore(state => state.setPrescription)
    const setPrescriptionValidateErrors = useStore(state => state.setPrescriptionValidateErrors)
    const fetchPrescriptionSettings = useStore(state => state.fetchPrescriptionSettings)
    const prescriptionSettings = useStore(state => state.prescriptionSettings)

    const [form, setForm] = useState({
        date: new Date(),
        name: "",
        age: "",
        gender: "Male",
        mobile : "",
        address: "",
        paid: "",
        status: 'pending'
    })

    const [errors, setErrors] = useState({
        name: {text: "", show: false},
        age: {text: "", show: false},
        mobile: {text: "", show: false}
    })

    const fieldChangeHandler = (field, value) => {
        setErrors(prevState => ({
            ...prevState,
            [field] : {text: "", show: false}
        }))
        setForm(prevState => ({
            ...prevState,
            [field] : value
        }))
    }

    const resetHandler = () => {
        setForm(prevState => ({
            ...prevState,
            date: new Date(),
            name: "",
            age: "",
            gender: "Male",
            mobile : "",
            address: "",
            status: 'pending'
        }))
    }

    const submitHandler = (e) => {
        e.preventDefault();
        let formData = {...form}

        let nameValidate = isRequiredValidate(form.name, 'name', setErrors, 'Name field is required.')
        let ageValidate = isRequiredValidate(form.age, 'age', setErrors, 'Age field is required.')
        let paidValidate = isRequiredValidate(form.paid, 'paid', setErrors, 'Paid field is required.')

        let phoneValidate = isRequiredValidate(form.mobile, 'mobile', setErrors, 'Mobile field is required.')
        if(!phoneValidate){
            phoneValidate = phoneValidation(form.mobile, "mobile",setErrors,"Phone number must be start on 013, 014," +
                " 015, 016, 017, 018, 019")
            if(!phoneValidate) {
                phoneValidate = lengthValidate(form.mobile, 'mobile', 11, setErrors, "Phone number should be" +
                    " minimum 11 character")
            }
        }

        if(!nameValidate && !phoneValidate && !ageValidate && !paidValidate){
            if(form.id){
                updatePrescription(formData)
                closeHandler()
                fetchHandler()
            }else{
                prescriptionStore(formData, ()=> {
                    resetHandler()
                    closeHandler()
                    fetchHandler()
                })
            }
        }
    }
    useEffect(() => {
        if (prescriptionValidateErrors && Object.keys(prescriptionValidateErrors).length > 0) {
            Object.keys(prescriptionValidateErrors).forEach((key) => {
                setErrors((prevState) => ({
                    ...prevState,
                    [key]: {text: prescriptionValidateErrors[key], show: true}
                }))
            })
        }else{
            setErrors(prevState => ({
                ...prevState,
                name: {text: "", show: false},
                age: {text: "", show: false},
                mobile: {text: "", show: false}
            }))
        }
    }, [prescriptionValidateErrors])

    useEffect(() => {
        if(prescription && Object.keys(prescription).length > 0){
            setForm((prevState) => ({
                ...prevState,
                id: prescription.id,
                date: prescription.date,
                name: prescription.name,
                age: prescription.age,
                gender: prescription.gender,
                registration_no: prescription.registration_no,
                status: prescription.status,
                mobile: prescription.mobile,
                paid: prescription.paid,
                address: prescription.address
            }))
        }
    }, [prescription])

    useEffect(() => {
        return () => {
            setPrescription({})
            setPrescriptionValidateErrors({})
        }
    }, [])

    useEffect(() => {
        fetchPrescriptionSettings(1,1)
    }, [fetchPrescriptionSettings]);

    useEffect(() => {
       if(prescriptionSettings && prescriptionSettings.data.length > 0){
           setForm((prevState) => ({
               ...prevState,
               paid: prescriptionSettings.data[0].visit_fee
           }))
       }
    }, [prescriptionSettings]);

    return (
        <>
            <AppCard
                content={
                    <form onSubmit={submitHandler}>
                        <Grid container justifyContent="center" spacing={2}>
                            <Grid item xs={12}>
                                <DateBox label="Date"/>
                            </Grid>
                            <Grid item xs={12}>
                                <TextBox
                                    label="Name"
                                    value={form.name}
                                    onChange={(e) => fieldChangeHandler('name', e.target.value)}
                                    error={errors.name.show}
                                    helperText={errors.name.text}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextBox
                                    label="Age"
                                    value={form.age}
                                    onChange={(e) => fieldChangeHandler('age', e.target.value)}
                                    error={errors.age.show}
                                    helperText={errors.age.text}
                                    type='number'
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextBox
                                    label="Mobile"
                                    inputProps={{
                                        maxLength: 11
                                    }}
                                    value={form.mobile}
                                    onChange={(e) => fieldChangeHandler('mobile', e.target.value)}
                                    error={errors.mobile.show}
                                    helperText={errors.mobile.text}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <SelectBox
                                    label="Gender"
                                    options={['Male', "Female", 'Other']}
                                    value={form.gender}
                                    onChange={(e) => fieldChangeHandler('gender', e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextBox
                                    label="Address"
                                    value={form.address}
                                    onChange={(e) => fieldChangeHandler('address', e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextBox
                                    label="Paid"
                                    value={form.paid}
                                    onChange={(e) => fieldChangeHandler('paid', e.target.value)}
                                    type='number'
                                />
                            </Grid>
                            {/*<Grid item xs={12}>*/}
                            {/*    <TextBox*/}
                            {/*        label="Reg. No"*/}
                            {/*        value={form.registration_no}*/}
                            {/*        onChange={(e) => fieldChangeHandler('registration_no', e.target.value)}*/}
                            {/*        error={errors.registration_no.show}*/}
                            {/*        helperText={errors.registration_no.text}*/}
                            {/*    />*/}
                            {/*</Grid>*/}
                            <Grid item xs={12} lg={8}>
                                <LoadingAppButton
                                    type='submit'
                                    fullWidth
                                    variant="contained"
                                    size="large"
                                    loading={prescriptionLoading}
                                    disabled={prescriptionLoading}
                                    loadingIndicator="Loading…"
                                >
                                    {form.id ? "Update Appoint" : "Add Appointment"}
                                </LoadingAppButton>
                            </Grid>
                        </Grid>
                    </form>
                }
            />
        </>
    )
}

export default AppointmentForm
