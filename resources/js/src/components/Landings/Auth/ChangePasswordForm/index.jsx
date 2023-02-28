import React, {useEffect, useState} from 'react';
import SecretTextBox from "../../../Shared/SecretTextBox";
import {LoadingAppButton} from "../../../../styles/globalStyles";
import {Box} from "@mui/material";
import {isEqualValidate, isRequiredValidate, lengthValidate} from "../../../../utils/validateHelpers";
import useStore from "../../../../stores";

const ChangePasswordForm = () => {
    const authValidateErrors = useStore(state => state.authValidateErrors)
    const authLoader = useStore(state => state.authLoader)
    const setAuthValidateErrors = useStore(state => state.setAuthValidateErrors)
    const changePassword = useStore(state => state.changePassword)
    const setToggleDialog = useStore(state => state.setToggleDialog)

    const [form, setForm] = useState({
        current_password: "",
        password: "",
        password_confirmation: ""
    })

    const [errors, setErrors] = useState({
        current_password: {text: "", show: false},
        password: {text: "", show: false},
        password_confirmation: {text: "", show: false},
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
            ...prevState
        }))
    }

    const submitHandler = (e) => {
        e.preventDefault();

        let formData = {...form}

        let currentPasswordValidate = isRequiredValidate(form.current_password,'current_password',setErrors,'Current password field required')
        if (!currentPasswordValidate) {
            currentPasswordValidate = lengthValidate(
                form.current_password,
                "current_password",
                6,
                setErrors,
                "Current password should be minimum 6 characters"
            );
        }
        let passwordValidate = isRequiredValidate(form.password,'password',setErrors,'Password field required')
        if (!passwordValidate) {
            passwordValidate = lengthValidate(
                form.password,
                "password",
                6,
                setErrors,
                "Password should be minimum 6 characters"
            );
        }
        let passwordConfirmValidate = isRequiredValidate(form.password_confirmation,'password_confirmation',setErrors,'Confirm password field required')
        if (!passwordConfirmValidate) {
            passwordConfirmValidate = isEqualValidate(
                form.password,
                form.password_confirmation,
                "password_confirmation",
                setErrors,
                "Confirm password is not matched"
            );
        }

        if(!currentPasswordValidate && !passwordValidate && !passwordConfirmValidate){
            changePassword(formData, ()=>{
                resetHandler()
                setToggleDialog()
            })
        }

    }

    useEffect(() => {
        if (authValidateErrors && Object.keys(authValidateErrors).length > 0) {
            Object.keys(authValidateErrors).forEach((key) => {
                setErrors((prevState) => ({
                    ...prevState,
                    [key]: {text: authValidateErrors[key], show: true}
                }))
            })
        }else{
            setErrors({
                current_password: {text: '', show: false},
                password: {text: '', show: false},
                password_confirmation: {text: '', show: false},
            })
        }
    }, [authValidateErrors])

    useEffect(() => {
        return () => {
            setAuthValidateErrors({})
        }
    }, [])
    return (
        <form onSubmit={submitHandler}>
            <SecretTextBox
                margin='normal'
                label="Current Password"
                value={form.current_password}
                onChange={(e) => fieldChangeHandler('current_password', e.target.value)}
                error={errors.current_password.show}
                helperText={errors.current_password.text}
            />
            <SecretTextBox
                margin='normal'
                label="New Password"
                value={form.password}
                onChange={(e) => fieldChangeHandler('password', e.target.value)}
                error={errors.password.show}
                helperText={errors.password.text}
            />
            <SecretTextBox
                margin='normal'
                label="Confirm Password"
                value={form.password_confirmation}
                onChange={(e) => fieldChangeHandler('password_confirmation', e.target.value)}
                error={errors.password_confirmation.show}
                helperText={errors.password_confirmation.text}
            />
            <Box mt={1}>
                <LoadingAppButton
                    fullWidth
                    variant="contained"
                    size="large"
                    type="submit"
                    loading={authLoader}
                    disabled={authLoader}
                    loadingIndicator="Loading…"
                >
                    Change password
                </LoadingAppButton>
            </Box>

        </form>
    );
};

export default ChangePasswordForm;
