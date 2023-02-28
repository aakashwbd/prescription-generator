import React, {useEffect, useState} from "react";
import {Grid} from "@mui/material";
import AppCard from "../../../Shared/AppCard";
import TextBox from "../../../Shared/TextBox";
import {LoadingAppButton} from "../../../../styles/globalStyles";
import SelectBox from "../../../Shared/SelectBox";
import {isRequiredValidate} from "../../../../utils/validateHelpers";
import useStore from "../../../../stores";

const OnExaminationOptionForm = ({closeHandler = () => {}, fetchHandler = () => {}, data}) => {
    /** fetcher variables */
    const onExamOptTempLoading = useStore(state => state.onExamOptTempLoading)
    const onExamOptTempValidateErrors = useStore(state => state.onExamOptTempValidateErrors)

    /** fetcher actions handler */
    const onExamOptTempStore = useStore(state => state.onExamOptTempStore)
    const updateOnExamOptTemp = useStore(state => state.updateOnExamOptTemp)
    const setOnExamOptTemp = useStore(state => state.setOnExamOptTemp)
    const setOnExamOptTempValidateErrors = useStore(state => state.setOnExamOptTempValidateErrors)

    /** form variables */
    const [form, setForm] = useState({
        name: "",
        value: "",
        position: "",
        status: 'active'
    })

    /** form field errors */
    const [errors, setErrors] = useState({
        name: {text: "", show: false},
        position: {text: "", show: false}
    })

    /** form field change handler */
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

    /** form field empty handler */
    const resetForm = () => {
        setForm(prevState => ({
            ...prevState,
            name: "",
            value: "",
            position: "",
            status: 'active'
        }))
    }

    /** form submit handler */
    const submitHandler = (e) => {
        e.preventDefault();
        let formData = {...form}

        let nameValidate = isRequiredValidate(form.name, 'name', setErrors, "Name field is required.")
        let positionValidate = isRequiredValidate(form.position, 'position', setErrors, "Position field is required.")

        if(!nameValidate && !positionValidate){
            if(form.id) {
                updateOnExamOptTemp(formData, () => {
                    closeHandler()
                    fetchHandler()
                })
            }else{
                onExamOptTempStore(formData, () => {
                    resetForm()
                    closeHandler()
                    fetchHandler()
                })
            }
        }
    }

    /** data set in form field for edit **/
    useEffect(() => {
        if (data && Object.keys(data).length > 0) {
            setForm(prevState => ({
                ...prevState,
                ...data
            }))
        }
    }, [data])

    /** db validate error **/
    useEffect(() => {
        if (onExamOptTempValidateErrors && Object.keys(onExamOptTempValidateErrors).length > 0) {
            Object.keys(onExamOptTempValidateErrors).forEach((key) => {
                setErrors((prevState) => ({
                    ...prevState,
                    [key]: {text: onExamOptTempValidateErrors[key], show: true}
                }))
            })
        }else{
            setErrors(prevState => ({
                ...prevState,
                name: {text: "", show: false},
                position: {text: "", show: false}
            }))
        }
    }, [onExamOptTempValidateErrors])

    /** edited data & validate empty **/
    useEffect(() => {
        return () => {
            setOnExamOptTempValidateErrors({})
            setOnExamOptTemp({})
        }
    }, [])

    return (
        <form onSubmit={submitHandler}>
            <AppCard
                content={
                    <Grid container justifyContent="center" spacing={2}>
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
                                label="Value"
                                value={form.value}
                                onChange={(e) => fieldChangeHandler('value', e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextBox
                                type='number'
                                label="Position"
                                value={form.position}
                                onChange={(e) => fieldChangeHandler('position', e.target.value)}
                                error={errors.position.show}
                                helperText={errors.position.text}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <SelectBox
                                label="Status"
                                valueKey='value'
                                options={[{name: 'Active', value: 'active'}, {name: 'Inactive', value: 'inactive'},]}
                                value={form.status}
                                onChange={(e) => fieldChangeHandler('status', e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <LoadingAppButton
                                type='submit'
                                fullWidth
                                variant="contained"
                                color="primary"
                                loading={onExamOptTempLoading}
                                disabled={onExamOptTempLoading}
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

export default OnExaminationOptionForm
