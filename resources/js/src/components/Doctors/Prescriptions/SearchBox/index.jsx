import React, {useCallback, useEffect, useState} from 'react'
import {Grid, InputAdornment, Typography} from "@mui/material";
import TextBox from "../../../Shared/TextBox";
import {BiSearchAlt} from "react-icons/bi";
import {debounce} from "../../../../utils/helpers";
import useStore from "../../../../stores";
import TemplateSearch from "../../Templates/TemplateSearch";
import {Box} from "@mui/system";

const SearchBox = ({form, setForm, search, setSearch, fieldChangeHandler = () => {}, debouncedHandler = () => {}}) => {
    const drugTemplate = useStore(state => state.drugTemplate)

    const fetchDrugTemplates = useStore(state => state.fetchDrugTemplates)
    const fetchTreatmentTemplates = useStore(state => state.fetchTreatmentTemplates)
    const setDrugTemplates = useStore(state => state.setDrugTemplates)
    const setTreatmentTemplates = useStore(state => state.setTreatmentTemplates)

    return (
        <Grid container p={2} spacing={2} justifyContent="flex-end">
            <Grid item xs={12} sm={6} lg={3}>
                <Typography variant="h2" color="primary">Rx</Typography>
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
                <Box sx={{position: 'relative'}}>
                    <TextBox
                        size="small"
                        placeholder="Drug Template"
                        InputProps={{
                            startAdornment: <InputAdornment position="start">
                                <BiSearchAlt size={18} />
                            </InputAdornment>
                        }}
                        value={search.drug_templates}
                        onChange={(e) => {
                            fieldChangeHandler('drug_templates', e.target.value)
                            debouncedHandler(fetchDrugTemplates, e.target.value, 1, 15, () => {})
                        }}
                    />
                    <TemplateSearch
                        forQuery='drug_temp'
                        reset={()=>{
                            setDrugTemplates({data: []})
                            setSearch(prevState => ({
                                ...prevState,
                                drug_templates: "",
                            }))
                        }}
                    />
                </Box>

            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
                <Box sx={{position: 'relative'}}>
                    <TextBox
                        size="small"
                        placeholder="Treatment Template"
                        InputProps={{
                            startAdornment: <InputAdornment position="start">
                                <BiSearchAlt size={18} />
                            </InputAdornment>
                        }}
                        value={search.treatment_templates}
                        onChange={(e) => {
                            fieldChangeHandler('treatment_templates', e.target.value)
                            debouncedHandler(fetchTreatmentTemplates, e.target.value, 1, 15, () => {})
                        }}
                    />
                    <TemplateSearch
                        forQuery='treatment_temp'

                        reset={()=>{
                            setTreatmentTemplates({data: []})
                            setSearch(prevState => ({
                                ...prevState,
                                treatment_templates: ""
                            }))
                        }}
                    />
                </Box>
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
                <TextBox
                    size="small"
                    placeholder="Prescription Template"
                    InputProps={{
                        startAdornment: <InputAdornment position="start">
                            <BiSearchAlt size={18} />
                        </InputAdornment>
                    }}
                />
            </Grid>
        </Grid>
    )
}

export default SearchBox
