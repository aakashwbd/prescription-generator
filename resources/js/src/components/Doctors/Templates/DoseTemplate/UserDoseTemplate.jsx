import React, {useEffect, useState} from 'react'
import {Stack, TableCell, TableRow} from "@mui/material";
import AppTablePaginator from "../../../Shared/AppTablePaginator";
import AppTable from "../../../Shared/AppTable";
import AppTableTitleBar from "../../../Shared/AppTableTitleBar";
import {AppButton} from "../../../../styles/globalStyles";
import {FaEdit} from "react-icons/fa";
import CrudDialog from "../../../Shared/CrudDialog";
import {RiAddCircleFill} from "react-icons/all";
import DoseTemplateForm from "../Forms/DoseTemplateForm";
import useStore from "../../../../stores";
import {deleteAlertMessage, tableIndex} from "../../../../utils/helpers";

const UserDoseTemplate = () => {
    /** fetcher variables */
    const doseTemplates = useStore(state => state.doseTemplates)
    const doseTemplate = useStore(state => state.doseTemplate)
    const doseTemplateLoading = useStore(state => state.doseTemplateLoading)

    /** fetcher action handler */
    const fetchDoseTemplates = useStore(state => state.fetchDoseTemplates)
    const fetchDoseTemplate = useStore(state => state.fetchDoseTemplate)
    const deleteDoseTemplate = useStore(state => state.deleteDoseTemplate)

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

    /** table paginate handler */
    const paginateChangeHandler = (field, value) => {
        setPaginate((prevState) => ({
            ...prevState,
            [field]: parseInt(value),
        }));
    }

    /** table data delete handler */
    const deleteHandler = (id) => {
        deleteAlertMessage(() =>
            deleteDoseTemplate(id, ()=>{
                fetchDoseTemplates("", paginate.currentPage, paginate.perPage, "user_specific")
            })
        );
    }

    /** table data edit handler */
    const editHandler = (id) => {
        setAddDialog(true)
        fetchDoseTemplate(id)
    }

    /** fetch paginated table data */
    useEffect(() => {
        if(paginate){
            fetchDoseTemplates("", paginate.currentPage, paginate.perPage, "user_specific")
        }
    }, [fetchDoseTemplates, paginate]);

    return (
        <>
            <CrudDialog
                title={doseTemplate && Object.keys(doseTemplate).length > 0 ? "Update Template" : "Add New Template"}
                open={addDialog}
                size="sm"
                close={() => setAddDialog(false)}
            >
                <DoseTemplateForm
                    closeHandler = { () => setAddDialog(false)}
                    fetchHandler = { () => fetchDoseTemplates("", paginate.currentPage, paginate.perPage, "user_specific")}
                    data = {doseTemplate}
                />
            </CrudDialog>

            <AppTable
                titleBar={<AppTableTitleBar title="USER DOSE TEMPLATE" controller={
                    <>
                        <AppButton
                            variant="outlined"
                            color="primary"
                            size="small"
                            startIcon={<RiAddCircleFill />}
                            onClick={() => setAddDialog(true)}
                        >
                            Add New
                        </AppButton>
                    </>
                }/>}
                headers={headers}
                content={
                    <>
                        {doseTemplates?.data?.map((item, i) => (
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
                found={doseTemplates?.data?.length > 0}
                paginator={
                    <AppTablePaginator
                        to={doseTemplates?.to}
                        from={doseTemplates?.from}
                        total={doseTemplates?.total}
                        count={doseTemplates?.last_page}
                        perPage={paginate?.perPage}
                        currentPage={paginate?.currentPage}
                        handleChange={paginateChangeHandler}
                    />
                }
                isLoading={doseTemplateLoading}
            />
        </>
    )
}

export default UserDoseTemplate
