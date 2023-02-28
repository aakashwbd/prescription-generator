import React from 'react'
import {Stack, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {PrescribeTable} from "../../../../styles/globalStyles";
import {Box} from "@mui/system";
import {PrescriptionDeleteBtn, PrescriptionTextBox, useStyles} from "../styled";
import {Close} from "@mui/icons-material";

const HistoryTable = ({form, setForm}) => {
    const classes = useStyles()

    const historyHandler = (index, field, value) => {
        let historyArr = [...form.past_history]
        historyArr[index][field] = value;
        setForm(prevState => ({
            ...prevState,
            past_history : historyArr
        }))
    }

    const addHandler = () => {
        let isEmpty = form.past_history.some((item) => item.name.length === 0)
        if(!isEmpty){
            setForm(prevState => ({
                ...prevState,
                past_history: [...prevState.past_history, {name: ""}]
            }))
        }
    };

    const removeHandler = (index) => {
        if(index !== 0) {
            let arr = form.past_history.filter((item, i) => i !== index);
            setForm(prevState => ({
                ...prevState,
                past_history: arr
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
                        {form.past_history.map((item, i) => (
                            <TableRow>
                                <TableCell>
                                    <Stack direction="row" spacing={1} alignItems="center">
                                        <PrescriptionDeleteBtn tabIndex={-1} onClick={() => removeHandler(i)}>
                                            <Close />
                                        </PrescriptionDeleteBtn>
                                        <PrescriptionTextBox
                                            size="small"
                                            value={item.name}
                                            onChange={(e) => historyHandler(i, 'name', e.target.value)}
                                            onBlur={addHandler}
                                        />
                                    </Stack>
                                </TableCell>
                                <TableCell>
                                    <PrescriptionTextBox
                                        size="small"
                                        value={item.value}
                                        onChange={(e) => historyHandler(i, 'value', e.target.value)}
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

export default HistoryTable
