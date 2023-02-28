import React from 'react'
import {Stack, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {PrescribeTable} from "../../../../styles/globalStyles";
import {Box} from "@mui/system";
import {PrescriptionDeleteBtn, PrescriptionTextBox, useStyles} from "../styled";
import {Close} from "@mui/icons-material";

const OralHygieneTable = ({form, setForm}) => {
    const classes = useStyles()

    const oralChangeHandler = (index, field, value) => {
        let oralArr = [...form.oh]
        oralArr[index][field] = value;
        setForm(prevState => ({
            ...prevState,
            oh: oralArr
        }))
    }

    const addHandler = () => {
        let isEmpty = form.oh.some((item) => item.name.length === 0)
        if(!isEmpty){
            setForm(prevState => ({
                ...prevState,
                oh: [...prevState.oh, {name: ""}]
            }))
        }
    };

    const removeHandler = (index) => {
        if(index !== 0) {
            let arr = form.oh.filter((item, i) => i !== index);
            setForm(prevState => ({
                ...prevState,
                oh: arr
            }))
        }
    };

    return (
        <Box className={classes.formBox}>
            <TableContainer>
                <PrescribeTable size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{width: '80%'}}>O/H (Oral Hygiene)</TableCell>
                            <TableCell align="center" sx={{width: '20%'}}>Value</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {form.oh.map((item, i) => (
                            <TableRow key={i}>
                                <TableCell>
                                    <Stack direction="row" spacing={1} alignItems="center">
                                        <PrescriptionDeleteBtn tabIndex={-1} onClick={() => removeHandler(i)}>
                                            <Close />
                                        </PrescriptionDeleteBtn>
                                        <PrescriptionTextBox
                                            size="small"
                                            value={item.name}
                                            onChange={(e) => oralChangeHandler(i, "name", e.target.value)}
                                            onBlur={addHandler}
                                        />
                                    </Stack>
                                </TableCell>
                                <TableCell align="center">
                                    <PrescriptionTextBox
                                        size="small"
                                        className="center"
                                        value={item.value}
                                        onChange={(e) => oralChangeHandler(i, "value", e.target.value)}
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

export default OralHygieneTable
