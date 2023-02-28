import React, {useEffect, useState} from 'react'
import {
    Checkbox,
    FormControlLabel, FormGroup,
    Grid,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";
import {PrescribeTable} from "../../../../styles/globalStyles";
import {Box} from "@mui/system";
import {useStyles} from "../styled";
import TextBox from "../../../Shared/TextBox";

const HistoryOptionTable = ({setForm, debouncedHandler = () => {}}) => {
    const classes = useStyles()

    const [hoForm, setHoForm] = useState({types: [], description: ""})

    const typesChangeHandler = (checked, value) => {
        let typesArr = [...hoForm.types]
        if(checked){
            typesArr.push(value)
        }else{
            typesArr = typesArr.filter((item) => item !== value)
        }
        setHoForm(prevState => ({
            ...prevState,
            types: typesArr
        }))
    }

    const fieldChangeHandler = (field, value) => {
        setHoForm((prevState) => ({
            ...prevState,
            [field] : value
        }))
    }
    useEffect(() => {
        setForm(prevState => ({
            ...prevState,
            ho: hoForm
        }))
    }, [hoForm]);

    return (
        <Box className={classes.formBox}>
            <TableContainer>
                <PrescribeTable size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>H/O (History Option)</TableCell>
                        </TableRow>
                    </TableHead>
                </PrescribeTable>
            </TableContainer>

            <Box p={2}>
                <Grid container spacing={1}>
                    <Grid item xs={12} sm={6} lg={4}>
                        <FormGroup
                            value={hoForm.types}
                            className={classes.checkGroup}
                        >
                            <FormControlLabel
                                control={<Checkbox
                                    size="small"
                                    value='HTN'
                                    onChange={(e)=> typesChangeHandler(e.target.checked, e.target.value)}
                                />}
                                label="HTN"
                            />
                            <FormControlLabel
                                control={<Checkbox
                                    size="small"
                                    value='COPD'
                                    onChange={(e)=> typesChangeHandler(e.target.checked, e.target.value)}
                                />}
                                label="COPD"
                            />
                            <FormControlLabel
                                control={<Checkbox
                                    size="small"
                                    value='CLD'
                                    onChange={(e)=> typesChangeHandler(e.target.checked, e.target.value)}
                                />}
                                label="CLD"
                            />
                            <FormControlLabel
                                control={<Checkbox
                                    size="small"
                                    value='Tobacco Chewing'
                                    onChange={(e)=> typesChangeHandler(e.target.checked, e.target.value)}
                                />}
                                label="Tobacco Chewing"
                            />
                            <FormControlLabel
                                control={<Checkbox
                                    size="small"
                                    value='Psychiatric Disorder'
                                    onChange={(e)=> typesChangeHandler(e.target.checked, e.target.value)}
                                />}
                                label="Psychiatric Disorder"
                            />
                            <FormControlLabel
                                control={<Checkbox
                                    size="small"
                                    value='Drug Abuse'
                                    onChange={(e)=> typesChangeHandler(e.target.checked, e.target.value)}
                                />}
                                label="Drug Abuse"
                            />
                        </FormGroup>
                    </Grid>
                    <Grid item xs={12} sm={6} lg={4}>
                        <FormGroup
                            value={hoForm.types}
                            className={classes.checkGroup}
                        >
                            <FormControlLabel
                                control={<Checkbox
                                    size="small"
                                    value='DM'
                                    onChange={(e)=> typesChangeHandler(e.target.checked, e.target.value)}
                                />}
                                label="DM"
                            />
                            <FormControlLabel
                                control={<Checkbox
                                    size="small"
                                    value='IHD'
                                    onChange={(e)=> typesChangeHandler(e.target.checked, e.target.value)}
                                />}
                                label="IHD"
                            />
                            <FormControlLabel
                                control={<Checkbox
                                    size="small"
                                    value='CVD'
                                    onChange={(e)=> typesChangeHandler(e.target.checked, e.target.value)}
                                />}
                                label="CVD"
                            />
                        </FormGroup>
                    </Grid>
                    <Grid item xs={12} sm={6} lg={4}>
                        <FormGroup
                            className={classes.checkGroup}
                            value={hoForm.types}
                        >
                            <FormControlLabel
                                control={<Checkbox
                                    size="small"
                                    value='Asthma'
                                    onChange={(e)=> typesChangeHandler(e.target.checked, e.target.value)}
                                />}
                                label="Asthma"
                            />
                            <FormControlLabel
                                control={<Checkbox
                                    size="small"
                                    value='CKD'
                                    onChange={(e)=> typesChangeHandler(e.target.checked, e.target.value)}
                                />}
                                label="CKD"
                            />
                            <FormControlLabel
                                control={<Checkbox
                                    size="small"
                                    value='Smoking'
                                    onChange={(e)=> typesChangeHandler(e.target.checked, e.target.value)}
                                />}
                                label="Smoking"
                            />
                            <FormControlLabel
                                control={<Checkbox
                                    size="small"
                                    value='Malignancy'
                                    onChange={(e)=> typesChangeHandler(e.target.checked, e.target.value)}
                                />}
                                label="Malignancy"
                            />
                            <FormControlLabel
                                control={<Checkbox
                                    size="small"
                                    value='Allergy'
                                    onChange={(e)=> typesChangeHandler(e.target.checked, e.target.value)}
                                />}
                                label="Allergy"
                            />
                            <FormControlLabel
                                control={<Checkbox
                                    size="small"
                                    value='Depression'
                                    onChange={(e)=> typesChangeHandler(e.target.checked, e.target.value)}
                                />}
                                label="Depression"
                            />
                        </FormGroup>
                    </Grid>
                    <Grid item xs={12}>
                        <TextBox
                            multiline
                            minRows={3}
                            maxRows={3}
                            size="small"
                            value={hoForm.description}
                            onChange={(e) => fieldChangeHandler('description', e.target.value)}
                        />
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}

export default HistoryOptionTable
