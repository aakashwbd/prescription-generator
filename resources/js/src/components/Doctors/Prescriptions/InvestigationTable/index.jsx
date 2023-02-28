import React, {useEffect, useState} from 'react'
import {Stack, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {PrescribeTable} from "../../../../styles/globalStyles";
import {Box} from "@mui/system";
import {PrescriptionDeleteBtn, PrescriptionTextBox, useStyles} from "../styled";
import {Close} from "@mui/icons-material";
import useStore from "../../../../stores";
import TemplateSearch from "../../Templates/TemplateSearch";

const InvestigationTable = ({form, setForm, debouncedHandler = () => {}}) => {
    const classes = useStyles()

    const fetchInvestigationTemplates = useStore(state => state.fetchInvestigationTemplates)
    const setInvestigationTemplates = useStore(state => state.setInvestigationTemplates)

    const [currentField, setCurrentField] = useState({})

    const ixChangeHandler = (index, field, value) => {
        let investigationArr = [...form.ix]
        investigationArr[index][field] = value;
        setForm(prevState => ({
            ...prevState,
            ix: investigationArr
        }))
    }

    const addHandler = () => {
        let isEmpty = form.ix.some((item) => item.name.length === 0)
        if(!isEmpty){
            setForm(prevState => ({
                ...prevState,
                ix: [...prevState.ix, {name: ""}]
            }))
        }
    };

    const removeHandler = (index) => {
        if(index !== 0) {
            let ixArr = [...form.ix];
            ixArr = ixArr.filter((item, i) => i !== index);
            setForm(prevState => ({
                ...prevState,
                ix: ixArr
            }))
        }
    };

    return (
        <Box className={classes.formBox} sx={{position: 'relative'}}>
            <TableContainer>
                <PrescribeTable size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>I/X (Investigation)</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {form.ix.map((item, i) => (
                            <TableRow key={i}>
                                <TableCell>
                                    <Stack direction="row" spacing={1} alignItems="center">
                                        <PrescriptionDeleteBtn tabIndex={-1} onClick={() =>removeHandler(i)}>
                                            <Close />
                                        </PrescriptionDeleteBtn>
                                        <PrescriptionTextBox
                                            value={item.name}
                                            onChange={(e) => {
                                                ixChangeHandler(i, 'name', e.target.value)
                                                setCurrentField({index: i, field: 'name'})
                                                debouncedHandler(fetchInvestigationTemplates, e.target.value, 1, 15, () => {})
                                            }}
                                            size="small" />
                                    </Stack>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </PrescribeTable>
            </TableContainer>
            <TemplateSearch
                forQuery='investigation'
                action={(data) => {
                    let investigationArr = [...form.ix]
                    investigationArr[currentField['index']]['name'] = data
                    setForm(prevState => ({
                        ...prevState,
                        ix: investigationArr,
                    }))
                }}
                reset={()=>{
                    setInvestigationTemplates({data: []})
                    addHandler()
                }}
            />
        </Box>
    )
}

export default InvestigationTable
