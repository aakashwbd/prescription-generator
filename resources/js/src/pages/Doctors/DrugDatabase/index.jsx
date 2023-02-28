import React, {useCallback, useState} from 'react'
import AppTableTitleBar from "../../../components/Shared/AppTableTitleBar";
import {Grid, InputAdornment, Typography} from "@mui/material";
import {Box} from "@mui/system";
import SelectBox from "../../../components/Shared/SelectBox";
import TextBox from "../../../components/Shared/TextBox";
import AppCard from "../../../components/Shared/AppCard";
import MedicineDetails from "../../../components/Doctors/DrugDatabase/MedicineDetails";
import GenericDetails from "../../../components/Doctors/DrugDatabase/GenericDetails";
import IndicationDetails from "../../../components/Doctors/DrugDatabase/IndicationDetails";
import TherapeuticClassDetails from "../../../components/Doctors/DrugDatabase/TherapeuticClassDetails";
import useStore from "../../../stores";
import {BiSearchAlt} from "react-icons/bi";
import {drugDBSearchBy} from "../../../constants/statuses";
import {debounce} from "../../../utils/helpers";
import {useStyles} from "./styled";
import SearchResult from "../../../components/Doctors/DrugDatabase/SearchResult";

const DrugDatabase = () => {
    const classes = useStyles()
    const medicine = useStore((state) => state.medicine)
    const generic = useStore((state) => state.generic)
    const indication = useStore((state) => state.indication)
    const therapeutic = useStore((state) => state.therapeutic)

    const fetchMedicines = useStore((state) => state.fetchMedicines)
    const fetchGenerics = useStore((state) => state.fetchGenerics)
    const fetchIndications = useStore((state) => state.fetchIndications)
    const fetchTherapeutics = useStore((state) => state.fetchTherapeutics)

    const setMedicines = useStore((state) => state.setMedicines)
    const setGenerics = useStore((state) => state.setGenerics)
    const setIndications = useStore((state) => state.setIndications)
    const setTherapeutics = useStore((state) => state.setTherapeutics)

    const [form, setForm] = useState({
        searchBy: 'brand', search: null
    })

    const debouncedHandler = useCallback(debounce((fn, value, page = 1, offset = 15, cb = () => {
    }) => {
        fn(value, page, offset, () => {
            cb()
        })
    }, 500), []);

    const fieldChangeHandler = (field, value) => {
        setForm((prevState) => ({
            ...prevState, [field]: value
        }))
    }

    return (<>
            <AppTableTitleBar title="Drug Database"/>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={4} lg={3}>
                    <AppCard
                        className={classes.card}
                        header={<Typography variant="h6" color="primary">Searching</Typography>}
                        content={<>
                            <Box mb={2}>
                                <SelectBox
                                    placeholder="Search For"
                                    options={drugDBSearchBy}
                                    size="small"
                                    value={form.searchBy}
                                    onChange={(e) => fieldChangeHandler('searchBy', e.target.value)}
                                />
                            </Box>
                            <Box mb={1} className={classes.relativeBox}>
                                <TextBox
                                    size="small"
                                    placeholder="Prescription Template"
                                    value={form.search}
                                    onChange={(e) => {
                                        fieldChangeHandler('search', e.target.value)
                                        if (form.searchBy === 'brand') {
                                            debouncedHandler(fetchMedicines, e.target.value, 1, 15, () => {
                                            })
                                        } else if (form.searchBy === 'generic') {
                                            debouncedHandler(fetchGenerics, e.target.value, 1, 15, () => {
                                            })
                                        } else if (form.searchBy === 'indication') {
                                            debouncedHandler(fetchIndications, e.target.value, 1, 15, () => {
                                            })
                                        } else if (form.searchBy === 'therapeutic_class') {
                                            debouncedHandler(fetchTherapeutics, e.target.value, 1, 15, () => {
                                            })
                                        }
                                    }}
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start">
                                            <BiSearchAlt size={18}/>
                                        </InputAdornment>
                                    }}
                                />

                                <SearchResult reset={() => {
                                    setMedicines({data: []})
                                    setGenerics({data: []})
                                    setIndications({data: []})
                                    setTherapeutics({data: []})
                                    setForm((prevState) => ({
                                        ...prevState,
                                        search: ''
                                    }))
                                }}/>
                            </Box>
                        </>}
                    />
                </Grid>
                <Grid item xs={12} sm={8} lg={9}>
                    {form.searchBy === 'brand' && <MedicineDetails data={medicine}/>}
                    {form.searchBy === 'generic' && <GenericDetails data={generic}/>}
                    {form.searchBy === 'indication' && <IndicationDetails data={indication}/>}
                    {form.searchBy === 'therapeutic_class' && <TherapeuticClassDetails data={therapeutic}/>}
                </Grid>
            </Grid>
        </>)
}

export default DrugDatabase
