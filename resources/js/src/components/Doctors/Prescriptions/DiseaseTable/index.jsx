import React, {useEffect, useState} from 'react'
import {Stack, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {PrescribeTable} from "../../../../styles/globalStyles";
import {Box} from "@mui/system";
import {PrescriptionDeleteBtn, PrescriptionTextBox, useStyles} from "../styled";
import {Close} from "@mui/icons-material";

const DiseaseTable = ({form, setForm, debouncedHandler = () =>{}}) => {
    const classes = useStyles()

    const dxChangeHandler = (index, field, value) => {
        let diseaseArr = [...form.dx]
        diseaseArr[index][field] = value;
        setForm(prevState => ({
            ...prevState,
            dx: diseaseArr
        }))
    }

    const addHandler = () => {
        let isEmpty = form.dx.some((item) => item.name.length === 0)
        if(!isEmpty){
            setForm(prevState => ({
                ...prevState,
                dx: [...prevState.dx, {name: ""}]
            }))
        }
    };

    const removeHandler = (index) => {
        if(index !== 0) {
            let arr = form.dx.filter((item, i) => i !== index);
            setForm(prevState => ({
                ...prevState,
                dx: arr
            }))
        }
    };

    return (
        <Box className={classes.formBox}>
            <TableContainer>
                <PrescribeTable size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>D/X (Disease/Condition)</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {form.dx.map((item, i) => (
                            <TableRow key={i}>
                                <TableCell>
                                    <Stack direction="row" spacing={1} alignItems="center">
                                        <PrescriptionDeleteBtn tabIndex={-1} onClick={() => removeHandler(i)}>
                                            <Close />
                                        </PrescriptionDeleteBtn>
                                        <PrescriptionTextBox
                                            size="small"
                                            value={item.name}
                                            onChange={(e) => dxChangeHandler(i, 'name', e.target.value)}
                                            onBlur={addHandler}
                                        />
                                    </Stack>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </PrescribeTable>
            </TableContainer>
        </Box>
    )
}

export default DiseaseTable
