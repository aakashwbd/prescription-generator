import React, {useCallback, useEffect, useState} from "react";
import {Grid, Stack, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography} from "@mui/material";
import AppCard from "../../../Shared/AppCard";
import TextBox from "../../../Shared/TextBox";
import {LoadingAppButton, PrescribeTable} from "../../../../styles/globalStyles";
import {Box} from "@mui/system";
import {PrescriptionDeleteBtn, PrescriptionTextBox} from "../../Prescriptions/styled";
import {Close} from "@mui/icons-material";
import useStore from "../../../../stores";
import {isRequiredValidate} from "../../../../utils/validateHelpers";
import {debounce} from "../../../../utils/helpers";
import {makeStyles} from "@mui/styles";
import Colors from "../../../../constants/Colors";
import DrugTemplateSearch from "../TemplateSearch/DrugTemplateSearch";
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

const TreatmentTemplateForm = ({closeHandler = () => {}, fetchHandler = () => {}, data}) => {
    const classes = useStyles();

    /** fetcher variables **/
    const drugTemplate = useStore((state) => state.drugTemplate)
    const treatmentTemplateLoading = useStore((state) => state.treatmentTemplateLoading)

    /** fetcher action handler **/
    const fetchMedicines = useStore((state) => state.fetchMedicines)
    const fetchDoseTemplates = useStore(state => state.fetchDoseTemplates)
    const fetchDurationTemplates = useStore(state => state.fetchDurationTemplates)
    const fetchDrugTemplates = useStore(state => state.fetchDrugTemplates)
    const fetchDrugTemplate = useStore((state) => state.fetchDrugTemplate)
    const treatmentTemplateStore = useStore((state) => state.treatmentTemplateStore)
    const updateTreatmentTemplate = useStore((state) => state.updateTreatmentTemplate)

    /** setter action handler **/
    const setMedicines = useStore((state) => state.setMedicines)
    const setDoseTemplates = useStore((state) => state.setDoseTemplates)
    const setDurationTemplates = useStore((state) => state.setDurationTemplates)
    const setDrugTemplates = useStore((state) => state.setDrugTemplates)
    const setTreatmentTemplate = useStore((state) => state.setTreatmentTemplate)

    /** set table field **/
    const [field, setField] = useState({})
    const [currentField, setCurrentField] = useState({})
    const [drugTemp, setDrugTemp] = useState({})

    /** form variables **/
    const [form, setForm] = useState({
        name : "",
        medicines: [
            {
                name: "",
                dose: "",
                instruction: "",
                duration: ""
            },
        ],
        status: 'active'
    })

    /** form errors **/
    const [errors, setErrors] = useState({
        name: {text: "", show: false}
    })

    /** form field change handler **/
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

    /** form reset handler **/
    const resetHandler = () => {
        setForm(prevState => ({
            ...prevState,
            name : "",
            medicines: [
                {
                    name: "",
                    dose: "",
                    instruction: "",
                    duration: ""
                },
            ],
            status: 'active'
        }))
    }

    /** form field change handler **/
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

    /** form submit handler **/
    const submitHandler = (e) => {
        e.preventDefault();
        let formData = {...form}
        let nameValidate = isRequiredValidate(form.name, 'name', setErrors, "Name filed is required.")

        if(!nameValidate){
            formData["medicines"] = form.medicines.filter((item) => item.name)
            if(form.id){
                updateTreatmentTemplate(formData, () => {
                    closeHandler()
                    fetchHandler()
                })
            }else{
                treatmentTemplateStore(formData, () => {
                    resetHandler()
                    closeHandler()
                    fetchHandler()
                })
            }
        }
    }

    /** table field search handler **/
    const debouncedHandler = useCallback(debounce((fn, value, page = 1, offset = 15, cb = () => {
    }) => {
        fn(value, page, offset, () => {
            cb()
        })
    }, 500), []);

    /** field state value set on current field state **/
    useEffect(() => {
        if(field && Object.keys(field).length > 0){
            if(currentField.name === field.name){
                setCurrentField(prevState => ({
                    ...prevState,
                    value: field.value
                }))
            }
        }
    }, [field])

    /** current field state value pass in form handler **/
    useEffect(() => {
        if(currentField && Object.keys(currentField).length > 0){
            medicinesChangeHandler(currentField.index, currentField.field, currentField.value)
        }
    }, [currentField])


    /** drug template search & fetch single value **/
    useEffect(() => {
        if(drugTemp && Object.keys(drugTemp).length > 0){
            fetchDrugTemplate(drugTemp.id)
        }
    }, [drugTemp]);

    /** fetch drug template data to table row field **/
    useEffect(() => {
        if(drugTemplate && Object.keys(drugTemplate).length > 0 ){
            if(drugTemplate.medicines.length > 0){
                setForm((prevState) => ({
                    ...prevState,
                    medicines: [
                        ...prevState.medicines,
                        ...drugTemplate.medicines
                    ]
                }))
            }
        }
    }, [drugTemplate]);

    /** for edited data set in form field**/
    useEffect(() => {
        if(data && Object.keys(data).length > 0){
            setForm(prevState => ({
                ...prevState,
                ...data,
            }))
        }
    }, [data]);

    useEffect(() => {
        return () => {
            setDrugTemplates({data: []})
            setTreatmentTemplate({})
        };
    }, []);


    return (
        <>
            {/*<Box mb={3}>*/}
            {/*    <Grid container spacing={2} mb={2}>*/}
            {/*        <Grid item xs={12} lg={4}>*/}
            {/*            <TextBox label="Type Brand Name" size="small" />*/}
            {/*        </Grid>*/}
            {/*        <Grid item xs={12} lg={4}>*/}
            {/*            <TextBox label="Type Dose" size="small"/>*/}
            {/*        </Grid>*/}
            {/*        <Grid item xs={12} lg={4}>*/}
            {/*            <TextBox label="Type Duration" size="small"/>*/}
            {/*        </Grid>*/}
            {/*        <Grid item xs={12} lg={4}>*/}
            {/*            <RadioGroup row defaultValue="day">*/}
            {/*                <FormControlLabel value="day" control={<Radio size="small" />} label="D" />*/}
            {/*                <FormControlLabel value="month" control={<Radio size="small"/>} label="M" />*/}
            {/*            </RadioGroup>*/}
            {/*        </Grid>*/}
            {/*        <Grid item xs={12} lg={4}>*/}
            {/*            <FormGroup row>*/}
            {/*                <FormControlLabel control={<Checkbox size="small"/>} label="খাবার আগে" />*/}
            {/*                <FormControlLabel control={<Checkbox size="small"/>} label="খাবার পর" />*/}
            {/*            </FormGroup>*/}
            {/*        </Grid>*/}
            {/*        <Grid item xs={12} lg={4}>*/}
            {/*            <AppButton fullWidth variant="contained" color="primary">Add</AppButton>*/}
            {/*        </Grid>*/}
            {/*    </Grid>*/}
            {/*</Box>*/}

            <Grid container spacing={2}>
                <Grid item xs={12} sm={7} lg={8}>
                    <form onSubmit={submitHandler}>
                        <AppCard
                            content={
                                <>
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
                                            {/*<TextEditor />*/}
                                        </Grid>
                                        <Grid item xs={12} lg={6}>
                                            <LoadingAppButton
                                                fullWidth
                                                variant="contained"
                                                color="primary"
                                                type='submit'
                                                disabled={treatmentTemplateLoading}
                                                loading={treatmentTemplateLoading}
                                                loadingIndicator="Loading…"
                                            >
                                                {form.id ? "Update Template" : "Save Template"}
                                            </LoadingAppButton>
                                        </Grid>
                                    </Grid>
                                </>
                            }
                        />
                    </form>
                </Grid>
                <Grid item xs={12} sm={5} lg={4}>
                    <Box mb={2} sx={{position: 'relative'}}>
                        <AppCard
                            header={<Typography variant="body1"><strong>GET Drug Template</strong></Typography>}
                            content={
                                <TextBox
                                    label="Drug Templates"
                                    size="small"
                                    value={form.drug_templates}
                                    onChange={(e) => {
                                        fieldChangeHandler('drug_templates', e.target.value)
                                        debouncedHandler(fetchDrugTemplates, e.target.value, 1, 15, () => {})
                                    }}
                                />
                            }
                        />
                        <TemplateSearch
                            forQuery='drug_temp'
                            reset={()=>{
                                setDrugTemplates({data: []})
                                setForm(prevState => ({
                                    ...prevState,
                                    drug_templates: "",
                                }))
                            }}
                        />
                    </Box>

                    {/*<AppCard*/}
                    {/*    header={*/}
                    {/*        <Typography variant="body1"><strong>Filter</strong></Typography>*/}
                    {/*    }*/}
                    {/*    content={*/}
                    {/*        <Grid container spacing={1}>*/}
                    {/*            <Grid item xs={12}>*/}
                    {/*                <TextBox label="Manufacturer" size="small"/>*/}
                    {/*            </Grid>*/}
                    {/*            <Grid item xs={12}>*/}
                    {/*                <TextBox label="Generic" size="small"/>*/}
                    {/*            </Grid>*/}
                    {/*        </Grid>*/}
                    {/*    }*/}
                    {/*/>*/}
                </Grid>
            </Grid>
        </>
    )
}

export default TreatmentTemplateForm
