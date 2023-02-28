import React, {useCallback, useEffect, useState} from "react";
import {Grid, IconButton, Stack, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import AppCard from "../../../Shared/AppCard";
import TextBox from "../../../Shared/TextBox";
import {LoadingAppButton, PrescribeTable} from "../../../../styles/globalStyles";
import useStore from "../../../../stores";
import {PrescriptionDeleteBtn, PrescriptionTextBox} from "../../Prescriptions/styled";
import {Close} from "@mui/icons-material";
import Colors from "../../../../constants/Colors";
import {makeStyles} from "@mui/styles";
import {isRequiredValidate} from "../../../../utils/validateHelpers";
import {debounce} from "../../../../utils/helpers";
import {Box} from "@mui/system";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import TemplateSearch from "../TemplateSearch";

const useStyles = makeStyles(theme => ({
    medicineTable: {
        maxHeight: 300,
        minHeight: 300,
        '& .MuiTableBody-root': {
            '& .MuiTableRow-root:last-child': {
                borderBottom: `1px solid ${Colors.primary.light}`,
            },
        },
    },
    relativeBox: {
        position: 'relative'
    }
}))

const DrugTemplateForm = ({closeHandler = () => {}, fetchHandler = () => {}, data}) => {
    const classes = useStyles();

    /** fetcher variables **/
    const drugTemplate = useStore((state) => state.drugTemplate)
    const drugTemplateLoading = useStore((state) => state.drugTemplateLoading)

    /** fetcher action handler **/
    const drugTemplateStore = useStore(state => state.drugTemplateStore)
    const updateDrugTemplate = useStore(state => state.updateDrugTemplate)
    const fetchMedicines = useStore((state) => state.fetchMedicines)
    const fetchDoseTemplates = useStore(state => state.fetchDoseTemplates)
    const fetchDurationTemplates = useStore(state => state.fetchDurationTemplates)
    const setMedicines = useStore((state) => state.setMedicines)
    const setDoseTemplates = useStore((state) => state.setDoseTemplates)
    const setDurationTemplates = useStore((state) => state.setDurationTemplates)
    const setDrugTemplate = useStore((state) => state.setDrugTemplate)

    const [form, setForm] = useState({
        name : "",
        medicines: [{name: "", dose: "", instruction: "", duration: ""}],
        status: 'active'
    })

    const [errors, setErrors] = useState({name: {text: "", show: false}})
    const [currentField, setCurrentField] = useState({})

    const fieldChangeHandler = (field, value) => {
        setErrors(prevState => ({
            ...prevState,
            [field] : {text: "", show: false}
        }))
        setForm(prevState => ({
            ...prevState,
            [field] : value
        }))
    }

    const medicinesChangeHandler = (index, field, value) => {
        let medicines = [...form.medicines]
        medicines[index][field] = value;
        setForm(prevState => ({
            ...prevState,
            medicines : medicines
        }))
    }

    const addHandler = () => {
        let isEmpty = form.medicines.some((item) => item.name.length === 0)
        if(!isEmpty){
            setForm(prevState => ({
                ...prevState, medicines:  [...prevState.medicines, {name: "",dose: "",instruction: "",duration: ""}]
            }))
        }
    };
    const removeHandler = (index) => {
        if(index !== 0) {
            let arr = form.medicines.filter((item, i) => i !== index);
            setForm(prevState => ({...prevState, medicines: arr}))
        }
    };

    const submitHandler = (e) => {
        e.preventDefault();
        let formData = {...form}
        let nameValidate = isRequiredValidate(form.name, 'name', setErrors, "Name filed is required.")

        if(!nameValidate){
            formData["medicines"] = form.medicines.filter((item) => item.name)
            if(form.id){
                updateDrugTemplate(formData, () => {
                    fetchHandler()
                    closeHandler()
                })
            }else{
                drugTemplateStore(formData, () => {
                    fetchHandler()
                    closeHandler()
                })
            }
        }
    }

    const debouncedHandler = useCallback(debounce((fn, value, page = 1, offset = 15, cb = () => {
    }) => {
        fn(value, page, offset, () => {
            cb()
        })
    }, 500), []);

    useEffect(() => {
        if(drugTemplate && Object.keys(drugTemplate).length > 0){
            setForm((prevState) => ({
                ...prevState,
                ...drugTemplate
            }))
        }
    }, [drugTemplate])

    useEffect(() => {
        return () => {
            setDrugTemplate()
        };
    }, []);


    return (
        <>
            {/*<Box mb={3}>*/}
            {/*    <Grid container spacing={2} mb={2}>*/}
            {/*        <Grid item xs={12} lg={4}>*/}
            {/*            <TextBox*/}
            {/*                label="Type Brand Name"*/}
            {/*                size="small"*/}
            {/*                value={headerInfo.brand_name}*/}
            {/*                onChange={(e)=>fieldChangeHandler('brand_name', e.target.value)}*/}
            {/*            />*/}
            {/*        </Grid>*/}
            {/*        <Grid item xs={12} lg={4}>*/}
            {/*            <TextBox*/}
            {/*                label="Type Dose"*/}
            {/*                size="small"*/}
            {/*                value={headerInfo.dose}*/}
            {/*                onChange={(e)=>fieldChangeHandler('dose', e.target.value)}*/}
            {/*            />*/}
            {/*        </Grid>*/}
            {/*        <Grid item xs={12} lg={4}>*/}
            {/*            <TextBox*/}
            {/*                label="Type Duration"*/}
            {/*                size="small"*/}
            {/*                value={headerInfo.duration}*/}
            {/*                onChange={(e)=>fieldChangeHandler('duration', e.target.value)}*/}
            {/*            />*/}
            {/*        </Grid>*/}

            {/*        <Grid item xs={12} lg={4}>*/}
            {/*            <RadioGroup*/}
            {/*                row*/}
            {/*                value={headerInfo.duration_type}*/}
            {/*                onChange={(e) => fieldChangeHandler('duration_type', e.target.value)}*/}
            {/*            >*/}
            {/*                <FormControlLabel value="day" control={<Radio size="small" />} label="D" />*/}
            {/*                <FormControlLabel value="month" control={<Radio size="small" />} label="M" />*/}
            {/*            </RadioGroup>*/}
            {/*        </Grid>*/}

            {/*        <Grid item xs={12} lg={4}>*/}
            {/*            <FormGroup*/}
            {/*                row*/}

            {/*            >*/}
            {/*                <FormControlLabel control={<Checkbox size="small" checked={headerInfo.dose_type} />} label="খাবার আগে" />*/}
            {/*                <FormControlLabel control={<Checkbox size="small" />} label="খাবার পর" />*/}
            {/*            </FormGroup>*/}
            {/*        </Grid>*/}
            {/*        <Grid item xs={12} lg={4}>*/}
            {/*            <AppButton fullWidth variant="contained" color="primary" onClick={headerAddHandler} >Add</AppButton>*/}
            {/*        </Grid>*/}
            {/*    </Grid>*/}
            {/*</Box>*/}

            <form onSubmit={submitHandler}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} lg={12}>
                        <AppCard
                            content={
                                <Grid container justifyContent="center" spacing={2}>
                                    <Grid item xs={12}>
                                        <TextBox
                                            label="Template Name"
                                            size="small"
                                            value={form.name}
                                            onChange={(e) => fieldChangeHandler('name', e.target.value)}
                                            error={errors.name.show}
                                            helperText={errors.name.text}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Box>
                                            <TableContainer className={classes.medicineTable}>
                                                <PrescribeTable size="small">
                                                    <TableHead>
                                                        <TableRow>
                                                            <TableCell sx={{width: '40%'}}>Brand</TableCell>
                                                            <TableCell align="center" sx={{width: '20%'}}>Dose</TableCell>
                                                            <TableCell align="center" sx={{width: '20%'}}>Instruction</TableCell>
                                                            <TableCell align="center" sx={{width: '20%'}}>Duration</TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody sx={{position: 'relative'}}>
                                                        {form.medicines.map((item, i) => (
                                                            <TableRow  key={i}>
                                                                <TableCell>
                                                                    <Stack direction="row" spacing={1} alignItems="center">
                                                                        <PrescriptionDeleteBtn tabIndex={-1} onClick={()=>removeHandler(i)}>
                                                                            <Close />
                                                                        </PrescriptionDeleteBtn>
                                                                        <PrescriptionTextBox
                                                                            size="small"
                                                                            value={item.name}
                                                                            onChange={(e) => {
                                                                                medicinesChangeHandler(i, 'name', e.target.value)
                                                                                setCurrentField({index: i, field: 'name'})
                                                                                debouncedHandler(fetchMedicines, e.target.value, 1, 15, () => {})
                                                                            }}
                                                                        />
                                                                    </Stack>
                                                                </TableCell>
                                                                <TableCell>
                                                                    <PrescriptionTextBox
                                                                        size="small"
                                                                        className="center"
                                                                        value={item.dose}
                                                                        onChange={(e) => {
                                                                            medicinesChangeHandler(i, 'dose', e.target.value)
                                                                            setCurrentField({index: i, field: 'dose'})
                                                                            debouncedHandler(fetchDoseTemplates, e.target.value, 1, 15, () => {})
                                                                        }}
                                                                    />
                                                                </TableCell>
                                                                <TableCell>
                                                                    <PrescriptionTextBox
                                                                        size="small"
                                                                        className="center"
                                                                        value={item.instruction}
                                                                        onChange={(e) => {
                                                                            medicinesChangeHandler(i, 'instruction', e.target.value)
                                                                            setCurrentField({index: i, field: 'instruction'})
                                                                        }}
                                                                    />
                                                                </TableCell>
                                                                <TableCell>
                                                                    <PrescriptionTextBox
                                                                        size="small"
                                                                        className="center"
                                                                        value={item.duration}
                                                                        onChange={(e) => {
                                                                            medicinesChangeHandler(i, 'duration', e.target.value)
                                                                            setCurrentField({index: i, field: 'duration'})
                                                                            debouncedHandler(fetchDurationTemplates, e.target.value, 1, 15, () => {})
                                                                        }}
                                                                    />
                                                                </TableCell>
                                                            </TableRow>
                                                        ))}
                                                        <TemplateSearch
                                                            forQuery='medicine'
                                                            action={(data) => {
                                                                let arr = [...form.medicines]
                                                                arr[currentField['index']]['name'] = data
                                                                setForm(prevState => ({
                                                                    ...prevState,
                                                                    medicines: arr,
                                                                }))
                                                            }}
                                                            reset={()=>{
                                                                setMedicines({data: []})
                                                                addHandler()
                                                            }}
                                                        />
                                                        <TemplateSearch
                                                            forQuery='dose'
                                                            action={(data) => {
                                                                let arr = [...form.medicines]
                                                                arr[currentField['index']]['dose'] = data
                                                                setForm(prevState => ({
                                                                    ...prevState,
                                                                    medicines: arr,
                                                                }))
                                                            }}
                                                            reset={()=>{
                                                                setDoseTemplates({data: []})
                                                            }}
                                                        />
                                                        <TemplateSearch
                                                            forQuery='duration'
                                                            action={(data) => {
                                                                let arr = [...form.medicines]
                                                                arr[currentField['index']]['duration'] = data
                                                                setForm(prevState => ({
                                                                    ...prevState,
                                                                    medicines: arr,
                                                                }))
                                                            }}
                                                            reset={()=>{
                                                                setDurationTemplates({data: []})
                                                            }}
                                                        />
                                                    </TableBody>
                                                </PrescribeTable>
                                            </TableContainer>
                                            {/*<TextEditor*/}
                                            {/*    value={form.description}*/}
                                            {/*    onChange={(data) => fieldChangeHandler('description', data)}*/}
                                            {/*/>*/}
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12} lg={6}>
                                        <LoadingAppButton
                                            fullWidth
                                            variant="contained"
                                            color="primary"
                                            type='submit'
                                            loading={drugTemplateLoading}
                                            disabled={drugTemplateLoading}
                                            loadingIndicator="Loading…"
                                        >
                                            {form.id ? "Update Template" : "Save Template"}
                                        </LoadingAppButton>
                                    </Grid>
                                </Grid>
                            }
                        />
                    </Grid>
                    {/*<Grid item xs={12} sm={5} lg={4}>*/}
                    {/*    <AppCard*/}
                    {/*        header={*/}
                    {/*            <Typography variant="body1"><strong>Filter</strong></Typography>*/}
                    {/*        }*/}
                    {/*        content={*/}
                    {/*            <Grid container spacing={1}>*/}
                    {/*                <Grid item xs={12}>*/}
                    {/*                    <TextBox label="Manufacturer" size="small"/>*/}
                    {/*                </Grid>*/}
                    {/*                <Grid item xs={12}>*/}
                    {/*                    <TextBox label="Generic" size="small"/>*/}
                    {/*                </Grid>*/}
                    {/*            </Grid>*/}
                    {/*        }*/}
                    {/*    />*/}
                    {/*</Grid>*/}
                </Grid>
            </form>
        </>
    )
}

export default DrugTemplateForm
