import React, {useEffect, useState} from 'react'
import {Stack, TableCell, TableRow} from "@mui/material";
import AppTablePaginator from "../../../Shared/AppTablePaginator";
import AppTable from "../../../Shared/AppTable";
import AppTableTitleBar from "../../../Shared/AppTableTitleBar";
import {AppButton} from "../../../../styles/globalStyles";
import {FaEdit} from "react-icons/fa";
import CrudDialog from "../../../Shared/CrudDialog";
import {RiAddCircleFill} from "react-icons/all";
import InvestigationTemplateForm from "../Forms/InvestigationTemplateForm";
import useStore from "../../../../stores";
import {deleteAlertMessage, tableIndex} from "../../../../utils/helpers";

const UserInvestigationTemplate = () => {
    /** fetcher variables */
    const investigationTemplates = useStore(state => state.investigationTemplates)
    const investigationTemplate = useStore(state => state.investigationTemplate)
    const investigationTemplateLoading = useStore(state => state.investigationTemplateLoading)

    /** fetcher actions handler */
    const fetchInvestigationTemplates = useStore(state => state.fetchInvestigationTemplates)
    const fetchInvestigationTemplate = useStore(state => state.fetchInvestigationTemplate)
    const deleteInvestigationTemplate = useStore(state => state.deleteInvestigationTemplate)

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

    /** table data delete handler */
    const deleteHandler = (id) => {
        deleteAlertMessage(() =>
            deleteInvestigationTemplate(id, ()=>{
                fetchInvestigationTemplates("", paginate.currentPage, paginate.perPage, 'user_specific')
            })
        );
    }

    /** table data edit handler */
    const editHandler = (id) => {
        setAddDialog(true)
        fetchInvestigationTemplate(id)
    }

    /** table paginate handler */
    const paginateChangeHandler  = (field, value) => {
        setPaginate((prevState) => ({
            ...prevState,
            [field]: parseInt(value),
        }));
    };

    /** fetch paginated data for table */
    useEffect(() => {
        if(paginate){
            fetchInvestigationTemplates("", paginate.currentPage, paginate.perPage, 'user_specific')
        }
    }, [fetchInvestigationTemplates, paginate]);

    return (
        <>
            <CrudDialog
                title={investigationTemplate && Object.keys(investigationTemplate).length > 0 ? "Update Option" : "Add New Option"}
                open={addDialog}
                size="sm"
                close={() => setAddDialog(false)}
            >
                <InvestigationTemplateForm
                    closeHandler = {() => setAddDialog(false)}
                    fetchHandler = {() => fetchInvestigationTemplates("", paginate.currentPage, paginate.perPage, 'user_specific')}
                    data={investigationTemplate}
                />
            </CrudDialog>

            <AppTable
                titleBar={<AppTableTitleBar title="USER I/X TEMPLATE" controller={
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
                        {investigationTemplates?.data?.map((item, i) => (
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
                found={investigationTemplates?.data?.length > 0}
                paginator={
                    <AppTablePaginator
                        to={investigationTemplates?.to}
                        from={investigationTemplates?.from}
                        total={investigationTemplates?.total}
                        count={investigationTemplates?.last_page}
                        perPage={paginate.perPage}
                        currentPage={paginate.currentPage}
                        handleChange={paginateChangeHandler}
                    />
                }
                isLoading={investigationTemplateLoading}
            />
        </>

    )
}

export default UserInvestigationTemplate
