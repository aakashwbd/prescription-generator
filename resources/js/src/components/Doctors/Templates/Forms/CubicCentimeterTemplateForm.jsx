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

const CubicCentimeterTemplateForm = ({closeHandler = () => {}, fetchHandler = () => {}, data}) => {
    /** state variables **/
    const cubicTemplateLoading = useStore(state => state.cubicTemplateLoading)
    const cubicTemplatesValidateErrors = useStore(state => state.cubicTemplatesValidateErrors)

    /** state fetcher actions **/
    const cubicTemplateStore = useStore(state => state.cubicTemplateStore)
    const updateCubicTemplate = useStore(state => state.updateCubicTemplate)
    const setCubicTemplate = useStore(state => state.setCubicTemplate)
    const setCubicTemplateValidateErrors = useStore(state => state.setCubicTemplateValidateErrors)

    /** local states **/
    const [form, setForm] = useState({
        name: "",
        description: "",
        status: 'active'
    })

    const [errors, setErrors] = useState({
        name: {show: false, text: ""},
    })

    const resetForm = () => {
        setForm(prevState => ({
            ...prevState,
            name: "",
            description: "",
            status: 'active'
        }))
    }

    /** local action handlers **/
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
                updateCubicTemplate(formData, () => {
                    closeHandler()
                    fetchHandler()
                })
            }else{
                cubicTemplateStore(formData, () => {
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
            setCubicTemplate({})
            setCubicTemplateValidateErrors({})
        };
    }, []);

    useEffect(() => {
        if (cubicTemplatesValidateErrors && Object.keys(cubicTemplatesValidateErrors).length > 0) {
            Object.keys(cubicTemplatesValidateErrors).forEach((key) => {
                setErrors((prevState) => ({
                    ...prevState,
                    [key]: {text: cubicTemplatesValidateErrors[key], show: true}
                }))
            })
        }else{
            setErrors(prevState => ({
                ...prevState,
                name: {show: false, text: ""},
            }))
        }
    }, [cubicTemplatesValidateErrors])


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
                                onChange={(data) => fieldChangeHandler("description", data)}
                            />
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <LoadingAppButton
                                fullWidth
                                variant="contained"
                                color="primary"
                                type='submit'
                                disabled={cubicTemplateLoading}
                                loading={cubicTemplateLoading}
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

export default CubicCentimeterTemplateForm
