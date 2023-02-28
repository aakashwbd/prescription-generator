import React, {useEffect, useState} from 'react'
import {Stack, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {PrescribeTable} from "../../../../styles/globalStyles";
import {Box} from "@mui/system";
import {PrescriptionDeleteBtn, PrescriptionTextBox, useStyles} from "../styled";
import {Close} from "@mui/icons-material";

const MalignantHypothermiaTable = ({form, setForm}) => {
    const classes = useStyles()

    const malignantChangeHandler = (index, field, value) => {
        let malignantArr = [...form.mh]
        malignantArr[index][field] = value;
        setForm(prevState => ({
            ...prevState,
            mh: malignantArr
        }))
    }

    const addHandler = () => {
        let isEmpty = form.mh.some((item) => item.name.length === 0)
        if(!isEmpty){
            setForm(prevState => ({
                ...prevState,
                mh: [...prevState.mh, {name: ""}]
            }))
        }
    };

    const removeHandler = (index) => {
        if(index !== 0) {
            let arr = form.mh.filter((item, i) => i !== index);
            setForm(prevState => ({
                ...prevState,
                mh: arr
            }))
        }
    };
    return (
        <Box className={classes.formBox}>
            <TableContainer>
                <PrescribeTable size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{width: '80%'}}>M/H (Malignant Hypothermia)</TableCell>
                            <TableCell align="center" sx={{width: '20%'}}>Value</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {form.mh.map((item, i) => (
                            <TableRow key={i}>
                                <TableCell>
                                    <Stack direction="row" spacing={1} alignItems="center">
                                        <PrescriptionDeleteBtn tabIndex={-1} onClick={() => removeHandler(i)}>
                                            <Close />
                                        </PrescriptionDeleteBtn>
                                        <PrescriptionTextBox
                                            size="small"
                                            value={item.name}
                                            onChange={(e) => malignantChangeHandler(i, 'name', e.target.value)}
                                            onBlur={addHandler}
                                        />
                                    </Stack>
                                </TableCell>
                                <TableCell align="center">
                                    <PrescriptionTextBox
                                        size="small"
                                        className="center"
                                        value={item.value}
                                        onChange={(e) => malignantChangeHandler(i, 'value', e.target.value)}
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

export default MalignantHypothermiaTable
