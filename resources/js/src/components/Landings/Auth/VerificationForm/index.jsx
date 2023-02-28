import React, {useEffect, useState} from 'react';
import {AppButton, LoadingAppButton} from "../../../../styles/globalStyles";
import OTPInput, {ResendOTP} from "otp-input-react";
import {makeStyles} from "@mui/styles";
import {Box, Typography} from "@mui/material";
import useStore from "../../../../stores";
import ApiUrls from "../../../../stores/apiUrls";
import apiUrls from "../../../../stores/apiUrls";
import {LandingUrls} from "../../../../routes/siteUrls";
import {useNavigate} from "react-router-dom";

const useStyles = makeStyles(theme => ({
    heading: {
        fontWeight: '500 !important',
    },
    input: {
        // justifyContent: 'center',
        margin: '30px 0px !important',
        "& input": {
            fontSize: '20px !important',
            height: '60px !important',
            width: '50px !important',
            border: '1px solid ' + theme.palette.primary.main + '!important',
            borderRadius: '4px !important',
        },
    }
}))

const ResendButton = ({...props}) => {
    return(
        <LoadingAppButton
            variant='outlined'
            {...props}
        >
            Resend
        </LoadingAppButton>
    )
}
const renderTime = (remainingTime) => {
    return <span>{remainingTime} seconds remaining</span>;
}

const VerificationForm = ({data}) => {
    const classes = useStyles()
    const navigate = useNavigate()
    const verifyOTP = useStore(state => state.verifyOTP)
    const resend = useStore(state => state.resend)
    const authLoader = useStore(state => state.authLoader)


    const [form, setForm] = useState({
        email: '',
        code: '',
    })

    const fieldChangeHandler = (field, value) => {
        setForm((prevState) => ({
            ...prevState,
            [field]: value
        }))
    }

    const resendHandler = () => {
        let resendData = {
            email: data?.data?.email
        }
        resend(apiUrls.auth.resend, resendData, ()=>{
            setForm(prevState => ({
                ...prevState,
                code: ""
            }))
        })
    }

    const submitHandler = (e) => {
        e.preventDefault()
        let formData = {...form};
        let url = ApiUrls.auth.register_verify
        if(data.verificationType === 'reset'){
            url = ApiUrls.auth.reset.verify
        }else if (data.verificationType === 'login'){
            url = ApiUrls.auth.register_verify
        }
        verifyOTP(data.verificationType, url, formData, ()=>{
            if(data.verificationType === 'reset'){
                navigate(LandingUrls.AUTH.RESET_PASSWORD)
            }
        })
    }

    useEffect(() => {
        if(data && Object.keys(data.data).length > 0){
            setForm((prevState)=>({
                ...prevState,
                email: data.data.email
            }))
        }
    }, [data]);

    return (
        <>
            <Typography variant='body1'>
                Verification for {data?.data?.email}
            </Typography>
            <OTPInput
                value={form.code}
                onChange={(value)=>fieldChangeHandler('code', value)}
                autoFocus={true}
                OTPLength={6}
                otpType="number"
                disabled={false}
                className={classes.input}
            />
            <LoadingAppButton
                fullWidth
                variant="contained"
                size="large"
                onClick={submitHandler}
                disabled={form.code.length < 6 || authLoader}
                loading={authLoader}
                loadingIndicator="Loading…"
            >
                Verify OTP
            </LoadingAppButton>

            <Box mt={5}>
                <ResendOTP
                    renderButton={ResendButton}
                    maxTime={60}
                    renderTime={renderTime}
                    onResendClick={resendHandler}
                />
            </Box>
        </>
    );
};

export default VerificationForm;
