import React, {useEffect, useState} from 'react'
import {PrescribeTable} from "../../../../styles/globalStyles";
import {Stack, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {PrescriptionDeleteBtn, PrescriptionTextBox, useStyles} from "../styled";
import {Close} from "@mui/icons-material";
import useStore from "../../../../stores";
import TextEditor from "../../../Shared/TextEditor";
import {Box} from "@mui/system";
import TemplateSearch from "../../Templates/TemplateSearch";

const MedicineTable = ({form, setForm, debouncedHandler = () => {}}) => {
    const classes = useStyles()
    const treatmentTemplate = useStore(state => state.treatmentTemplate)
    const drugTemplate = useStore(state => state.drugTemplate)

    const fetchMedicines = useStore(state => state.fetchMedicines)
    const setMedicines = useStore(state => state.setMedicines)

    const fetchDoseTemplates = useStore(state => state.fetchDoseTemplates)
    const setDoseTemplates = useStore(state => state.setDoseTemplates)

    const fetchDurationTemplates = useStore(state => state.fetchDurationTemplates)
    const setDurationTemplates = useStore((state) => state.setDurationTemplates)

    const [currentField, setCurrentField] = useState({})

    const medicineHandler = (index, field, value) => {
        let medicinesArr = [...form?.medicines]
        medicinesArr[index][field] = value;
        if(medicinesArr && medicinesArr.length > 0) {
            setForm(prevState => ({
                ...prevState,
                medicines : medicinesArr
            }))
        }
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

    useEffect(() => {
        if(drugTemplate && Object.keys(drugTemplate).length > 0){
            let arr = []
            drugTemplate.medicines.forEach(item => {
                arr.push({
                    name: item.name ? item.name : "",
                    dose: item.dose ? item.dose : "",
                    instruction: item.instruction ? item.instruction : "" ,
                    duration: item.duration ? item.duration : ""
                })
            })
            setForm(prevState => ({
                ...prevState,
                medicines : [...prevState.medicines, ...arr]
            }))
        }
    }, [drugTemplate])

    useEffect(() => {
        if(treatmentTemplate && Object.keys(treatmentTemplate).length > 0){
            let arr = []
            treatmentTemplate.medicines.forEach(item => {
                arr.push({
                    name: item.name ? item.name : "",
                    dose: item.dose ? item.dose : "",
                    instruction: item.instruction ? item.instruction : "" ,
                    duration: item.duration ? item.duration : ""
                })
            })
            setForm(prevState => ({
                ...prevState,
                medicines : [...prevState.medicines, ...arr]
            }))
        }
    }, [treatmentTemplate])

    return (
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
                <TableBody style={{position: 'relative'}}>
                    {form?.medicines?.map((item, i) => (
                        <TableRow key={i} >
                            <TableCell>
                                <Stack direction="row" spacing={1} alignItems="center">
                                    <PrescriptionDeleteBtn tabIndex={-1}>
                                        <Close />
                                    </PrescriptionDeleteBtn>
                                    <PrescriptionTextBox
                                        size="small"
                                        value={item?.name}
                                        onChange={(e) => {
                                            medicineHandler(i, 'name', e.target.value)
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
                                    value={item?.dose}
                                    onChange={(e) => {
                                        medicineHandler(i, 'dose', e.target.value)
                                        setCurrentField({index: i, field: 'dose'})
                                        debouncedHandler(fetchDoseTemplates, e.target.value, 1, 15, () => {})
                                    }}
                                />
                            </TableCell>
                            <TableCell>
                                <PrescriptionTextBox
                                    size="small"
                                    className="center"
                                    value={item?.instruction}
                                    onChange={(e) => {
                                        medicineHandler(i, 'instruction', e.target.value)
                                        setCurrentField({index: i, field: 'instruction'})
                                    }}
                                />
                            </TableCell>
                            <TableCell>
                                <PrescriptionTextBox
                                    size="small"
                                    className="center"
                                    value={item?.duration}
                                    onChange={(e) => {
                                        medicineHandler(i, 'duration', e.target.value)
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
    )
}

export default MedicineTable
