import React, {useState} from 'react'
import {Box} from "@mui/system";
import {useStyles} from "../styled";
import {FormHelperText, Grid, InputAdornment, Stack, Typography} from "@mui/material";
import TextBox from "../../../Shared/TextBox";
import {BiSearchAlt} from "react-icons/bi";
import {AiFillPrinter, MdPreview, RiSave2Fill, TfiPrinter} from "react-icons/all";
import {AppButton} from "../../../../styles/globalStyles";
import useStore from "../../../../stores";
import TemplateSearch from "../../Templates/TemplateSearch";
import SelectBox from "../../../Shared/SelectBox";

const PatientBox = ({
                        form,
                        errors,
                        fieldChange = () => {},
                        formHandler = () =>{},
                        debouncedHandler = () => {},
                        previewHandler = () => {},
}) => {
    const classes = useStyles()

    const fetchPrescriptions =  useStore(state => state.fetchPrescriptions)
    const setPrescriptions =  useStore(state => state.setPrescriptions)

    const [search, setSearch] = useState({
        appoint: "",
    })

    const searchFieldHandler = (field, value) => {
        setSearch((prevState) => ({
            ...prevState,
            [field] : value
        }))
    }

    return (
        <Box className={classes.formBox} p={3} mb={2}>
            <Grid container spacing={2} alignItems="center">
                <Grid item container xs={12} lg={8} spacing={2} >
                    <Grid item xs={12} sm={4} lg={6}>
                        <Box sx={{position: 'relative'}}>
                            <Stack direction="row" alignItems="center" spacing={2} className={classes.stacks}>
                                <Typography variant="body1" color="primary">Apt. No :</Typography>
                                <TextBox
                                    size="small"
                                    placeholder="Appointment"
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start">
                                            <BiSearchAlt size={18} />
                                        </InputAdornment>
                                    }}
                                    value={search.appoint}
                                    onChange={(e) => {
                                        searchFieldHandler( 'appoint', e.target.value)
                                        debouncedHandler(fetchPrescriptions, e.target.value, 1, 15, () => {})
                                    }}
                                />
                                {/*<TextBox*/}
                                {/*    size="small"*/}
                                {/*    placeholder="Registration ID"*/}
                                {/*    value={form.registration_no}*/}
                                {/*    onChange={(e) => fieldChange('registration_no', e.target.value)}*/}
                                {/*/>*/}
                            </Stack>
                            <TemplateSearch
                                forQuery='prescriptions'
                                reset={()=>{
                                    setPrescriptions({data: []})
                                    setSearch(prevState => ({
                                        ...prevState,
                                        appoint: "",
                                    }))
                                }}
                            />
                        </Box>
                    </Grid>
                    {/*<Grid item xs={12} sm={4} lg={3}>*/}
                    {/*    <TextBox*/}
                    {/*        size="small"*/}
                    {/*        placeholder="Appointment"*/}
                    {/*        InputProps={{*/}
                    {/*            startAdornment: <InputAdornment position="start">*/}
                    {/*                <BiSearchAlt size={18} />*/}
                    {/*            </InputAdornment>*/}
                    {/*        }}*/}
                    {/*    />*/}
                    {/*</Grid>*/}
                    <Grid item xs={12} sm={4} lg={3}>
                        <Stack direction="row" alignItems="center" spacing={2} className={classes.stacks}>
                            <Typography variant="body1" color="primary">Name  :</Typography>
                            <TextBox
                                size="small"
                                placeholder="Name"
                                value={form.name}
                                onChange={(e) => fieldChange('name', e.target.value)}
                            />
                        </Stack>
                    </Grid>
                    <Grid item xs={12} sm={4} lg={3}>
                        <Stack direction="row" alignItems="center" spacing={2} className={classes.stacks}>
                            <Typography variant="body1" color="primary">Age  :</Typography>
                            <TextBox
                                type='number'
                                size="small"
                                placeholder="Age"
                                value={form.age}
                                onChange={(e) => fieldChange('age', e.target.value)}
                            />
                        </Stack>
                    </Grid>
                    <Grid item xs={12} sm={4} lg={3}>
                        <Stack direction="row" alignItems="center" spacing={2} className={classes.stacks}>
                            <Typography variant="body1" color="primary">Sex  :</Typography>
                            <SelectBox
                                size='small'
                                options={['Male', "Female", 'Other']}
                                value={form.gender}
                                onChange={(e) => fieldChange('gender', e.target.value)}
                            />
                            {/*<TextBox*/}
                            {/*    size="small"*/}
                            {/*    placeholder="Sex"*/}
                            {/*    value={form.gender}*/}
                            {/*    onChange={(e) => fieldChange('gender', e.target.value)}*/}
                            {/*/>*/}
                        </Stack>
                    </Grid>
                    <Grid item xs={12} sm={4} lg={3}>
                        <Stack direction="row"  spacing={2} alignItems='center' className={classes.stacks}>
                            <Typography variant="body1" color="primary">Mobile  :</Typography>
                            <TextBox
                                size="small"
                                placeholder="Mobile"
                                value={form.mobile}
                                onChange={(e) => fieldChange('mobile', e.target.value)}
                                error={errors.mobile.show}
                                // helperText={errors.mobile.text}
                            />
                        </Stack>
                        {errors.mobile.show && (<FormHelperText sx={{color: '#CC0E0E'}}>{errors.mobile.text}</FormHelperText>)}
                    </Grid>
                    <Grid item xs={12} sm={4} lg={6}>
                        <Stack direction="row" alignItems="center" spacing={2} className={classes.stacks}>
                            <Typography variant="body1" color="primary">Address :</Typography>
                            <TextBox
                                size="small"
                                placeholder="Address"
                                value={form.address}
                                onChange={(e) => fieldChange('address', e.target.value)}
                            />
                        </Stack>
                    </Grid>
                </Grid>
                <Grid item xs={12} lg={4}>
                    <Box className={classes.formBox} p={2} display="flex" alignItems="center" justifyContent="space-between" sx={{gap: '2px'}}>
                        <AppButton variant="ghost" className={classes.btn} onClick={previewHandler}>
                            <Stack direction="column" spacing={1} justifyContent="center" alignItems="center">
                                <MdPreview size={28} />
                                <Typography variant="body2">Preview</Typography>
                            </Stack>
                        </AppButton>
                        <AppButton variant="ghost" className={classes.btn} onClick={(e) => formHandler(e, 'save_print')}>
                            <Stack direction="column" spacing={1} justifyContent="center" alignItems="center">
                                <AiFillPrinter size={28} />
                                <Typography variant="body2">Save & Print</Typography>
                            </Stack>
                        </AppButton>
                        <AppButton variant="ghost" className={classes.btn} onClick={(e) => formHandler(e, 'save_print_w')}>
                            <Stack direction="column" spacing={1} justifyContent="center" alignItems="center">
                                <TfiPrinter size={28} />
                                <Typography variant="body2">Save & Print <br/> Without header</Typography>
                            </Stack>
                        </AppButton>
                        <AppButton variant="ghost" className={classes.btn} onClick={(e) => formHandler(e, 'save')}>
                            <Stack direction="column" spacing={1} justifyContent="center" alignItems="center">
                                <RiSave2Fill size={28} />
                                <Typography variant="body2">Save Only</Typography>
                            </Stack>
                        </AppButton>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}

export default PatientBox
