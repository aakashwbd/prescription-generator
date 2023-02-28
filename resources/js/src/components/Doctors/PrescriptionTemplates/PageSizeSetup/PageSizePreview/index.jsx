import React from 'react'
import {Box} from "@mui/system";
import {useStyles} from "./styled";
import {Typography} from "@mui/material";

const PageSizePreview = ({data}) => {
    const classes = useStyles()
    return (
        <Box
            className={classes.fullPage}
            sx={{
                width: data?.prescription_size?.width + 'cm',
                height:  data?.prescription_size?.height + 'cm'
            }}
        >
            <Box
                className={classes.section}
                sx={{
                    width: data?.header_size?.width + 'cm',
                    height: data?.header_size?.height + 'cm'
                }}
            ></Box>
            <Box
                className={classes.section}
                sx={{
                    width: data?.patient_info_size?.width  + 'cm',
                    height: data?.patient_info_size?.height  + 'cm'
                }}
            ></Box>

            <Box display="flex">
                <Box
                    className={`${classes.section} ${classes.leftSection}`}
                    sx={{
                        width: data?.history_size?.width + 'cm',
                        height: data?.history_size?.height + 'cm'
                    }}
                ></Box>
                <Box
                    className={classes.section}
                    sx={{
                        width: data?.prescribe_size?.width + 'cm',
                        height: data?.prescribe_size?.height + 'cm'
                    }}
                    p={2}
                >
                    <Typography variant="h3">Rx.</Typography>
                </Box>
            </Box>

            <Box className={classes.section} sx={{width: data?.footer_size?.width + 'cm', height: data?.footer_size?.height + 'cm'}}></Box>
        </Box>
    )
}

export default PageSizePreview
