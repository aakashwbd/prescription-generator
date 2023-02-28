import React, {useEffect} from 'react'
import {TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {PrescribeTable} from "../../../../styles/globalStyles";
import {Box} from "@mui/system";
import {PrescriptionTextBox, useStyles} from "../styled";
import DateBox from "../../../Shared/DateBox";
import {bmiCalculate, isNegative} from "../../../../utils/helpers";

const ZScoreTable = ({form, setForm}) => {
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

    const zScoreCalculation = (dob, weight = 0) => {
        let today = new Date();
        let diffTime = Math.abs(dob - today);
        let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        let result = ""
        if(diffDays <= 365){
            let month =  Math.floor(diffDays / 30)
             result =  Math.round(((month + 9)/2) * 100) / 100
        }else if (diffDays >= 366 && diffDays <= 1825){
            let year =  Math.round(diffDays / 365)
            result =  Math.round((2 * (year + 5)) * 100) / 100
        }
        let weightDiff = weight - result
        return {diffDays, result, weightDiff}
    }


    useEffect(() => {
        if(form.z_score.dob && form.z_score.weight){
            let zScore =  zScoreCalculation(form.z_score.dob, form.z_score.weight)

            setForm(prevState => ({
                ...prevState,
                z_score: {
                    ...prevState.z_score,
                    days: zScore.diffDays,
                    ideal_weight: zScore.result,
                    weight_excess : isNegative(zScore.weightDiff) ? `${zScore.weightDiff.toFixed(2)} kg is less` : `${zScore.weightDiff.toFixed(2)} kg is excess`
                }
            }))
        }
    }, [form.z_score.dob, form.z_score.weight]);


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
                            <TableCell>Date Of Birth</TableCell>
                            <TableCell>
                                <DateBox
                                    size='small'
                                    value={form.z_score.dob}
                                    onChange={(data) => fieldChangeHandler('z_score', 'dob', data)}
                                />
                                {/*<PrescriptionTextBox*/}
                                {/*    size="small"*/}
                                {/*    value={form.z_score.dob}*/}
                                {/*    onChange={(e) => fieldChangeHandler('z_score', 'dob', e.target.value)}*/}
                                {/*/>*/}
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Gender</TableCell>
                            <TableCell>
                                <PrescriptionTextBox
                                    size="small"
                                    value={form.z_score.gender}
                                    onChange={(e) => fieldChangeHandler('z_score','gender', e.target.value)}
                                />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Weight (Kg)</TableCell>
                            <TableCell>
                                <PrescriptionTextBox
                                    size="small"
                                    value={form.z_score.weight}
                                    onChange={(e) => fieldChangeHandler('z_score','weight', e.target.value)}
                                />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Result</TableCell>
                            <TableCell>
                                <PrescriptionTextBox
                                    size="small"
                                    value={form.z_score.result}
                                    onChange={(e) => fieldChangeHandler("z_score",'result', e.target.value)}
                                />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Days</TableCell>
                            <TableCell>
                                <PrescriptionTextBox
                                    size="small"
                                    value={form.z_score.days}
                                    onChange={(e) => fieldChangeHandler('z_score','days', e.target.value)}
                                />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Ideal Weight</TableCell>
                            <TableCell>
                                <PrescriptionTextBox
                                    size="small"
                                    value={form.z_score.ideal_weight}
                                    onChange={(e) => fieldChangeHandler('z_score','ideal_weight', e.target.value)}
                                />
                            </TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell>Weight Excess</TableCell>
                            <TableCell>
                                <PrescriptionTextBox
                                    size="small"
                                    value={form.z_score.weight_excess}
                                    onChange={(e) => fieldChangeHandler('z_score','weight_excess', e.target.value)}
                                />
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </PrescribeTable>
            </TableContainer>
        </Box>
    )
}

export default ZScoreTable
