import React from 'react'
import {Grid, Stack} from "@mui/material";
import UserDrugTemplate from "../../../../components/Doctors/Templates/DrugTemplate/UserDrugTemplate";
import SystemDrugTemplate from "../../../../components/Doctors/Templates/DrugTemplate/SystemDrugTemplate";

const DrugTemplate = () => {
    return (
        <>
            <Grid container justifyContent="center">
                <Grid item xs={12} lg={6}>
                    <Stack direction="column" spacing={4}>
                        <UserDrugTemplate />
                        <SystemDrugTemplate />
                    </Stack>
                </Grid>
            </Grid>
        </>
    )
}

export default DrugTemplate
