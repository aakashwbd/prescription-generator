import React from 'react';
import {Grid} from "@mui/material";

const Headers = ({rightContent = '', leftContent =''}) => {
    return (
        <Grid container px={3} py={1} justifyContent='space-between'>
            <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
                <div dangerouslySetInnerHTML={{__html: leftContent}}></div>
            </Grid>
            <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
                <div dangerouslySetInnerHTML={{__html: rightContent}}></div>
            </Grid>
        </Grid>
    );
};

export default Headers;
