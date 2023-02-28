import React, {useEffect} from 'react'
import {TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {PrescribeTable} from "../../../../styles/globalStyles";
import {Box} from "@mui/system";
import {PrescriptionTextBox, useStyles} from "../styled";
import {lengthConverter} from "../../../../utils/helpers";
import SelectBox from "../../../Shared/SelectBox";

const BmrTable = ({form, setForm}) => {
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

    const bmrCalculation = (weight = 0, feet= 0, inch = 0, age= 0, gender = 'Male', activity = "") => {
        let height = Number(feet + '.' + inch)
        let heightInCM = lengthConverter(height, 30.48)
        let result = Math.round(88.362 + (13.397 * weight) + (4.799 * heightInCM) - (5.677 * age))
        if(gender === 'Female'){
            result = Math.round(447.593 + (9.247 * weight) + (3.098 * heightInCM) - (4.330 * age))
        }
        let calorie = calorieCalculation(result, activity)
        return { result, calorie}
    }

    const calorieCalculation = (bmr = 0, activity = '') => {
        let calorieNeeds = 0
        if(activity === 'No Exercise' ){
            calorieNeeds = bmr * 1.2
        }else if(activity === 'Light Exercise' ){
            calorieNeeds = bmr * 1.375
        }else if(activity === 'Moderate' ){
            calorieNeeds = bmr * 1.55
        }else if(activity === 'Very Active' ){
            calorieNeeds = bmr * 1.725
        }else if(activity === 'Heavy Active' ){
            calorieNeeds = bmr * 2
        }
        return Math.round(calorieNeeds)
    }

    useEffect(() => {
        if(form.bmr.weight && form.bmr.height_inch && form.bmr.height_feet && form.bmr.gender && form.bmr.age && form.bmr.activity){
            let bmrCalc = bmrCalculation(form.bmr.weight, form.bmr.height_feet, form.bmr.height_inch, form.bmr.age, form.bmr.gender, form.bmr.activity)
            setForm((prevState) => ({
                ...prevState,
                bmr: {
                    ...prevState.bmr,
                    result: bmrCalc.result,
                    calorie_need: `${bmrCalc.calorie} Kcal/day`
                }
            }))
        }
    }, [form.bmr.weight, form.bmr.height_inch , form.bmr.height_feet , form.bmr.gender , form.bmr.age, form.bmr.activity ])


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
                                    value={form.bmr.weight}
                                    onChange={(e) => fieldChangeHandler('bmr', 'weight', e.target.value)}
                                />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Height (Feet)</TableCell>
                            <TableCell>
                                <PrescriptionTextBox
                                    size="small"
                                    value={form.bmr.height_feet}
                                    onChange={(e) => fieldChangeHandler('bmr','height_feet', e.target.value)}
                                />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Height (Inch)</TableCell>
                            <TableCell>
                                <PrescriptionTextBox
                                    size="small"
                                    value={form.bmr.height_inch}
                                    onChange={(e) => fieldChangeHandler('bmr','height_inch', e.target.value)}
                                />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Gender</TableCell>
                            <TableCell>
                                <SelectBox
                                    className={classes.selectBox}
                                    size='small'
                                    options={["Male", "Female"]}
                                    value={form.bmr.gender}
                                    onChange={(e) => fieldChangeHandler('bmr','gender', e.target.value)}
                                />
                                {/*<PrescriptionTextBox*/}
                                {/*    size="small"*/}
                                {/*    value={form.bmr.gender}*/}
                                {/*    onChange={(e) => fieldChangeHandler('bmr','gender', e.target.value)}*/}
                                {/*/>*/}
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Age</TableCell>
                            <TableCell>
                                <PrescriptionTextBox
                                    type='number'
                                    size="small"
                                    value={form.bmr.age}
                                    onChange={(e) => fieldChangeHandler('bmr','age', e.target.value)}
                                />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Activity</TableCell>
                            <TableCell>
                                <SelectBox
                                    className={classes.selectBox}
                                    size='small'
                                    options={['No Exercise', "Light Exercise", 'Moderate', 'Very Active', "Heavy" +
                                    " Active"]}
                                    value={form.bmr.activity}
                                    onChange={(e) => fieldChangeHandler('bmr','activity', e.target.value)}
                                />
                                {/*<PrescriptionTextBox*/}
                                {/*    size="small"*/}
                                {/*    value={form.bmr.activity}*/}
                                {/*    onChange={(e) => fieldChangeHandler('bmr','activity', e.target.value)}*/}
                                {/*/>*/}
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>BMR</TableCell>
                            <TableCell>
                                <PrescriptionTextBox
                                    size="small"
                                    value={form.bmr.result}
                                    onChange={(e) => fieldChangeHandler('bmr','result', e.target.value)}
                                />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Calorie Need</TableCell>
                            <TableCell>
                                <PrescriptionTextBox
                                    size="small"
                                    value={form.bmr.calorie_need}
                                    onChange={(e) => fieldChangeHandler('bmr','calorie_need', e.target.value)}
                                />
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </PrescribeTable>
            </TableContainer>
        </Box>
    )
}

export default BmrTable
