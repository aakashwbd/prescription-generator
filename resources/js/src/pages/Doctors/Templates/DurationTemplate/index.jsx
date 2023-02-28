import React from 'react'
import {Grid, Stack} from "@mui/material";
import UserDurationTemplate from "../../../../components/Doctors/Templates/DurationTemplate/UserDurationTemplate";
import SystemDurationTemplate from "../../../../components/Doctors/Templates/DurationTemplate/SystemDurationTemplate";

const DurationTemplate = () => {
    return (
        <>
            <Grid container justifyContent="center">
                <Grid item xs={12} lg={6}>
                    <Stack direction="column" spacing={4}>
                        <UserDurationTemplate />
                        <SystemDurationTemplate />
                    </Stack>
                </Grid>
            </Grid>
        </>
    )
}

export default DurationTemplate
