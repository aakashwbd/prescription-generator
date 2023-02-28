import React, {useEffect, useState} from "react";
import AppTableTitleBar from "../../../../components/Shared/AppTableTitleBar";
import {Container} from "@mui/material";
import SettingOptionTable from "../../../../components/Doctors/PrescriptionTemplates/PageSetting/SettingOptionTable";
import useStore from "../../../../stores";

const PageSetting = () => {
    const fetchTemplateSettings = useStore(state => state.fetchTemplateSettings)
    const updateTemplateSetting = useStore(state => state.updateTemplateSetting)
    const templateSettings = useStore(state => state.templateSettings)
    const templateSettingsLoading = useStore(state => state.templateSettingsLoading)

    const [form, setForm] = useState({
        templates : {
            medicine: "",
            dose: "",
            advice: "",
            duration: "",
            treatment: "",
            investigation: "",
            on_examination: "",
            cubic_centimeter: ""
        },
    })

    const fieldChangeHandler = (field, subField, value) => {
        setForm((prevState) => ({
            ...prevState,
            [field] : {
                ...prevState[field],
                [subField]: value,
            }
        }))
    }

    const submitHandler = (e) => {
        e.preventDefault();
        let formData = {...form}

        if(form.id){
            updateTemplateSetting(formData, () => {
                fetchTemplateSettings(1, 1)
            })
        }
    }

    useEffect(() => {
        fetchTemplateSettings(1, 1)
    }, [fetchTemplateSettings]);

    useEffect(() => {
        if(templateSettings && Object.keys(templateSettings).length > 0){
            if(templateSettings?.data?.length > 0){
                setForm((prevState) => ({
                    ...prevState,
                    ...templateSettings?.data[0]
                }))
            }
        }
    }, [templateSettings]);

    return (
        <Container maxWidth="sm">
            <AppTableTitleBar title="Page Setting"/>
            <SettingOptionTable
                form={form}
                fieldChangeHandler={fieldChangeHandler}
                submitHandler={submitHandler}
                isLoading={templateSettingsLoading}
            />
        </Container>
    )
}

export default PageSetting
