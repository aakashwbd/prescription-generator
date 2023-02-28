import React, {useEffect, useState} from 'react'
import SearchBox from "../SearchBox";
import {Box} from "@mui/system";
import {Divider, Grid, InputAdornment, Stack, Typography} from "@mui/material";
import MedicineTable from "../MedicineTable";
import {useStyles} from "../styled";
import TextBox from "../../../Shared/TextBox";
import {BiSearchAlt} from "react-icons/bi";
import useStore from "../../../../stores";
import TemplateSearch from "../../Templates/TemplateSearch";
import TextEditor from "../../../Shared/TextEditor";

const MedicineBox = ({form, setForm, debouncedHandler = () => {}, fieldChangeHandle = () => {}}) => {
    const classes = useStyles()

    const adviceTemplate = useStore(state => state.adviceTemplate)
    const fetchAdviceTemplates = useStore(state => state.fetchAdviceTemplates)
    const setAdviceTemplates = useStore(state => state.setAdviceTemplates)

    const [search, setSearch] = useState({
        treatment_templates: "",
        drug_templates: "",
        ref_templates: "",
        advice_templates: ""
    })
    const searchChangeHandler = (field, value) => {
        setSearch(prevState => ({
            ...prevState,
            [field]: value
        }))
    }

    useEffect(()=> {
        if(adviceTemplate && Object.keys(adviceTemplate).length > 0){
            let data = `${adviceTemplate.description} <br/>`
            setForm(prevState => ({
                ...prevState,
                advices: prevState.advices + data
            }))
        }
    }, [adviceTemplate])

    useEffect(() => {
        return (
            setAdviceTemplates({data: []})
        )
    }, [])


    return (
        <Box className={classes.formBox} mb={3}>
            <SearchBox
                form={form}
                setForm={setForm}
                search={search}
                setSearch={setSearch}
                fieldChangeHandler={searchChangeHandler}
                debouncedHandler={debouncedHandler}
            />
            <Box mb={1}>
                <Divider />
            </Box>
            <Box mb={3}>
                <MedicineTable
                    form={form}
                    setForm={setForm}
                    debouncedHandler={debouncedHandler}
                />
                <TextEditor
                    value={form.advices}
                    onChange={(data) => fieldChangeHandle('advice', data)}
                />
            </Box>

            <Grid container p={2}>
                <Grid item xs={12} sm={6} lg={4} container spacing={2}>
                    <Grid item xs={12}>
                        <Stack direction="row" alignItems="center" spacing={1} className={classes.stacks}>
                            <Typography variant="body1" color="primary">Ref To :</Typography>
                            <TextBox
                                size="small"
                                placeholder="Ref Template"
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">
                                        <BiSearchAlt size={18} />
                                    </InputAdornment>
                                }}
                            />
                        </Stack>
                    </Grid>
                    <Grid item xs={12}>
                        <Box sx={{position: 'relative'}}>
                            <Stack direction="row" alignItems="center" spacing={1} className={classes.stacks}>
                                <Typography variant="body1" color="primary">Advice :</Typography>
                                <TextBox
                                    size="small"
                                    placeholder="Advice Template"
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start">
                                            <BiSearchAlt size={18} />
                                        </InputAdornment>
                                    }}
                                    value={search.advice_templates}
                                    onChange={(e) => {
                                        searchChangeHandler('advice_templates', e.target.value)
                                        debouncedHandler(fetchAdviceTemplates, e.target.value, 1, 15, () => {})
                                    }}
                                />
                            </Stack>
                            <TemplateSearch
                                forQuery='advice_temp'
                                reset={()=>{
                                    setAdviceTemplates({data: []})
                                    setSearch(prevState => ({
                                        ...prevState,
                                        advice_templates: "",
                                    }))
                                }}
                            />
                        </Box>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    )
}

export default MedicineBox
