import React, {useEffect, useState} from 'react'
import {LoadingAppButton} from "../../../../styles/globalStyles";
import AppTableTitleBar from "../../../../components/Shared/AppTableTitleBar";
import {Container, Grid} from "@mui/material";
import TextEditor from "../../../../components/Shared/TextEditor";
import TextBox from "../../../../components/Shared/TextBox";
import useStore from "../../../../stores";

const HeaderEdit = () => {
    const currentUser = useStore(state => state.currentUser)
    const pageSetups = useStore(state => state.pageSetups)
    const pageSetupLoading = useStore(state => state.pageSetupLoading)

    const fetchPageSetups = useStore(state => state.fetchPageSetups)
    const updatePageSetup = useStore(state => state.updatePageSetup)

    const [form, setForm] = useState({
        header_left_content: "",
        header_right_content: "",
        header_bg_color: "#000000",
        footer_content: ""
    })

    const fieldChangeHandler = (field, value) => {
        setForm((prevState) => ({
            ...prevState,
            [field] : value
        }))
    }

    const submitHandler = (e) => {
        e.preventDefault();
        let formData = {...form}
        if(form.id){
            updatePageSetup(formData, () => {
                fetchPageSetups(1, 1)
            })
        }
    }

    useEffect(() => {
        if(pageSetups && Object.keys(pageSetups).length > 0){
            setForm((prevState) => ({
                ...prevState,
                ...pageSetups.data[0],
                header_left_content: pageSetups?.data[0]?.header_left_content ? pageSetups?.data[0]?.header_left_content : "",
                header_right_content: pageSetups?.data[0]?.header_right_content ? pageSetups?.data[0]?.header_right_content : "",
                header_bg_color: pageSetups?.data[0]?.header_bg_color ? pageSetups?.data[0]?.header_bg_color : '#000000',
            }))
        }
    }, [pageSetups]);

    useEffect(() => {
        fetchPageSetups(1, 1)
    }, []);

    console.log('currentUser', currentUser)

    return (
        <Container maxWidth="lg">
            <AppTableTitleBar title="Header Edit"/>

            <form onSubmit={submitHandler}>
                <Grid container spacing={2} mb={2} justifyContent="center">
                    <Grid item xs={12} sm={6} lg={6}>
                        <TextEditor
                            value={form.header_left_content}
                            onChange={(data) => fieldChangeHandler('header_left_content', data)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} lg={6}>
                        <TextEditor
                            value={form.header_right_content}
                            onChange={(data) => fieldChangeHandler('header_right_content', data)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} lg={6}>
                        <TextBox
                            label="Select Background Color"
                            type="color"
                            value={form.header_bg_color}
                            onChange={(e) => fieldChangeHandler('header_bg_color', e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} lg={6}>
                        <TextBox
                            label="Footer Text"
                            value={form.footer_content}
                            onChange={(e) => fieldChangeHandler('footer_content', e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4} lg={2}>
                        <LoadingAppButton
                            type='submit'
                            fullWidth
                            variant="contained"
                            color="primary"
                            loading={pageSetupLoading}
                            disabled={pageSetupLoading}
                            loadingIndicator="Loading…"
                        >
                            {form.id ? "Update" : "Save"}
                        </LoadingAppButton>
                    </Grid>
                </Grid>
            </form>
        </Container>
    )
}
export default HeaderEdit
