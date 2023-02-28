import {Avatar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography,} from "@mui/material";
import {Box} from "@mui/system";
import React from "react";
import Images from "../../../constants/Images";
import {useStyles} from "./styled";
import LoadingSkeleton from "../LoadingSkeleton";

const AppTable = ({
                      titleBar,
                      headers = [],
                      content,
                      found = false,
                      paginator,
                      isLoading = false
                  }) => {
    const classes = useStyles();

    return (
        <Box>
            {titleBar}

            {found ? (
                <TableContainer className={classes.tableContainer}>
                    {isLoading ? <LoadingSkeleton/> : (
                        <Table className={classes.table}>
                            <TableHead>
                                <TableRow>
                                    {headers.map((item, i) =>
                                        typeof item === "string" ? (
                                            <TableCell key={i}>{item}</TableCell>
                                        ) : (
                                            <TableCell
                                                key={i}
                                                align={
                                                    item.align ? item.align : "left"
                                                }
                                            >
                                                {item.field}
                                            </TableCell>
                                        )
                                    )}
                                </TableRow>
                            </TableHead>
                            <TableBody>{content}</TableBody>
                        </Table>
                    )}
                </TableContainer>
            ) : (
                <Box textAlign="center">
                    <Avatar
                        className={classes.emptyImage}
                        src={Images.EmptyTable}
                    />
                    <Typography variant="h5" py={3}>
                        No Data Found
                    </Typography>
                </Box>
            )}
            <Box mt={3}>{paginator}</Box>
        </Box>
    );
};

export default AppTable;
