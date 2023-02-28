import React, {useEffect} from 'react'
import {TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {PrescribeTable} from "../../../../styles/globalStyles";
import {Box} from "@mui/system";
import {PrescriptionTextBox, useStyles} from "../styled";
import SelectBox from "../../../Shared/SelectBox";

const InsulinTable = ({form, setForm}) => {
    const classes = useStyles()

    const fieldChangeHandler = (field, subField, value) => {
        setForm(prevState => ({
            ...prevState,
            [field] : {
                ...prevState[field],
                [subField]: value,
            }
        }))
    }

    const insulinCalculation = (weight = 0, unit = 0, time = '' ) => {
        let total_unit = weight * unit
        let dose = ""
        if (time === 'BD'){
            dose =  `${Math.ceil(total_unit - (total_unit / 3))} + 0 + ${Math.ceil((total_unit / 3))}`
        }else if (time === 'TDS'){
            dose = `${Math.ceil((total_unit / 3))} + ${Math.ceil((total_unit / 3))} + ${Math.ceil((total_unit / 3))}`
        }
        return {total_unit, dose}
    }

    useEffect(() => {
        if(form.insulin.weight && form.insulin.unit){
            let insulin = insulinCalculation(form.insulin.weight, form.insulin.unit, form.insulin.time )
            setForm(prevState => ({
                ...prevState,
                insulin: {
                    ...prevState.insulin,
                    dose : insulin.dose,
                    result: insulin.total_unit
                }
            }))
        }else{
            setForm(prevState => ({
                ...prevState,
                insulin: {
                    ...prevState.insulin,
                    dose : "",
                    result: ""
                }
            }))
        }

    }, [form.insulin.weight, form.insulin.unit, form.insulin.time]);

    return (
        <Box className={classes.formBox} mb={2}>
            <TableContainer>
                <PrescribeTable size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>Particulars</TableCell>
                            <TableCell>Value</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>Weight (Kg)</TableCell>
                            <TableCell>
                                <PrescriptionTextBox
                                    size="small"
                                    value={form.insulin.weight}
                                    onChange={(e) => fieldChangeHandler('insulin', 'weight', e.target.value)}
                                />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Unit/Kg</TableCell>
                            <TableCell>
                                <PrescriptionTextBox
                                    size="small"
                                    value={form.insulin.unit}
                                    onChange={(e) => fieldChangeHandler('insulin','unit', e.target.value)}
                                />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Time</TableCell>
                            <TableCell>
                                <SelectBox
                                    className={classes.selectBox}
                                    size='small'
                                    options={['BD', "TDS", 'Mono']}
                                    value={form.insulin.time}
                                    onChange={(e) => fieldChangeHandler('insulin','time', e.target.value)}
                                />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Total Unit</TableCell>
                            <TableCell>
                                <PrescriptionTextBox
                                    size="small"
                                    value={form.insulin.result}
                                    onChange={(e) => fieldChangeHandler('insulin','result', e.target.value)}
                                />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Dose</TableCell>
                            <TableCell>
                                <PrescriptionTextBox
                                    size="small"
                                    value={form.insulin.dose}
                                    onChange={(e) => fieldChangeHandler('insulin','dose', e.target.value)}
                                />
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </PrescribeTable>
            </TableContainer>
        </Box>
    )
}

export default InsulinTable
