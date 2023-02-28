import React, {useEffect, useState} from 'react'
import {Stack, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {PrescribeTable} from "../../../../styles/globalStyles";
import {Box} from "@mui/system";
import {PrescriptionDeleteBtn, PrescriptionTextBox, useStyles} from "../styled";
import {Close} from "@mui/icons-material";
import DateBox from "../../../Shared/DateBox";

const ReportEntryTable = ({form, setForm, debouncedHandler = () => {}}) => {
    const classes = useStyles()

    const reportChangeHandler = (index, field, value) => {
        let reportArr = [...form.report_history]
        reportArr[index][field] = value;
        setForm(prevState => ({
            ...prevState,
            report_history : reportArr
        }))
    }

    const addHandler = () => {
        let isEmpty = form.report_history.some((item) => item.name.length === 0)
        if(!isEmpty){
            setForm(prevState => ({
                ...prevState,
                report_history: [...prevState.report_history, { date : new Date(), name: "", value : "", unit: ""}]
            }))
        }
    };

    const removeHandler = (index) => {
        if(index !== 0) {
            let arr = form.report_history.filter((item, i) => i !== index);
            setForm(prevState => ({
                ...prevState,
                report_history: arr
            }))
        }
    };



    return (
        <Box className={classes.formBox} mb={2}>
            <TableContainer>
                <PrescribeTable size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" sx={{width: '20%'}}>Date</TableCell>
                            <TableCell sx={{width: '40%'}}>Report name</TableCell>
                            <TableCell align="center" sx={{width: '20%'}}>Result/Value</TableCell>
                            <TableCell align="center" sx={{width: '20%'}}>Unit</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {form.report_history.map((item, i) => (
                            <TableRow key={i}>
                                <TableCell>
                                    <Stack direction="row" spacing={1} alignItems="center">
                                        <PrescriptionDeleteBtn tabIndex={-1} onClick={() => removeHandler(i)}>
                                            <Close />
                                        </PrescriptionDeleteBtn>
                                        <DateBox
                                            size="small"
                                            value={item.date}
                                            onChange={(e) => reportChangeHandler(i, 'date', e.target.value)}
                                        />
                                    </Stack>
                                </TableCell>
                                <TableCell align="center">
                                    <PrescriptionTextBox
                                        size="small"
                                        value={item.name}
                                        onChange={(e) => reportChangeHandler(i, 'name', e.target.value)}
                                        onBlur={addHandler}
                                    />
                                </TableCell>
                                <TableCell align="center">
                                    <PrescriptionTextBox
                                        size="small"
                                        className="center"
                                        value={item.value}
                                        onChange={(e) => reportChangeHandler(i, 'value', e.target.value)}
                                    />
                                </TableCell>
                                <TableCell align="center">
                                    <PrescriptionTextBox
                                        size="small"
                                        className="center"
                                        value={item.unit}
                                        onChange={(e) => reportChangeHandler(i, 'unit', e.target.value)}
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </PrescribeTable>
            </TableContainer>
        </Box>
    )
}

export default ReportEntryTable
