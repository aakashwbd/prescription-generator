import React, {useEffect, useState} from 'react'
import {Container} from "@mui/material";
import AppTableTitleBar from "../../../../components/Shared/AppTableTitleBar";
import OptionTable from "../../../../components/Doctors/PrescriptionTemplates/PageOption/OptionTable";
import useStore from "../../../../stores";

const PageOption = () => {
    const updatePrescriptionSetting = useStore(state => state.updatePrescriptionSetting)
    const fetchPrescriptionSettings = useStore(state => state.fetchPrescriptionSettings)
    const prescriptionSettings = useStore(state => state.prescriptionSettings)
    const prescriptionSettingLoading = useStore(state => state.prescriptionSettingLoading)

    const [form, setForm] = useState({
        font_size: "",
        line_per_page: "",
        visit_fee: "",
        re_visit_fee: "",
        re_visit_validity: "",
        default_revisit_count: "",
        barcode_position: 'left',
        barcode_display: 1,
        multiple_page_print: 1,
        visit_no_display: 1,
        patient_info: 1,
        title_display: 1,
        name_display: 1,
        age_display: 1,
        gender_display: 1,
        weight_display: 1,
        date_display: 1,
        address_display: 1,
        registration_no_display: 1,
        mobile_display: 1,
        cubic_centimeter_display: 1,
        on_examination_display: 1,
        advice_display: 1,
        disease_display: 1,
        footer_display: 1,
        // print_past_history: 1,
        // print_present_history: 1,
        // print_notes: 1,
        // print_edd: 1,
    })

    const fieldChangeHandler = (field, value) => {
        setForm(prevState => ({
            ...prevState,
            [field] : value
        }))
    }

    const submitHandler = (e) => {
        e.preventDefault()
        let formData = {...form}
        if(form.id){
            updatePrescriptionSetting(formData, () => {
                fetchPrescriptionSettings(1,1)
            })
        }
    }

    useEffect(() => {
        if(prescriptionSettings && prescriptionSettings.data.length > 0){
            setForm(prevState => ({
                ...prevState,
                ...prescriptionSettings.data[0],
            }))
        }
    }, [prescriptionSettings]);

    useEffect(() => {
        fetchPrescriptionSettings(1,1)
    }, [fetchPrescriptionSettings]);

    return (
        <Container maxWidth="md">
            <AppTableTitleBar title="Page Option"/>
            <OptionTable
                form={form}
                fieldChangeHandler={fieldChangeHandler}
                submitHandler={submitHandler}
                isLoading={prescriptionSettingLoading}
            />
        </Container>
    )
}

export default PageOption
