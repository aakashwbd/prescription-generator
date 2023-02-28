import React, {useEffect, useState} from 'react'
import {Stack, TableCell, TableRow} from "@mui/material";
import AppTablePaginator from "../../../Shared/AppTablePaginator";
import AppTable from "../../../Shared/AppTable";
import AppTableTitleBar from "../../../Shared/AppTableTitleBar";
import {AppButton} from "../../../../styles/globalStyles";
import {FaEdit} from "react-icons/fa";
import CrudDialog from "../../../Shared/CrudDialog";
import DurationTemplateForm from "../Forms/DurationTemplateForm";
import {RiAddCircleFill} from "react-icons/all";
import useStore from "../../../../stores";
import {deleteAlertMessage, tableIndex} from "../../../../utils/helpers";

const UserDurationTemplate = () => {
    /** fetcher variables */
    const durationTemplates = useStore(state => state.durationTemplates)
    const durationTemplate = useStore(state => state.durationTemplate)
    const durationTemplateLoading = useStore(state => state.durationTemplateLoading)

    /** fetcher action handler */
    const fetchDurationTemplates = useStore(state => state.fetchDurationTemplates)
    const fetchDurationTemplate = useStore(state => state.fetchDurationTemplate)
    const deleteDurationTemplate = useStore(state => state.deleteDurationTemplate)

    /** dialog open & close state */
    const [addDialog, setAddDialog] = useState(false)

    /** table headRow state */
    const [headers] = useState([
        { field: "SL", align: "center" },
        { field: "Template Name", align: "left" },
        { field: "Action", align: "center" },
    ]);

    /** table paginate state */
    const [paginate, setPaginate] = useState({
        perPage: 10,
        currentPage: 1,
    });

    /** table paginate handler  */
    const paginateChangeHandler = (field, value) => {
        setPaginate((prevState) => ({
            ...prevState,
            [field]: parseInt(value),
        }));
    };

    /** table data delete handler */
    const deleteHandler = (id) => {
        deleteAlertMessage(() =>
            deleteDurationTemplate(id, ()=>{
                fetchDurationTemplates("", paginate.currentPage, paginate.perPage, 'user_specific')
            })
        );
    }

    /** table data edit handler */
    const editHandler = (id) => {
        setAddDialog(true)
        fetchDurationTemplate(id)
    }

    /** fetch paginated data for table */
    useEffect(() => {
        if(paginate){
            fetchDurationTemplates("", paginate.currentPage, paginate.perPage, 'user_specific')
        }
    }, [fetchDurationTemplates, paginate]);

    return (
        <>
            <CrudDialog
                title={durationTemplate && Object.keys(durationTemplate).length > 0 ? "Update template" : "Add New" +
                    " Template"}
                open={addDialog} size="sm"
                close={() => setAddDialog(false)}
            >
                <DurationTemplateForm
                    closeHandler = {() => setAddDialog(false)}
                    fetchHandler = {() => fetchDurationTemplates("", paginate.currentPage, paginate.perPage, 'user_specific')}
                    data = {durationTemplate}
                />
            </CrudDialog>

            <AppTable
                titleBar={
                    <AppTableTitleBar title="USER DURATION TEMPLATE" controller={
                        <AppButton
                            variant="outlined"
                            color="primary"
                            size="small"
                            startIcon={<RiAddCircleFill />}
                            onClick={() => setAddDialog(true)}
                        >
                            Add New
                        </AppButton>
                    }/>
                }
                headers={headers}
                content={
                    <>
                        {durationTemplates?.data?.map((item, i) => (
                            <TableRow key={i}>
                                <TableCell align="center">
                                    {tableIndex(paginate.currentPage, paginate.perPage) + i}
                                </TableCell>
                                <TableCell>{item.name}</TableCell>
                                <TableCell align="center">
                                    <Stack
                                        direction="row"
                                        spacing={1}
                                        justifyContent="center"
                                    >
                                        <AppButton
                                            variant="outlined"
                                            color="primary"
                                            size="small"
                                            startIcon={<FaEdit />}
                                            onClick={()=>editHandler(item.id)}
                                        >
                                            Edit
                                        </AppButton>
                                        <AppButton
                                            variant="outlined"
                                            color="primary"
                                            size="small"
                                            startIcon={<FaEdit />}
                                            onClick={()=>deleteHandler(item.id)}
                                        >
                                            Delete
                                        </AppButton>
                                    </Stack>
                                </TableCell>
                            </TableRow>
                        ))}
                    </>
                }
                found={durationTemplates?.data?.length > 0}
                paginator={
                    <AppTablePaginator
                        to={durationTemplates?.to}
                        from={durationTemplates?.from}
                        total={durationTemplates?.total}
                        count={durationTemplates?.last_page}
                        perPage={paginate?.perPage}
                        currentPage={paginate?.currentPage}
                        handleChange={paginateChangeHandler}
                    />
                }
                isLoading={durationTemplateLoading}
            />
        </>
    )
}
export default UserDurationTemplate
