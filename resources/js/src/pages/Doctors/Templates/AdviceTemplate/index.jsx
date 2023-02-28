import React from 'react'
import {Grid, Stack} from "@mui/material";
import UserAdviceTemplate from "../../../../components/Doctors/Templates/AdviceTemplate/UserAdviceTemplate";
import SystemAdviceTemplate from "../../../../components/Doctors/Templates/AdviceTemplate/SystemAdviceTemplate";

const AdviceTemplate = () => {
    return (
        <>
            <Grid container justifyContent="center">
                <Grid item xs={12} lg={6}>
                    <Stack direction="column" spacing={4}>
                        <UserAdviceTemplate />
                        <SystemAdviceTemplate />
                    </Stack>
                </Grid>
            </Grid>
        </>
    )
}

export default AdviceTemplate
