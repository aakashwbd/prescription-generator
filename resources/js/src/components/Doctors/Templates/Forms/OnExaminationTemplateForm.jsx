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

const OnExaminationTemplateForm = ({closeHandler = () => {}, fetchHandler = () => {}, data}) => {
    /** fetcher variables */
    const onExamTemplateLoading = useStore(state => state.onExamTemplateLoading)

    /** fetcher actions handler */
    const onExamTemplateStore = useStore(state => state.onExamTemplateStore)
    const updateOnExamTemplate = useStore(state => state.updateOnExamTemplate)
    const setOnExamTemplate = useStore(state => state.setOnExamTemplate)

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

    const submitHandler = (e) => {
        e.preventDefault();
        let formData = {...form}
        const nameValidate = isRequiredValidate(form.name, 'name', setErrors, 'Name field is required.')

        if(!nameValidate){
            if(form.id) {
                updateOnExamTemplate(formData)
                closeHandler()
                fetchHandler()

            }else{
                onExamTemplateStore(formData, () => {
                    resetForm()
                    closeHandler()
                    fetchHandler()
                })
            }
        }
    }

    useEffect(() => {
        if(data && Object.keys(data).length > 0) {
            setForm(prevState => ({
                ...prevState,
                ...data,
                description: data.description || ""
            }))
        }
    }, [data]);

    useEffect(() => {
        return () => {
            setOnExamTemplate({})
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
                                loading={onExamTemplateLoading}
                                disabled={onExamTemplateLoading}
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

export default OnExaminationTemplateForm
