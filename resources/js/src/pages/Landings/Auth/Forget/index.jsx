import React, {useEffect, useState} from 'react'
import AuthLayout from "../../../../layouts/AuthLayout";
import {Grid, Typography} from "@mui/material";
import {Box} from "@mui/system";
import TextBox from "../../../../components/Shared/TextBox";
import {AppButton, LoadingAppButton} from "../../../../styles/globalStyles";
import {isRequiredValidate} from "../../../../utils/validateHelpers";
import validator from 'validator';
import useStore from "../../../../stores";

const Forget = () => {
    const resetRequest = useStore(state => state.resetRequest)
    const setAuthValidateErrors = useStore(state => state.setAuthValidateErrors)
    const authValidateErrors = useStore(state => state.authValidateErrors)
    const authLoader = useStore(state => state.authLoader)

    const [form, setForm] = useState({
        email: ""
    })

    const [errors, setErrors] = useState({
        email: {text: '', show: false}
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

        if(!emailValidate){
            resetRequest(form)
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
            setErrors({email: {text: '', show: false}})
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
                    <Typography variant="h3" color="primary">Forgot Your Password?</Typography>
                </Box>
                <form onSubmit={submitHandler}>
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
                            <LoadingAppButton
                                type='submit'
                                fullWidth
                                variant="contained"
                                size="large"
                                loading={authLoader}
                                disabled={authLoader}
                                loadingIndicator="Loading…"
                            >
                                Forget Password
                            </LoadingAppButton>
                        </Grid>
                    </Grid>
                </form>
            </AuthLayout>
        </Box>
    )
}

export default Forget
