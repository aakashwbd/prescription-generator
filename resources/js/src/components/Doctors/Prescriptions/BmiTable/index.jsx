import React, {useEffect} from 'react'
import {TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {PrescribeTable} from "../../../../styles/globalStyles";
import {Box} from "@mui/system";
import {PrescriptionTextBox, useStyles} from "../styled";
import {bmiCalculate, bmiClassStatus, idealWeight} from "../../../../utils/helpers";

const BmiTable = ({form, setForm}) => {
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

    useEffect(() => {
        if(form.bmi.weight && form.bmi.height_feet){
            let result = Math.round(bmiCalculate(form.bmi.weight, form.bmi.height_feet, form.bmi.height_inch) * 100) / 100
            let status = bmiClassStatus(result)
            let iW = Math.round(idealWeight(form.gender, form.bmi.height_feet, form.bmi.height_inch) * 100) / 100

            setForm(prevState => ({
                ...prevState,
                bmi: {
                    ...prevState.bmi,
                    result: result,
                    class: status,
                    ideal_weight: iW
                }
            }))
        }
    }, [form.bmi.weight, form.bmi.height_feet, form.bmi.height_inch, form.gender]);

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
                                    value={form?.bmi?.weight}
                                    onChange={(e) => fieldChangeHandler('bmi', 'weight', e.target.value)}
                                />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Height (Feet)</TableCell>
                            <TableCell>
                                <PrescriptionTextBox
                                    size="small"
                                    value={form?.bmi?.height_feet}
                                    onChange={(e) => fieldChangeHandler('bmi','height_feet', e.target.value)}
                                />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Height (Inch)</TableCell>
                            <TableCell>
                                <PrescriptionTextBox
                                    size="small"
                                    value={form?.bmi?.height_inch}
                                    onChange={(e) => fieldChangeHandler('bmi','height_inch', e.target.value)}
                                />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>BMI</TableCell>
                            <TableCell>
                                <PrescriptionTextBox
                                    size="small"
                                    value={form?.bmi?.result}
                                    onChange={(e) => fieldChangeHandler('bmi','result', e.target.value)}
                                />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Class</TableCell>
                            <TableCell>
                                <PrescriptionTextBox
                                    size="small"
                                    value={form?.bmi?.class}
                                    onChange={(e) => fieldChangeHandler('bmi','class', e.target.value)}
                                />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Ideal Weight</TableCell>
                            <TableCell>
                                <PrescriptionTextBox
                                    size="small"
                                    value={form?.bmi?.ideal_weight}
                                    onChange={(e) => fieldChangeHandler('bmi','ideal_weight', e.target.value)}
                                />
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </PrescribeTable>
            </TableContainer>
        </Box>
    )
}

export default BmiTable
