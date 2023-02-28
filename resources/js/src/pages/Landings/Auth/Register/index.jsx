import React, {useEffect, useState} from 'react'
import AuthLayout from "../../../../layouts/AuthLayout";
import {Checkbox, FormControlLabel, Grid, Typography} from "@mui/material";
import {Box} from "@mui/system";
import TextBox from "../../../../components/Shared/TextBox";
import SecretTextBox from "../../../../components/Shared/SecretTextBox";
import {LoadingAppButton} from "../../../../styles/globalStyles";
import SelectBox from "../../../../components/Shared/SelectBox";
import {isEqualValidate, isRequiredValidate, lengthValidate, phoneValidation} from "../../../../utils/validateHelpers";
import validator from "validator";
import {PRACTICE_AREAS} from "../../../../constants/areas";
import useStore from "../../../../stores";

const Register = () => {
    /** fetcher variables **/
    const authLoader = useStore(state => state.authLoader)
    const authValidateErrors = useStore(state => state.authValidateErrors)

    /** fetcher actions **/
    const register = useStore(state => state.register)
    const setAuthValidateErrors = useStore(state => state.setAuthValidateErrors)

    /** form **/
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        doctor_type: "MBBS",
        institute: "",
        current_practice_area: ""
    })

    /** form errors **/
    const [errors, setErrors] = useState({
        name: {text: "", show: false},
        email: {text: "", show: false},
        phone: {text: "", show: false},
        password: {text: "", show: false},
        password_confirmation: {text: "", show: false}
    })

    const [isAgree, setIsAgree] = useState(false)

    const resetHandler = () => {
        setForm((prevState)=>({
            ...prevState,
            name: "",
            // phone: "",
            email: "",
            password: "",
            password_confirmation: "",
            doctor_type: "MBBS",
            institute: "",
            current_practice_area: ""
        }))
    }

    const fieldChangeHandler = (field, value) => {
        setErrors((prevState)=>({
            ...prevState,
            [field] : {text: "", show: false}
        }))
        setForm((prevState) => ({
            ...prevState,
            [field] : value
        }))
    }

    const submitHandler = (e) => {
        e.preventDefault();
        let formData = {...form}

        let nameValidate = isRequiredValidate(form.name,'name',setErrors,'Name field required')

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

        let phoneValidate = ''
        if(form.phone){
            phoneValidate = phoneValidation(form.phone, "phone",setErrors,"Phone number must be start on 013, 014," +
                " 015, 016, 017, 018, 019")
            if(!phoneValidate) {
                phoneValidate = lengthValidate(form.phone, 'phone', 11, setErrors, "Phone number should be" +
                    " minimum 11 character")
            }
            formData['phone'] = form.phone
        }

        if(!nameValidate && !emailValidate && !phoneValidate && !passwordValidate && !confirmPasswordValidate){
            register(formData, ()=>{
                resetHandler()
                form.phone = ''
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
                name: {text: "", show: false},
                email: {text: "", show: false},
                phone: {text: "", show: false},
                password: {text: "", show: false},
                password_confirmation: {text: "", show: false}
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
                    <Typography variant="h3" color="primary">Create Account</Typography>
                </Box>
                <form onSubmit={submitHandler}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextBox
                                label="Full Name"
                                value={form.name}
                                onChange={(e) => fieldChangeHandler('name', e.target.value)}
                                error={errors.name.show}
                                helperText={errors.name.text}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextBox
                                label="Email Address"
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
                            <SecretTextBox
                                label="Confirm Password"
                                value={form.password_confirmation}
                                onChange={(e) => fieldChangeHandler('password_confirmation', e.target.value)}
                                error={errors.password_confirmation.show}
                                helperText={errors.password_confirmation.text}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextBox
                                label="Mobile Number"
                                value={form.phone}
                                onChange={(e) => fieldChangeHandler('phone', e.target.value)}
                                error={errors.phone.show}
                                helperText={errors.phone.text}
                                inputProps={{
                                    maxLength: 11
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <SelectBox
                                label="Doctor Type"
                                options={["MBBS", "BDS"]}
                                value={form.doctor_type}
                                onChange={(e) => fieldChangeHandler('doctor_type', e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextBox
                                label="Medical College"
                                value={form.institute}
                                onChange={(e) => fieldChangeHandler('institute', e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <SelectBox
                                label="Current Practice Area"
                                options={PRACTICE_AREAS}
                                value={form.current_practice_area}
                                onChange={(e) => fieldChangeHandler('current_practice_area', e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        size="small"
                                        checked={isAgree}
                                        onChange={(e, data) => setIsAgree(data)}
                                    />
                                }
                                label="By Clicking here you confirm that you agree with our terms & conditions"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <LoadingAppButton
                                type='submit'
                                fullWidth
                                variant="contained"
                                size="large"
                                loading={authLoader}
                                disabled={!isAgree || authLoader}
                                loadingIndicator="Loading…"
                            >
                                Create an account
                            </LoadingAppButton>
                        </Grid>
                    </Grid>
                </form>
            </AuthLayout>
        </Box>
    )
}

export default Register
