import React from 'react'
import {Grid, Stack} from "@mui/material";
import UserDoseTemplate from "../../../../components/Doctors/Templates/DoseTemplate/UserDoseTemplate";
import SystemDoseTemplate from "../../../../components/Doctors/Templates/DoseTemplate/SystemDoseTemplate";

const DoseTemplate = () => {
    return (
        <>
            <Grid container justifyContent="center">
                <Grid item xs={12} lg={6}>
                    <Stack direction="column" spacing={4}>
                        <UserDoseTemplate />
                        <SystemDoseTemplate />
                    </Stack>
                </Grid>
            </Grid>
        </>
    )
}

export default DoseTemplate
