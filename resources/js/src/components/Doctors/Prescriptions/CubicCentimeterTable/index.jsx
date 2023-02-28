import React, {useState} from 'react'
import {Stack, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {PrescribeTable} from "../../../../styles/globalStyles";
import {Box} from "@mui/system";
import {PrescriptionDeleteBtn, PrescriptionTextBox, useStyles} from "../styled";
import {Close} from "@mui/icons-material";
import useStore from "../../../../stores";
import TemplateSearch from "../../Templates/TemplateSearch";

const CubicCentimeterTable = ({form, setForm, debouncedHandler = () =>{}}) => {
    const classes = useStyles()

    const fetchCubicTemplates = useStore(state => state.fetchCubicTemplates)
    const fetchDurationTemplates = useStore(state => state.fetchDurationTemplates)
    const setCubicTemplates = useStore(state => state.setCubicTemplates)
    const setDurationTemplates = useStore(state => state.setDurationTemplates)

    const [currentField, setCurrentField] = useState({})

    const ccChangeHandler = (index, field, value) => {
        let cubicArr = [...form.cc]
        cubicArr[index][field] = value;
        setForm(prevState => ({
            ...prevState,
            cc: cubicArr
        }))
    }

    const addHandler = () => {
        let isEmpty = form.cc.some((item) => item.name.length === 0)
        if(!isEmpty){
            setForm(prevState => ({
                ...prevState,
                cc: [...prevState.cc, {name: "",duration: "",unit: ""}]
            }))
        }
    };

    const removeHandler = (index) => {
        if(index !== 0) {
            let cubicArr = form.cc.filter((item, i) => i !== index);
            setForm(prevState => ({
                ...prevState,
                cc: cubicArr
            }))
        }
    };
    return (
        <Box className={classes.formBox} sx={{position: 'relative'}}>
            <TableContainer>
                <PrescribeTable size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{width: '60%'}}>C/C (Cubic Centimeter)</TableCell>
                            <TableCell align="center" sx={{width: '20%'}}>Duration</TableCell>
                            <TableCell align="center" sx={{width: '20%'}}>D/M</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {form?.cc?.map((item, i) => (
                            <TableRow key={i} >
                                <TableCell>
                                    <Stack direction="row" spacing={1} alignItems="center">
                                        <PrescriptionDeleteBtn tabIndex={-1} onClick={() => removeHandler(i)}>
                                            <Close />
                                        </PrescriptionDeleteBtn>
                                        <PrescriptionTextBox
                                            size="small"
                                            value={item.name}
                                            onChange={(e) => {
                                                ccChangeHandler(i, 'name', e.target.value)
                                                setCurrentField({index: i, field: 'name'})
                                                debouncedHandler(fetchCubicTemplates, e.target.value, 1, 15, () => {})
                                            }}
                                        />
                                    </Stack>
                                </TableCell>
                                <TableCell align="center">
                                    <PrescriptionTextBox
                                        size="small"
                                        className="center"
                                        value={item.duration}
                                        onChange={(e) => {
                                            ccChangeHandler(i, 'duration', e.target.value)
                                            setCurrentField({index: i, field: 'duration'})
                                            debouncedHandler(fetchDurationTemplates, e.target.value, 1, 15, () => {})
                                        }}
                                    />
                                </TableCell>
                                <TableCell align="center">
                                    <PrescriptionTextBox
                                        size="small"
                                        className="center"
                                        value={item.unit}
                                        onChange={(e) => ccChangeHandler(i, 'unit', e.target.value)}
                                    />
                                </TableCell>
                            </TableRow>
                        ))}

                    </TableBody>
                </PrescribeTable>
            </TableContainer>
            <TemplateSearch
                forQuery='cubic'
                action={(data) => {
                    let cubicArr = [...form.cc]
                    cubicArr[currentField['index']]['name'] = data
                    setForm(prevState => ({
                        ...prevState,
                        cc: cubicArr,
                    }))
                }}
                reset={()=>{
                    setCubicTemplates({data: []})
                    addHandler()
                }}
            />
            <TemplateSearch
                forQuery='duration'
                action={(data) => {
                    let durationArr = [...form.cc]
                    durationArr[currentField['index']]['duration'] = data
                    setForm(prevState => ({
                        ...prevState,
                        cc: durationArr,
                    }))
                }}
                reset={()=>{
                    setDurationTemplates({data: []})
                }}
            />
            {/*<TemplateSearch*/}
            {/*    forQuery='cubic'*/}
            {/*    action={(data) => {*/}
            {/*        let cubicArr = [...form.cc]*/}
            {/*        cubicArr[currentField['index']]['name'] = data*/}
            {/*        setForm(prevState => ({*/}
            {/*            ...prevState,*/}
            {/*            cc: cubicArr,*/}
            {/*        }))*/}
            {/*    }}*/}
            {/*    reset={()=>{*/}
            {/*        setCubicTemplates({data: []})*/}
            {/*        setDurationTemplates({data: []})*/}
            {/*        addHandler()*/}
            {/*    }}*/}
            {/*/>*/}
        </Box>

    )
}

export default CubicCentimeterTable
