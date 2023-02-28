import React from 'react'
import {Grid, Stack} from "@mui/material";
import UserOnExaminationTemplate from "../../../../components/Doctors/Templates/OnExaminationTemplate/UserOnExaminationTemplate";
import SystemOnExaminationTemplate from "../../../../components/Doctors/Templates/OnExaminationTemplate/SystemOnExaminationTemplate";

const OnExaminationTemplate = () => {
    return (
        <>
            <Grid container justifyContent="center">
                <Grid item xs={12} lg={6}>
                    <Stack direction="column" spacing={4}>
                        <UserOnExaminationTemplate />
                        <SystemOnExaminationTemplate />
                    </Stack>
                </Grid>
            </Grid>
        </>
    )
}

export default OnExaminationTemplate
