import React, {useState} from 'react'
import {Box} from "@mui/system";
import {PrescribeTabs} from "../../../../styles/globalStyles";
import {Tab} from "@mui/material";
import OTNoteTable from "../OTNoteTable";
import SalientFeatureTable from "../SalientFeatureTable";
import HistoryTable from "../HistoryTable";
import MedicalCertificateTable from "../MedicalCertificateTable";
import OtherTable from "../OtherTable";

const MedicalInformation = ({form, setForm, fieldChangeHandler = () => {}, debouncedHandler = () => {}}) => {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <PrescribeTabs value={value} onChange={handleChange}>
                    <Tab label="Ot Notes" />
                    <Tab label="Salient Features" />
                    <Tab label="History" />
                    <Tab label="Medical Certificate" />
                    <Tab label="Others" />
                </PrescribeTabs>
            </Box>

            {value === 0 && <OTNoteTable form={form} setForm={setForm} />}
            {value === 1 && <SalientFeatureTable form={form} setForm={setForm}/>}
            {value === 2 && <HistoryTable form={form} setForm={setForm}/>}
            {value === 3 && <MedicalCertificateTable form={form} setForm={setForm}/>}
            {value === 4 && <OtherTable form={form} setForm={setForm}/>}
        </>
    )
}

export default MedicalInformation
