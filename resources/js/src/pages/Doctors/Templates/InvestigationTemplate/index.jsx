import React from 'react'
import {Grid, Stack} from "@mui/material";
import UserInvestigationTemplate from "../../../../components/Doctors/Templates/InvestigationTemplate/UserInvestigationTemplate";
import SystemInvestigationTemplate from "../../../../components/Doctors/Templates/InvestigationTemplate/SystemInvestigationTemplate";

const InvestigationTemplate = () => {
    return (
        <>
            <Grid container justifyContent="center">
                <Grid item xs={12} lg={6}>
                    <Stack direction="column" spacing={4}>
                        <UserInvestigationTemplate />
                        <SystemInvestigationTemplate />
                    </Stack>
                </Grid>
            </Grid>
        </>
    )
}

export default InvestigationTemplate
