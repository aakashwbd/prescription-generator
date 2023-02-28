import React, {useEffect, useState} from 'react'
import AuthLayout from "../../../../layouts/AuthLayout";
import {Grid, Typography} from "@mui/material";
import {Box} from "@mui/system";
import {AppButton} from "../../../../styles/globalStyles";
import {isEqualValidate, isRequiredValidate, lengthValidate} from "../../../../utils/validateHelpers";
import useStore from "../../../../stores";
import SecretTextBox from "../../../../components/Shared/SecretTextBox";
import {LandingUrls} from "../../../../routes/siteUrls";
import {useNavigate} from "react-router-dom";

const ResetPassword = () => {
    const navigate = useNavigate()
    const resetPassword = useStore(state => state.resetPassword)
    const setAuthValidateErrors = useStore(state => state.setAuthValidateErrors)
    const authValidateErrors = useStore(state => state.authValidateErrors)
    const resetData = useStore(state => state.resetData)
    const authLoader = useStore(state => state.authLoader)

    const [form, setForm] = useState({
        email: "",
        password: "",
        password_confirmation: "",
    })

    const [errors, setErrors] = useState({
        password: {text: '', show: false},
        password_confirmation: {text: '', show: false}
    })

    const fieldChangeHandler = (field, value) => {
        setErrors(prevState => ({
            ...prevState,
            [field]: {text: "", show: false}
        }))
        setForm(prevState => ({
            ...prevState,
            [field] : value
        }))
    }

    const submitHandler = (e) => {
        e.preventDefault();
        let formData = {...form}
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

        let confirmPasswordValidate = isRequiredValidate(form.password_confirmation,'password_confirmation',setErrors,'Confirm password field required')
        if (!confirmPasswordValidate) {
            confirmPasswordValidate = isEqualValidate(
                form.password,
                form.password_confirmation,
                "password_confirmation",
                setErrors,
                "Confirm password is not matched"
            );
        }

        if(!passwordValidate && !confirmPasswordValidate){
            resetPassword(formData, () => {
                navigate(LandingUrls.AUTH.LOGIN)
            })
        }
    }

    useEffect(() => {
        if(resetData && Object.keys(resetData).length > 0){
            setForm(prevState => ({
                ...prevState,
                email: resetData.email
            }))
        }else{
            navigate(LandingUrls.AUTH.FORGET)
        }
    }, [resetData]);

    useEffect(() => {
        if (authValidateErrors && Object.keys(authValidateErrors).length > 0) {
            Object.keys(authValidateErrors).forEach((key) => {
                setErrors((prevState) => ({
                    ...prevState,
                    [key]: {text: authValidateErrors[key], show: true}
                }))
            })
        }else{
            setErrors(prevState => ({
                ...prevState,
                password: {text: '', show: false},
                password_confirmation: {text: '', show: false}
            }))
        }
    }, [authValidateErrors])

    useEffect(() => {
        return () => {
            setAuthValidateErrors({})
        }
    }, [])

    return (
        <Box pt={5}>
            <AuthLayout>
                <Box textAlign="center" mb={5}>
                    <Typography variant="h3" color="primary">Reset Your Password</Typography>
                </Box>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <SecretTextBox
                            label="Password"
                            value={form.password}
                            onChange={(e) => fieldChangeHandler('password', e.target.value)}
                            error={errors.password.show}
                            helperText={errors.password.text}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <SecretTextBox
                            label="Confirm Password"
                            value={form.password_confirmation}
                            onChange={(e) => fieldChangeHandler('password_confirmation', e.target.value)}
                            error={errors.password_confirmation.show}
                            helperText={errors.password_confirmation.text}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <AppButton
                            fullWidth
                            variant="contained"
                            size="large"
                            onClick={submitHandler}
                            disabled={authLoader}
                        >
                            Reset Password
                        </AppButton>
                    </Grid>
                </Grid>
            </AuthLayout>
        </Box>
    )
}

export default ResetPassword
