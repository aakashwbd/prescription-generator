import React from 'react'
import {Stack, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {PrescribeTable} from "../../../../styles/globalStyles";
import {Box} from "@mui/system";
import {PrescriptionDeleteBtn, PrescriptionTextBox, useStyles} from "../styled";
import {Close} from "@mui/icons-material";

const SalientFeatureTable = ({form, setForm}) => {
    const classes = useStyles()

    const salientHandler = (index, field, value) => {
        let salientArr = [...form.salient_features]
        salientArr[index][field] = value;
        setForm(prevState => ({
            ...prevState,
            salient_features : salientArr
        }))
    }

    const addHandler = () => {
        let isEmpty = form.salient_features.some((item) => item.name.length === 0)
        if(!isEmpty){
            setForm(prevState => ({
                ...prevState,
                salient_features: [...prevState.salient_features, {name: ""}]
            }))
        }
    };

    const removeHandler = (index) => {
        if(index !== 0) {
            let arr = form.salient_features.filter((item, i) => i !== index);
            setForm(prevState => ({
                ...prevState,
                salient_features: arr
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
                        {form.salient_features.map((item, i) => (
                            <TableRow>
                                <TableCell>
                                    <Stack direction="row" spacing={1} alignItems="center">
                                        <PrescriptionDeleteBtn tabIndex={-1} onClick={() => removeHandler(i)}>
                                            <Close />
                                        </PrescriptionDeleteBtn>
                                        <PrescriptionTextBox
                                            size="small"
                                            value={item.name}
                                            onChange={(e) => salientHandler(i, 'name', e.target.value)}
                                            onBlur={addHandler}
                                        />
                                    </Stack>
                                </TableCell>
                                <TableCell>
                                    <PrescriptionTextBox
                                        size="small"
                                        value={item.value}
                                        onChange={(e) => salientHandler(i, 'value', e.target.value)}
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

export default SalientFeatureTable
