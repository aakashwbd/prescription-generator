import React, {useEffect} from 'react'
import AppCard from "../../components/Shared/AppCard";
import {Avatar, Container, Grid, Stack, Typography} from "@mui/material";
import {makeStyles} from "@mui/styles";
import Colors from "../../constants/Colors";
import {Box} from "@mui/system";
import Images from "../../constants/Images";
import CrudDialog from "../../components/Shared/CrudDialog";
import useStore from "../../stores";
import VerificationForm from "../../components/Landings/Auth/VerificationForm";
import {useNavigate} from "react-router-dom";
import {DoctorUrls} from "../../routes/siteUrls";
import PageLoading from "../../components/Shared/PageLoading";

const useStyles = makeStyles((theme) => ({
    card: {
        backgroundColor: `${Colors.primary.light} !important`,
        border: '0 !important',
        maxHeight: 'initial !important'
    },
    logo: {
        width: '100px !important',
        height: '100px !important',
    },
    dividerGrid: {
        borderRight: `2px solid ${Colors.light.regular}`
    },
    sidebarBox: {
        width: '100%',
        height: '100%'
    }
}))

const AuthLayout = ({children}) => {
    const classes = useStyles()
    const navigate = useNavigate()

    const authData = useStore(state => state.authData)
    const currentUser = useStore(state => state.currentUser)
    const isAuthenticate = useStore(state => state.isAuthenticate)

    useEffect(() => {
        if(isAuthenticate && currentUser && Object.keys(currentUser).length > 0){
            navigate(DoctorUrls.PRESCRIPTIONS.CREATE)
        }
    }, [currentUser, isAuthenticate]);

    return (
        <Container maxWidth="lg">
            <AppCard
                className={classes.card}
                content={
                    <Container maxWidth="md">
                        <Grid container py={8} justifyContent="space-between">
                            <Grid item xs={12} sm={6} lg={6} className={classes.dividerGrid}>
                                <Box display="flex" flexDirection="column" justifyContent="center" className={classes.sidebarBox}>
                                    <Stack alignItems="center" direction="row" spacing={2}>
                                        <Avatar src={Images.UserAvatar} className={classes.logo}/>
                                        <Typography variant="h3" color="primary">Site Name</Typography>
                                    </Stack>
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={6} lg={5}>
                                {children}
                            </Grid>
                        </Grid>
                    </Container>
                }
            />
            <CrudDialog
                open={authData.authDialog}
                title='Verify OTP'
            >
                <VerificationForm data={authData}/>
            </CrudDialog>
        </Container>
    )
}

export default AuthLayout
