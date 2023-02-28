import React, {useEffect, useState} from 'react'
import {Stack, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {PrescribeTable} from "../../../../styles/globalStyles";
import {Box} from "@mui/system";
import {PrescriptionDeleteBtn, PrescriptionTextBox, useStyles} from "../styled";
import {Close} from "@mui/icons-material";
import useStore from "../../../../stores";
import TemplateSearch from "../../Templates/TemplateSearch";

const OnExaminationTable = ({form, setForm, debouncedHandler = () =>{}}) => {
    const classes = useStyles()

    const fetchOnExamTemplates = useStore(state => state.fetchOnExamTemplates)
    const setOnExamTemplates = useStore(state => state.setOnExamTemplates)

    const [currentField, setCurrentField] = useState({})

    const oeChangeHandler = (index, field, value) => {
        let onExamArr = [...form.oe]
        onExamArr[index][field] = value;
        setForm(prevState => ({
            ...prevState,
            oe: onExamArr
        }))
    }

    const addHandler = () => {
        let isEmpty = form.oe.some((item) => item.name.length === 0)
        if(!isEmpty){
            setForm(prevState => ({
                ...prevState,
                oe: [...prevState.oe, {name: "", value: "", unit: ""}]
            }))
        }
    };

    const removeHandler = (index) => {
        if(index !== 0) {
            let onExamArr = form.oe.filter((item, i) => i !== index);
            setForm(prevState => ({
                ...prevState,
                oe: onExamArr
            }))
        }
    };

    return (
        <Box className={classes.formBox} sx={{position: 'relative'}}>
            <TableContainer>
                <PrescribeTable size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>O/E (On Examination)</TableCell>
                            <TableCell align="center">Value</TableCell>
                            <TableCell align="center">Unit</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {form?.oe?.map((item, i) => (
                            <TableRow key={i}>
                                <TableCell>
                                    <Stack direction="row" spacing={1} alignItems="center">
                                        <PrescriptionDeleteBtn tabIndex={-1} onClick={() => removeHandler(i)}>
                                            <Close />
                                        </PrescriptionDeleteBtn>
                                        <PrescriptionTextBox
                                            size="small"
                                            value={item.name}
                                            onChange={(e) => {
                                                oeChangeHandler(i, 'name', e.target.value)
                                                setCurrentField({index: i, field: 'name'})
                                                debouncedHandler(fetchOnExamTemplates, e.target.value, 1, 15, () => {})
                                            }}
                                        />
                                    </Stack>
                                </TableCell>
                                <TableCell align="center">
                                    <PrescriptionTextBox
                                        size="small"
                                        className="center"
                                        value={item.value}
                                        onChange={(e) => oeChangeHandler(i, 'value', e.target.value)}
                                    />
                                </TableCell>
                                <TableCell align="center">
                                    <PrescriptionTextBox
                                        size="small"
                                        className="center"
                                        value={item.unit}
                                        onChange={(e) => oeChangeHandler(i, 'unit', e.target.value)}
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </PrescribeTable>
            </TableContainer>

            <TemplateSearch
                forQuery='on_exam'
                action={(data) => {
                    let onExamArr = [...form.oe]
                    onExamArr[currentField['index']]['name'] = data
                    setForm(prevState => ({
                        ...prevState,
                        oe: onExamArr,
                    }))
                }}
                reset={()=>{
                    setOnExamTemplates({data: []})
                    addHandler()
                }}
            />

            {/*<TemplateSearch*/}
            {/*    forQuery='on_exam'*/}
            {/*    setter={setField}*/}
            {/*    reset={()=>{*/}
            {/*        setOnExamTemplates({data: []})*/}
            {/*    }}*/}
            {/*/>*/}
        </Box>
    )
}

export default OnExaminationTable
