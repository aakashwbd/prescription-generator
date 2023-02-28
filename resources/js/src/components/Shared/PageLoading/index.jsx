import React from 'react'
import {Dna} from "react-loader-spinner";
import {Box} from "@mui/system";
import {useStyles} from "./styled";

const PageLoading = () => {
    const classes = useStyles()

    return (
        <Box className={classes.wrapper}>
            <Dna
                visible={true}
                height="150"
                width="150"
                ariaLabel="dna-loading"
                wrapperStyle={{}}
                wrapperClass="dna-wrapper"
            />
        </Box>
    )
}

export default PageLoading
