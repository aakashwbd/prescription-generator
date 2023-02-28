import React, {useEffect, useState} from 'react'
import {Stack, TableCell, TableRow} from "@mui/material";
import AppTablePaginator from "../../../Shared/AppTablePaginator";
import AppTable from "../../../Shared/AppTable";
import AppTableTitleBar from "../../../Shared/AppTableTitleBar";
import {AppButton} from "../../../../styles/globalStyles";
import {FaEdit} from "react-icons/fa";
import CrudDialog from "../../../Shared/CrudDialog";
import AdviceTemplateForm from "../Forms/AdviceTemplateForm";
import {RiAddCircleFill} from "react-icons/all";
import useStore from "../../../../stores";
import {deleteAlertMessage, tableIndex} from "../../../../utils/helpers";

const UserAdviceTemplate = () => {
    const adviceTemplates = useStore(state => state.adviceTemplates)
    const adviceTemplate = useStore(state => state.adviceTemplate)
    const adviceTemplateLoading = useStore(state => state.adviceTemplateLoading)

    const fetchAdviceTemplates = useStore(state => state.fetchAdviceTemplates)
    const deleteAdviceTemplate = useStore(state => state.deleteAdviceTemplate)
    const fetchAdviceTemplate = useStore(state => state.fetchAdviceTemplate)

    const [addDialog, setAddDialog] = useState(false)

    const [headers] = useState([
        { field: "SL", align: "center" },
        { field: "Template Name", align: "left" },
        { field: "Action", align: "center" },
    ]);

    const [paginate, setPaginate] = useState({
        perPage: 10,
        currentPage: 1,
    });

    const paginateChangeHandler  = (field, value) => {
        setPaginate((prevState) => ({
            ...prevState,
            [field]: parseInt(value),
        }));
    };

    const deleteHandler = (id) => {
        deleteAlertMessage(() =>
            deleteAdviceTemplate(id, ()=>{
                fetchAdviceTemplates("", paginate.currentPage, paginate.perPage, "user_specific")
            })
        );
    }
    const editHandler = (id) => {
        setAddDialog(true)
        fetchAdviceTemplate(id)
    }

    useEffect(() => {
        if(paginate){
            fetchAdviceTemplates("", paginate.currentPage, paginate.perPage, "user_specific")
        }
    }, [fetchAdviceTemplates, paginate])

    return (
        <>
            <CrudDialog
                title={adviceTemplate && Object.keys(adviceTemplate).length > 0 ? "Update Template" : "Add New" +
                    " Template"}
                open={addDialog}
                size="sm"
                close={() => setAddDialog(false)}
            >
                <AdviceTemplateForm
                    closeHandler={() => setAddDialog(false)}
                    fetchHandler={() => fetchAdviceTemplates("", paginate.currentPage, paginate.perPage, "user_specific")}
                    data={adviceTemplate}
                />
            </CrudDialog>

            <AppTable
                titleBar={<AppTableTitleBar title="USER ADVICE TEMPLATE" controller={
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
                        {adviceTemplates?.data?.map((item, i) => (
                            <TableRow key={i}>
                                <TableCell align="center">
                                    {tableIndex(paginate.currentPage, paginate.perPage) + i}
                                </TableCell>
                                <TableCell>{item?.name}</TableCell>
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
                                            onClick={()=>editHandler(item?.id)}
                                        >
                                            Edit
                                        </AppButton>
                                        <AppButton
                                            variant="outlined"
                                            color="primary"
                                            size="small"
                                            startIcon={<FaEdit />}
                                            onClick={()=>deleteHandler(item?.id)}
                                        >
                                            Delete
                                        </AppButton>
                                    </Stack>
                                </TableCell>
                            </TableRow>
                        ))}
                    </>
                }
                found={adviceTemplates?.data?.length > 0}
                paginator={
                    <AppTablePaginator
                        to={adviceTemplates?.to}
                        from={adviceTemplates?.from}
                        total={adviceTemplates?.total}
                        count={adviceTemplates?.last_page}
                        perPage={paginate.perPage}
                        currentPage={paginate.currentPage}
                        handleChange={paginateChangeHandler}
                    />
                }
                isLoading={adviceTemplateLoading}
            />
        </>
    )
}

export default UserAdviceTemplate
