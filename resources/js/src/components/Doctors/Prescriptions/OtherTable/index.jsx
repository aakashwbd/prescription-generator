import React from 'react'
import {Stack, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {PrescribeTable} from "../../../../styles/globalStyles";
import {Box} from "@mui/system";
import {PrescriptionDeleteBtn, PrescriptionTextBox, useStyles} from "../styled";
import {Close} from "@mui/icons-material";

const OtherTable = ({form, setForm}) => {
    const classes = useStyles()

    const othersHandler = (index, field, value) => {
        let othersArr = [...form.others]
        othersArr[index][field] = value;
        setForm(prevState => ({
            ...prevState,
            others : othersArr
        }))
    }

    const addHandler = () => {
        let isEmpty = form.others.some((item) => item.name.length === 0)
        if(!isEmpty){
            setForm(prevState => ({
                ...prevState,
                others: [...prevState.others, {name: ""}]
            }))
        }
    };

    const removeHandler = (index) => {
        if(index !== 0) {
            let arr = form.others.filter((item, i) => i !== index);
            setForm(prevState => ({
                ...prevState,
                others: arr
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
                        {form.others.map((item, i) => (
                            <TableRow key={i}>
                                <TableCell>
                                    <Stack direction="row" spacing={1} alignItems="center">
                                        <PrescriptionDeleteBtn tabIndex={-1} onClick={() => removeHandler(i)}>
                                            <Close />
                                        </PrescriptionDeleteBtn>
                                        <PrescriptionTextBox
                                            size="small"
                                            value={item.name}
                                            onChange={(e) => othersHandler(i, 'name', e.target.value)}
                                            onBlur={addHandler}
                                        />
                                    </Stack>
                                </TableCell>
                                <TableCell>
                                    <PrescriptionTextBox
                                        size="small"
                                        value={item.value}
                                        onChange={(e) => othersHandler(i, 'value', e.target.value)}
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
export default OtherTable
