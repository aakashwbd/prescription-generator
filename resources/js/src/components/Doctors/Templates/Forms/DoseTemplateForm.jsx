import React, {useEffect, useState} from "react";
import {Grid} from "@mui/material";
import AppCard from "../../../Shared/AppCard";
import TextBox from "../../../Shared/TextBox";
import TextEditor from "../../../Shared/TextEditor";
import {LoadingAppButton} from "../../../../styles/globalStyles";
import useStore from "../../../../stores";
import {isRequiredValidate} from "../../../../utils/validateHelpers";

const DoseTemplateForm = ({closeHandler = () => {}, fetchHandler = () => {}, data}) => {
    /** fetcher variables */
    const doseTemplateLoading = useStore(state => state.doseTemplateLoading)

    /** fetcher action handler */
    const doseTemplateStore = useStore(state => state.doseTemplateStore)
    const updateDoseTemplate = useStore(state => state.updateDoseTemplate)
    const setDoseTemplate = useStore(state => state.setDoseTemplate)

    /** form variables state */
    const [form, setForm] = useState({
        name: "",
        description: "",
        status: 'active'
    })

    /** form error state */
    const [errors, setErrors] = useState({
        name: {show: false, text: ""},
    })

    /** form empty or reset handler */
    const resetForm = () => {
        setForm(prevState => ({
            ...prevState,
            name: "",
            description: "",
            status: 'active'
        }))
    }

    /** form field change handler */
    const fieldChangeHandler = (field, value) => {
        setErrors(prevState => ({
            ...prevState,
            [field] : {show: false, text: ""}
        }))
        setForm(prevState => ({
            ...prevState,
            [field] : value
        }))
    }

    /** form submit handler */
    const submitHandler = (e) => {
        e.preventDefault();
        let formData = {...form}
        const nameValidate = isRequiredValidate(form.name, 'name', setErrors, 'Name field is required.')

        if(!nameValidate){
            if(form.id) {
                updateDoseTemplate(formData, () => {
                    closeHandler()
                    fetchHandler()
                })
            }else{
                doseTemplateStore(formData, () => {
                    resetForm()
                    closeHandler()
                    fetchHandler()
                })
            }
        }
    }

    /** set data in form field for edit */
    useEffect(() => {
        if(data && Object.keys(data).length > 0) {
            setForm(prevState => ({
                ...prevState,
                ...data,
                description: data.description || ""
            }))
        }
    }, [data]);

    /** remove edited data in form field */
    useEffect(() => {
        return () => {
            setDoseTemplate({})
        };
    }, []);

    return (
        <form onSubmit={submitHandler}>
            <AppCard
                content={
                    <Grid container justifyContent="center" spacing={2}>
                        <Grid item xs={12}>
                            <TextBox
                                label="Template Name"
                                size="small"
                                value={form.name}
                                onChange={(e) => fieldChangeHandler('name', e.target.value)}
                                error={errors.name.show}
                                helperText={errors.name.text}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextEditor
                                value={form.description}
                                onChange={(data) => fieldChangeHandler('description', data)}
                            />
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <LoadingAppButton
                                fullWidth
                                variant="contained"
                                color="primary"
                                type='submit'
                                loading={doseTemplateLoading}
                                disabled={doseTemplateLoading}
                                loadingIndicator="Loading…"
                            >
                                {form.id ? "Update Template" : "Save Template"}
                            </LoadingAppButton>
                        </Grid>
                    </Grid>
                }
            />
        </form>
    )
}

export default DoseTemplateForm
