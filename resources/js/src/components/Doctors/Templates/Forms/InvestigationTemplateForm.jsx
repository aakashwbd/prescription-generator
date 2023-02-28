import React, {useEffect, useState} from "react";
import {Checkbox, FormControlLabel, FormGroup, Grid, Radio, RadioGroup, Typography} from "@mui/material";
import AppCard from "../../../Shared/AppCard";
import TextBox from "../../../Shared/TextBox";
import TextEditor from "../../../Shared/TextEditor";
import {AppButton, LoadingAppButton} from "../../../../styles/globalStyles";
import {Box} from "@mui/system";
import AutocompleteBox from "../../../Shared/AutocompleteBox";
import useStore from "../../../../stores";
import {isRequiredValidate} from "../../../../utils/validateHelpers";

const InvestigationTemplateForm = ({closeHandler = () => {}, fetchHandler = () => {}, data}) => {
    /** fetcher variables */
    const investigationTemplateLoading = useStore(state => state.investigationTemplateLoading)

    /** fetcher actions handler */
    const investigationTemplateStore = useStore(state => state.investigationTemplateStore)
    const updateInvestigationTemplate = useStore(state => state.updateInvestigationTemplate)
    const setInvestigationTemplate = useStore(state => state.setInvestigationTemplate)

    /** form variables state */
    const [form, setForm] = useState({
        name: "",
        description: "",
        status: 'active'
    })

    /** form errors state */
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
                updateInvestigationTemplate(formData)
                closeHandler()
                fetchHandler()
            }else{
                investigationTemplateStore(formData, () => {
                    resetForm()
                    closeHandler()
                    fetchHandler()
                })
            }
        }
    }

    /** set edited data in form field */
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
            setInvestigationTemplate({})
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
                                type='submit'
                                fullWidth
                                variant="contained"
                                color="primary"
                                loading={investigationTemplateLoading}
                                disabled={investigationTemplateLoading}
                                loadingIndicator="Loading…"
                            >
                                {form.id ? "Update Template" : "Add Template"}
                            </LoadingAppButton>
                        </Grid>
                    </Grid>
                }
            />
        </form>
    )
}

export default InvestigationTemplateForm
