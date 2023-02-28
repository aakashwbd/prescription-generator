import React from 'react'
import {Grid, Stack} from "@mui/material";
import UserOnExaminationOptions
    from "../../../../components/Doctors/Templates/OnExaminationOptions/UserOnExaminationOptions";

const OnExaminationOptions = () => {
    return (
        <>
            <Grid container justifyContent="center">
                <Grid item xs={12} lg={6}>
                    <Stack direction="column" spacing={4}>
                        <UserOnExaminationOptions />
                    </Stack>
                </Grid>
            </Grid>
        </>
    )
}

export default OnExaminationOptions
