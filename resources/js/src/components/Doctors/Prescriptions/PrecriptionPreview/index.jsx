import React, {useEffect, useState} from 'react'
import {Box} from "@mui/system";
import {useStyles} from "./styled";
import {List, ListItem, ListItemText, Typography} from "@mui/material";
import useStore from "../../../../stores";
import Headers from "./Headers";
import PatientInfo from "./PatientInfo";
import Prescribe from "./Prescribe";
import Footer from "./Footer";
import History from "./History";

const PrescriptionPreview = ({data}) => {
    const pageSetups = useStore(state => state.pageSetups)
    const prescriptionSettings = useStore(state => state.prescriptionSettings)

    const fetchPageSetups = useStore(state => state.fetchPageSetups)
    const fetchPrescriptionSettings = useStore(state => state.fetchPrescriptionSettings)

    const [previews, setPreviews] = useState({
        footer_content : "",
        footer_size: {width: '', height: ''},
        header_barcode_display : 0,
        header_bg_color : "",
        header_left_content: "",
        header_right_content: "",
        header_size : {width: '', height: ''},
        history_size : {width: '', height: ''},
        patient_info_size : {width: '', height: ''},
        prescribe_size : {width: '', height: ''},
        prescription_size : {width: '', height: ''}
    })
    const classes = useStyles()


    useEffect(() => {
        fetchPageSetups(1,1)
        fetchPrescriptionSettings(1,1)
    }, [fetchPageSetups, fetchPrescriptionSettings]);

    useEffect(() => {
        if(pageSetups && pageSetups.data.length > 0){
            setPreviews((prevState) => ({
                ...prevState,
                ...pageSetups.data[0]
            }))
        }
    }, [pageSetups]);

    return (
        <Box className={classes.fullPage} sx={{width: previews?.prescription_size?.width + 'cm', height: previews?.prescription_size?.height  + 'cm'}}>
            <Box
                className={classes.section}
                sx={{
                    width: previews?.header_size?.width + 'cm',
                    height: previews?.header_size?.height + 'cm',
                    backgroundColor: previews?.header_bg_color
                }}
            >
                <Headers rightContent={previews?.header_right_content} leftContent={previews?.header_left_content}/>
            </Box>
            <Box className={classes.section} sx={{width: previews?.patient_info_size?.width + 'cm', height: previews?.patient_info_size?.height + 'cm'}}>
                <PatientInfo data={data} settings={prescriptionSettings?.data[0]} size={previews}/>
            </Box>
            <Box display="flex">
                <Box className={`${classes.section} ${classes.leftSection}`} sx={{width: previews?.history_size?.width + 'cm', height: previews?.history_size?.height + 'cm'}}>
                    <History data={data} settings={prescriptionSettings?.data[0]}/>
                </Box>
                <Box className={classes.section} sx={{width: previews?.prescribe_size?.width + 'cm', height: previews?.prescribe_size?.height + 'cm'}} p={2}>
                    <Typography variant="h3">Rx.</Typography>
                    <Prescribe data={data} settings={prescriptionSettings?.data[0]}/>
                </Box>
            </Box>
            <Footer data={previews}/>
        </Box>
    )
}
export default PrescriptionPreview
