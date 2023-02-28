import React from 'react'
import {Grid, Stack} from "@mui/material";
import UserTreatmentTemplate from "../../../../components/Doctors/Templates/TreatmentTemplate/UserTreatmentTemplate";
import SystemTreatmentTemplate from "../../../../components/Doctors/Templates/TreatmentTemplate/SystemTreatmentTemplate";

const TreatmentTemplate = () => {
    return (
        <>
            <Grid container justifyContent="center">
                <Grid item xs={12} lg={6}>
                    <Stack direction="column" spacing={4}>
                        <UserTreatmentTemplate />
                        <SystemTreatmentTemplate />
                    </Stack>
                </Grid>
            </Grid>
        </>
    )
}

export default TreatmentTemplate
