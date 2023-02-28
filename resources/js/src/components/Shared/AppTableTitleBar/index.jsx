import { IconButton, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import {
    BsSearch,
    FaFilter,
    IoMdAddCircle,
    SlArrowDown,
} from "react-icons/all";
import { AppButton } from "../../../styles/globalStyles";
import { useStyles } from "./styled";

const AppTableTitleBar = ({
                              title,
                              controller,
                              // search = false,
                              // searchHandler = () => {},
                              // filter = false,
                              // filterHandler = () => {},
                              // add = false,
                              // addHandler = () => {}
}) => {
    const classes = useStyles();

    return (
        <Box className={classes.titleBox} p={1} borderRadius={2} mb={3}>
            <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                justifyContent="space-between"
                className={classes.stack}
            >
                <Typography
                    variant="h6"
                    color="primary"
                    pl={2}
                    className={classes.title}
                    dangerouslySetInnerHTML={{ __html: title }}
                >
                    {/*{title}*/}
                </Typography>

                <Stack direction="row" spacing={1} alignItems="center">
                    {controller}
                    {/*{search && (*/}
                    {/*    <IconButton className={classes.searchBtn} size="small" onClick={searchHandler}>*/}
                    {/*        <BsSearch size={16} />*/}
                    {/*    </IconButton>*/}
                    {/*)}*/}

                    {/*{filter && (*/}
                    {/*    <AppButton*/}
                    {/*        variant="outlined"*/}
                    {/*        color="primary"*/}
                    {/*        size="small"*/}
                    {/*        startIcon={<FaFilter />}*/}
                    {/*        endIcon={<SlArrowDown size={15} />}*/}
                    {/*        onClick={filterHandler}*/}
                    {/*    >*/}
                    {/*        Filter*/}
                    {/*    </AppButton>*/}
                    {/*)}*/}

                    {/*{add && (*/}
                    {/*    <AppButton*/}
                    {/*        variant="contained"*/}
                    {/*        color="primary"*/}
                    {/*        size="small"*/}
                    {/*        startIcon={<IoMdAddCircle />}*/}
                    {/*        onClick={addHandler}*/}
                    {/*    >*/}
                    {/*        Add New*/}
                    {/*    </AppButton>*/}
                    {/*)}*/}
                </Stack>

            </Stack>
        </Box>
    );
};

export default AppTableTitleBar;
