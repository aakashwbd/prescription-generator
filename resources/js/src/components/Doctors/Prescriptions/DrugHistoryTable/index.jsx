import React from 'react'
import {TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {PrescribeTable} from "../../../../styles/globalStyles";
import {Box} from "@mui/system";
import {useStyles} from "../styled";

const DrugHistoryTable = () => {
    const classes = useStyles()

    return (
        <Box className={classes.formBox}>
            <TableContainer>
                <PrescribeTable size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>Drug History</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>Fever for  daysCough</TableCell>
                        </TableRow>
                    </TableBody>
                </PrescribeTable>
            </TableContainer>
        </Box>
    )
}

export default DrugHistoryTable
