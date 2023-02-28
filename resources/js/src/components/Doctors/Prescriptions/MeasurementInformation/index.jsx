import React, {useState} from 'react'
import {Box} from "@mui/system";
import {PrescribeTabs} from "../../../../styles/globalStyles";
import {Tab} from "@mui/material";
import BmiTable from "../BmiTable";
import InsulinTable from "../InsulinTable";
import ZScoreTable from "../ZScoreTable";
import BmrTable from "../BmrTable";
import EddTable from "../EddTable";

const MeasurementInformation = ({form, setForm, debouncedHandler = () => {}, fieldChangeHandle = () => {}}) => {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <PrescribeTabs value={value} onChange={handleChange}>
                    <Tab label="BMI" />
                    <Tab label="Insulin" />
                    <Tab label="Z-Score" />
                    <Tab label="BMR" />
                    <Tab label="EDD" />
                </PrescribeTabs>
            </Box>

            {value === 0 && <BmiTable form={form} setForm={setForm} fieldChangeHandle={fieldChangeHandle}/>}
            {value === 1 && <InsulinTable form={form} setForm={setForm} fieldChangeHandle={fieldChangeHandle} />}
            {value === 2 && <ZScoreTable form={form} setForm={setForm} fieldChangeHandle={fieldChangeHandle}/>}
            {value === 3 && <BmrTable form={form} setForm={setForm} fieldChangeHandle={fieldChangeHandle}/>}
            {value === 4 && <EddTable form={form} setForm={setForm} fieldChangeHandle={fieldChangeHandle}/>}
        </>
    )
}

export default MeasurementInformation
