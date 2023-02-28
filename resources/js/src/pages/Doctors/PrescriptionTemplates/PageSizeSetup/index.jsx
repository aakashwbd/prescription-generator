import React, {useEffect, useState} from 'react'
import AppTableTitleBar from "../../../../components/Shared/AppTableTitleBar";
import {Typography} from "@mui/material";
import PageSizeTable from "../../../../components/Doctors/PrescriptionTemplates/PageSizeSetup/PageSizeTable";
import PageSizePreview from "../../../../components/Doctors/PrescriptionTemplates/PageSizeSetup/PageSizePreview";
import {Box} from "@mui/system";
import useStore from "../../../../stores";

const PageSizeSetup = () => {
    /** fetcher variables **/
    const pageSetups = useStore(state => state.pageSetups)
    const pageSetupLoading = useStore(state => state.pageSetupLoading)

    /** fetcher action **/
    const fetchPageSetups = useStore(state => state.fetchPageSetups)
    const updatePageSetup = useStore(state => state.updatePageSetup)

    /** form **/
    const [form, setForm] = useState({
        header_size: {height: '', width: ''},
        patient_info_size: {height: '',width: ''},
        history_size: {height: '',width: ''},
        prescribe_size: { height: '',width: ''},
        prescription_size: {height: '',width: ''},
        footer_size: {height: '', width: ''},
    })

    /** form change handler **/
    const fieldChangeHandler = (field, subField, value) => {
        setForm(prevState => ({
            ...prevState,
            [field] : {
                ...prevState[field],
                [subField]: value,
            }
        }))
    }

    /** form submit handler **/
    const submitHandler = (e) => {
        e.preventDefault();
        let formData = {...form}

        if(form.id){
            updatePageSetup(formData, () => {
                fetchPageSetups(1, 1)
            })
        }
    }

    /** fetched data append in form **/
    useEffect(() => {
        if(pageSetups && pageSetups.data.length > 0){
            setForm(prevState => ({
                ...prevState,
                id: pageSetups?.data[0]?.id,
                header_size: pageSetups?.data[0]?.header_size,
                patient_info_size: pageSetups?.data[0]?.patient_info_size,
                history_size: pageSetups?.data[0]?.history_size,
                prescribe_size: pageSetups?.data[0]?.prescribe_size,
                prescription_size: pageSetups?.data[0]?.prescription_size,
                footer_size: pageSetups?.data[0]?.footer_size,
            }))
        }
    }, [pageSetups]);

    /** fetch data **/
    useEffect(() => {
        fetchPageSetups(1, 1)
    }, [fetchPageSetups]);

    return (
        <>
            <AppTableTitleBar title="Page Size Setup"/>
            <Typography variant="h6" mb={2}>আপনার ছাপানো প্যাড থাকলে এখানে সেই প্যাডের সাইজ ইনপুট দিন। প্রেসক্রিপশন লেখার সময় "Print Without Header" বাটন চেপে এখানকার সাইজ অনুসারে আপনার প্যাডেই প্রেসক্রিপশন প্রিন্ট করতে পারবেন। একটি স্কেল দিয়ে আপনার ছাপানো প্যাড সেন্টিমিটারে মাপুন। নিচে প্রেসক্রিপশনের মোট ৬ টি অংশ আছে । আপনার প্রেসক্রিপশনের মাপ মিলিয়ে অংশগুলো পূরণ করুন।</Typography>
            <Box display="flex" alignItems="flex-start" sx={{gap: '10px'}}>
                <PageSizePreview
                    data={form}
                />
                <PageSizeTable
                    form={form}
                    fieldChangeHandler={fieldChangeHandler}
                    submitHandler={submitHandler}
                    loader={pageSetupLoading}
                />
            </Box>
        </>
    )
}

export default PageSizeSetup
