import React, {useEffect, useState} from 'react'
import {Stack, TableCell, TableRow} from "@mui/material";
import AppTablePaginator from "../../../Shared/AppTablePaginator";
import AppTable from "../../../Shared/AppTable";
import AppTableTitleBar from "../../../Shared/AppTableTitleBar";
import {AppButton} from "../../../../styles/globalStyles";
import {FaEdit} from "react-icons/fa";
import CrudDialog from "../../../Shared/CrudDialog";
import {RiAddCircleFill} from "react-icons/all";
import OnExaminationTemplateForm from "../Forms/OnExaminationTemplateForm";
import useStore from "../../../../stores";
import {deleteAlertMessage, tableIndex} from "../../../../utils/helpers";

const UserOnExaminationTemplate = () => {
    /** fetcher variables */
    const onExamTemplates = useStore(state => state.onExamTemplates)
    const onExamTemplate = useStore(state => state.onExamTemplate)
    const onExamTemplateLoading = useStore(state => state.onExamTemplateLoading)

    /** fetcher actions handle */
    const fetchOnExamTemplates = useStore(state => state.fetchOnExamTemplates)
    const fetchOnExamTemplate = useStore(state => state.fetchOnExamTemplate)
    const deleteOnExamTemplate = useStore(state => state.deleteOnExamTemplate)

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
            deleteOnExamTemplate(id, ()=>{
                fetchOnExamTemplates("",paginate.currentPage, paginate.perPage, 'user_specific')
            })
        );
    }

    /** table data edit handler */
    const editHandler = (id) => {
        setAddDialog(true)
        fetchOnExamTemplate(id)
    }

    /** table data paginate handler */
    const paginateChangeHandler  = (field, value) => {
        setPaginate((prevState) => ({
            ...prevState,
            [field]: parseInt(value),
        }));
    };

    /** fetch paginated data in table */
    useEffect(() => {
        if(paginate){
            fetchOnExamTemplates("",paginate.currentPage, paginate.perPage, 'user_specific')
        }
    }, [fetchOnExamTemplates, paginate]);

    return (
        <>
            <CrudDialog
                title={onExamTemplate && Object.keys(onExamTemplate).length > 0 ? "Update Option" : "Add New Option"}
                open={addDialog}
                size="sm"
                close={() => setAddDialog(false)}
            >
                <OnExaminationTemplateForm
                    closeHandler = {() => setAddDialog(false)}
                    fetchHandler = {() => fetchOnExamTemplates("",paginate.currentPage, paginate.perPage, 'user_specific')}
                    data={onExamTemplate}
                />
            </CrudDialog>

            <AppTable
                titleBar={<AppTableTitleBar title="USER O/E TEMPLATE" controller={
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
                        {onExamTemplates?.data?.map((item, i) => (
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
                found={onExamTemplates?.data.length > 0}
                paginator={
                    <AppTablePaginator
                        from={onExamTemplates?.from}
                        to={onExamTemplates?.to}
                        total={onExamTemplates?.total}
                        count={onExamTemplates?.last_page}
                        perPage={paginate.perPage}
                        currentPage={paginate.currentPage}
                        handleChange={paginateChangeHandler}
                    />
                }
                isLoading={onExamTemplateLoading}
            />
        </>

    )
}

export default UserOnExaminationTemplate
