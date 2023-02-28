import { Grid, Pagination, Stack, Typography } from "@mui/material";
import React from "react";
import LimitTextBox from "../LimitTextBox";
import { useStyles } from "./styled";

const AppTablePaginator = ({ count = 0, perPage = 10, from=0, to=0, total = 0, currentPage, handleChange = () => {} }) => {
    const classes = useStyles();

    return (
        <Grid
            container
            justifyContent="space-between"
            alignItems="center"
            spacing={1}
            className={classes.wrapper}
        >
            <Grid item xs={12} md={3} lg={4}>
                <Stack
                    direction="row"
                    alignItems="center"
                    className={classes.pageWrapper}
                    spacing={1}
                >
                    <Typography>Showing {from} to {to} of {total} entries</Typography>
                    <LimitTextBox label="Page" value={currentPage} onChange={(value) => handleChange("currentPage", value)} inputProps={{max: count}}/>
                </Stack>
            </Grid>
            <Grid item xs={12} md={9} lg={8}>
                <Stack
                    direction="row"
                    alignItems="center"
                    className={classes.paginateWrapper}
                    spacing={1}
                >
                    <LimitTextBox
                        label="Limit"
                        value={perPage}
                        onChange={(value) => handleChange('perPage', value)}
                    />
                    <Pagination
                        className={classes.ul}
                        count={count}
                        shape="rounded"
                        color="primary"
                        page={currentPage}
                        onChange={(e, value) => handleChange("currentPage", value)}
                    />
                </Stack>
            </Grid>
        </Grid>
    );
};

export default AppTablePaginator;
