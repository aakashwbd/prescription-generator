import React, {useEffect, useState} from 'react'
import {Stack, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {PrescribeTable} from "../../../../styles/globalStyles";
import {Box} from "@mui/system";
import {PrescriptionDeleteBtn, PrescriptionTextBox, useStyles} from "../styled";
import {Close} from "@mui/icons-material";

const OTNoteTable = ({form, setForm}) => {
    const classes = useStyles()

    const noteHandler = (index, field, value) => {
        let noteArr = [...form.ot_notes]
        noteArr[index][field] = value;
        setForm(prevState => ({
            ...prevState,
            ot_notes : noteArr
        }))
    }

    const addHandler = () => {
        let isEmpty = form.ot_notes.some((item) => item.name.length === 0)
        if(!isEmpty){
            setForm(prevState => ({
                ...prevState,
                ot_notes: [...prevState.ot_notes, {name: ""}]
            }))
        }
    };

    const removeHandler = (index) => {
        if(index !== 0) {
            let arr = form.ot_notes.filter((item, i) => i !== index);
            setForm(prevState => ({
                ...prevState,
                ot_notes: arr
            }))
        }
    };

    return (
        <Box className={classes.formBox} mb={2}>
            <TableContainer>
                <PrescribeTable size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{width: '40%'}}>Particulars</TableCell>
                            <TableCell sx={{width: '60%'}}>Value</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {form.ot_notes.map((item, i) => (
                            <TableRow key={i}>
                                <TableCell>
                                    <Stack direction="row" spacing={1} alignItems="center">
                                        <PrescriptionDeleteBtn tabIndex={-1} onClick={() => removeHandler(i)}>
                                            <Close />
                                        </PrescriptionDeleteBtn>
                                        <PrescriptionTextBox
                                            size="small"
                                            value={item.name}
                                            onChange={(e) => noteHandler(i, 'name', e.target.value)}
                                            onBlur={addHandler}
                                        />
                                    </Stack>
                                </TableCell>
                                <TableCell>
                                    <PrescriptionTextBox
                                        size="small"
                                        value={item.value}
                                        onChange={(e) => noteHandler(i, 'value', e.target.value)}
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

export default OTNoteTable
