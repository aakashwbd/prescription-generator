import React from 'react'
import {Grid, Stack} from "@mui/material";
import UserCubicCentimeterTemplate from "../../../../components/Doctors/Templates/CubicCentimeterTemplate/UserCubicCentimeterTemplate";
import SystemCubicCentimeterTemplate from "../../../../components/Doctors/Templates/CubicCentimeterTemplate/SystemCubicCentimeterTemplate";

const CubicCentimeterTemplate = () => {
    return (
        <>
            <Grid container justifyContent="center">
                <Grid item xs={12} lg={6}>
                    <Stack direction="column" spacing={4}>
                        <UserCubicCentimeterTemplate />
                        <SystemCubicCentimeterTemplate />
                    </Stack>
                </Grid>
            </Grid>
        </>
    )
}

export default CubicCentimeterTemplate
