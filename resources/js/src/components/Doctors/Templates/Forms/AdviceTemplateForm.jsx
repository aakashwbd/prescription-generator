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

const AdviceTemplateForm = ({closeHandler = () => {}, fetchHandler = () => {}, data}) => {
    /** fetcher variables **/
    const adviceTemplateLoading = useStore(state => state.adviceTemplateLoading)
    const adviceTemplatesValidateErrors = useStore(state => state.adviceTemplatesValidateErrors)

    /** fetcher action handlers **/
    const adviceTemplateStore = useStore(state => state.adviceTemplateStore)
    const updateAdviceTemplate = useStore(state => state.updateAdviceTemplate)
    const setAdviceTemplate = useStore(state => state.setAdviceTemplate)
    const setAdviceTemplateValidateErrors = useStore(state => state.setAdviceTemplateValidateErrors)

    /** local states **/
    const [form, setForm] = useState({
        name: "",
        description: "",
        status: 'active'
    })

    const [errors, setErrors] = useState({
        name: {show: false, text: ""},
    })

    /** local action handlers **/
    const resetForm = () => {
        setForm(prevState => ({
            ...prevState,
            name: "",
            description: "",
            status: 'active'
        }))
    }

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
                updateAdviceTemplate(formData)
                closeHandler()
                fetchHandler()
            }else{
                adviceTemplateStore(formData, () => {
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
            setAdviceTemplate({})
            setAdviceTemplateValidateErrors({})
        };
    }, []);

    useEffect(() => {
        if (adviceTemplatesValidateErrors && Object.keys(adviceTemplatesValidateErrors).length > 0) {
            Object.keys(adviceTemplatesValidateErrors).forEach((key) => {
                setErrors((prevState) => ({
                    ...prevState,
                    [key]: {text: adviceTemplatesValidateErrors[key], show: true}
                }))
            })
        }else{
            setErrors(prevState => ({
                ...prevState,
                name: {show: false, text: ""},
            }))
        }
    }, [adviceTemplatesValidateErrors])

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
                                onChange={ (data) => fieldChangeHandler("description", data)}
                            />
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <LoadingAppButton
                                fullWidth
                                variant="contained"
                                color="primary"
                                type='submit'
                                disabled={adviceTemplateLoading}
                                loading={adviceTemplateLoading}
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

export default AdviceTemplateForm
