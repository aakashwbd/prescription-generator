import React, {useEffect, useState} from 'react'
import AuthLayout from "../../../../layouts/AuthLayout";
import {Checkbox, FormControlLabel, Grid, Typography} from "@mui/material";
import {Box} from "@mui/system";
import TextBox from "../../../../components/Shared/TextBox";
import SecretTextBox from "../../../../components/Shared/SecretTextBox";
import {AppButton, LoadingAppButton} from "../../../../styles/globalStyles";
import {Link, useNavigate} from "react-router-dom";
import {DoctorUrls, LandingUrls} from "../../../../routes/siteUrls";
import {makeStyles} from "@mui/styles";
import {isRequiredValidate, lengthValidate} from "../../../../utils/validateHelpers";
import validator from "validator";
import useStore from "../../../../stores";

const useStyles = makeStyles((theme) => ({
    link: {
        color: theme.palette.primary.main,
        fontWeight: '600 !important',
        textDecoration: 'none'
    }
}))

const Login = () => {
    const classes = useStyles()
    const navigate = useNavigate()

    const loginHandler = useStore(state => state.loginHandler)
    const setAuthValidateErrors = useStore(state => state.setAuthValidateErrors)

    const authLoader = useStore(state => state.authLoader)
    const authValidateErrors = useStore(state => state.authValidateErrors)

    const [form, setForm] = useState({
        email: "",
        password: "",
        remember_me: false
    })

    const [errors, setErrors] = useState({
        email: {text: '', show: false},
        password: {text: "", show: false}
    })
    const resetHandler = () => {
        setForm((prevState)=>({
            ...prevState,
            email: "",
            password: "",
            remember_me: false
        }))
    }

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

    const submitHandler = (e) => {
        e.preventDefault();
        let formData = {...form}

        let emailValidate = isRequiredValidate(form.email,'email',setErrors,'Email field required')
        if (!emailValidate) {
            if (!validator.isEmail(form.email)) {
                setErrors((prevState) => ({
                    ...prevState,
                    email: { text: "Email is not valid", show: true },
                }));
                emailValidate = true;
            } else {
                setErrors((prevState) => ({
                    ...prevState,
                    email: { text: "", show: false },
                }));
                emailValidate = false;
            }
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

        if(!emailValidate && !passwordValidate){
            loginHandler(formData, ()=>{
                resetHandler()
                navigate(DoctorUrls.PRESCRIPTIONS.CREATE)
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
            setErrors(prevState => ({
                ...prevState,
                email: {text: '', show: false},
                password: {text: "", show: false}
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
                <form onSubmit={submitHandler}>
                    <Box textAlign="center" mb={5}>
                        <Typography variant="h3" color="primary" mb={2}>Welcome</Typography>
                        <Typography variant="body1" color="primary">Please Login to  Dashboard</Typography>
                    </Box>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextBox
                                label="Email/Username"
                                value={form.email}
                                onChange={(e) => fieldChangeHandler('email', e.target.value)}
                                error={errors.email.show}
                                helperText={errors.email.text}
                            />
                        </Grid>
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
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        size="small"
                                        checked={form.remember_me}
                                        onChange={(e,data) => fieldChangeHandler('remember_me', data)}
                                    />
                                }
                                label="Remember Me"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <LoadingAppButton
                                fullWidth
                                variant="contained"
                                size="large"
                                type="submit"
                                loading={authLoader}
                                disabled={authLoader}
                                loadingIndicator="Loading…"
                            >
                                Login
                            </LoadingAppButton>
                        </Grid>
                        <Grid item xs={12} textAlign="center">
                            <Link className={classes.link} to={LandingUrls.AUTH.FORGET}>Forgot Password?</Link>
                        </Grid>
                    </Grid>
                </form>
            </AuthLayout>
        </Box>
    )
}

export default Login
