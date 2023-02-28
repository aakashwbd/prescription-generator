import React, {useEffect} from 'react'
import {TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {PrescribeTable} from "../../../../styles/globalStyles";
import {Box} from "@mui/system";
import {PrescriptionTextBox, useStyles} from "../styled";
import DateBox from "../../../Shared/DateBox";
import moment from "moment";

const EddTable = ({form, setForm}) => {
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

    const eddCalculation = (lmp = new Date()) => {
        return moment(lmp)
            .subtract(3, 'months')
            .add(1, 'year')
            .add(7, 'days')
            .format('DD-MM-YYYY')
    }
    const weekCalculation = (lmp = new Date()) => {
        let currentDate = new Date()
        let days = Math.floor((currentDate - lmp) / (24 * 60 * 60 * 1000));
        let weeks = Math.floor(days / 7);
        let day = (days - (weeks * 7))
        return { weeks, day }
    }

    useEffect(() => {
        if(form.edd.lmp && form.edd.lmp){
            let estimateDate = eddCalculation(form.edd.lmp)
            let week = weekCalculation(form.edd.lmp)
            setForm((prevState) => ({
                ...prevState,
                edd: {
                    ...prevState.edd,
                    age : `${week.weeks} weeks ${week.day} days`,
                    result : estimateDate
                }
            }))
        }
    }, [form.edd.lmp]);


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
                            <TableCell>LMP</TableCell>
                            <TableCell>
                                <DateBox
                                    size='small'
                                    value={form.edd.lmp}
                                    onChange={ (data) => fieldChangeHandler('edd','lmp', data)}
                                />
                                {/*<PrescriptionTextBox*/}
                                {/*    size="small"*/}
                                {/*    value={form.edd.lmp}*/}
                                {/*    onChange={ (e) => fieldChangeHandler('edd','lmp', e.target.value)}*/}
                                {/*/>*/}
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Gestational Age (LMP)</TableCell>
                            <TableCell>
                                <PrescriptionTextBox
                                    size="small"
                                    value={form.edd.age}
                                    onChange={ (e) => fieldChangeHandler('edd','age', e.target.value)}
                                />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>EDD (LMP)</TableCell>
                            <TableCell>
                                <PrescriptionTextBox
                                    size="small"
                                    value={form.edd.result}
                                    onChange={ (e) => fieldChangeHandler('edd','result', e.target.value)}
                                />
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </PrescribeTable>
            </TableContainer>
        </Box>
    )
}

export default EddTable
