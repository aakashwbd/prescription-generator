import React, {useEffect, useState} from 'react'
import {Stack, TableCell, TableRow} from "@mui/material";
import AppTablePaginator from "../../../Shared/AppTablePaginator";
import AppTable from "../../../Shared/AppTable";
import AppTableTitleBar from "../../../Shared/AppTableTitleBar";
import {AppButton} from "../../../../styles/globalStyles";
import {FaEdit} from "react-icons/fa";
import {RiAddCircleFill} from "react-icons/all";
import CrudDialog from "../../../Shared/CrudDialog";
import DrugTemplateForm from "../Forms/DrugTemplateForm";
import useStore from "../../../../stores";
import {deleteAlertMessage, tableIndex} from "../../../../utils/helpers";

const UserDrugTemplate = () => {
    /** fetcher variables **/
    const drugTemplates = useStore(state => state.drugTemplates)
    const drugTemplate = useStore(state => state.drugTemplate)
    const drugTemplateLoading = useStore(state => state.drugTemplateLoading)

    /** fetcher action handlers **/
    const fetchDrugTemplates = useStore(state => state.fetchDrugTemplates)
    const setDrugTemplates = useStore(state => state.setDrugTemplates)
    const fetchDrugTemplate = useStore(state => state.fetchDrugTemplate)
    const deleteDrugTemplate = useStore(state => state.deleteDrugTemplate)

    /** local states **/
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

    /** local action handlers **/
    const editHandler = (id) => {
        setAddDialog(true)
        fetchDrugTemplate(id)
    }

    const deleteHandler = (id) => {
        deleteAlertMessage(() =>
            deleteDrugTemplate(id, ()=>{
                fetchDrugTemplates("",paginate.currentPage, paginate.perPage, 'user_specific')
            })
        );
    }

    const paginateChangeHandler = (field, value) => {
        setPaginate((prevState) => ({
            ...prevState,
            [field]: parseInt(value),
        }));
    };

    useEffect(() => {
        if(paginate){
            fetchDrugTemplates("",paginate.currentPage, paginate.perPage, 'user_specific')
        }
    }, [fetchDrugTemplates, paginate]);

    useEffect(() => {
        return(
            setDrugTemplates({data: []})
        )
    }, [])

    return (
        <>
            <CrudDialog
                title={drugTemplate && Object.keys(drugTemplate).length > 0 ? "Update Template": "Add New Template"}
                open={addDialog}
                size="md"
                close={() => setAddDialog(false)}
            >
                <DrugTemplateForm
                    closeHandler={() => setAddDialog(false)}
                    fetchHandler = {() => fetchDrugTemplates("",paginate.currentPage, paginate.perPage, 'user_specific')}
                    data={drugTemplate}
                />
            </CrudDialog>

            <AppTable
                titleBar={<AppTableTitleBar title="USER DRUG TEMPLATE" controller={
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
                        {drugTemplates?.data?.map((item, i) => (
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
                                            onClick={() => editHandler(item.id)}
                                        >
                                            Edit
                                        </AppButton>
                                        <AppButton
                                            variant="outlined"
                                            color="primary"
                                            size="small"
                                            startIcon={<FaEdit />}
                                            onClick={() => deleteHandler(item.id)}
                                        >
                                            Delete
                                        </AppButton>
                                    </Stack>
                                </TableCell>
                            </TableRow>
                        ))}
                    </>
                }
                found={drugTemplates?.data?.length > 0}
                paginator={
                    <AppTablePaginator
                        to={drugTemplates?.to}
                        from={drugTemplates?.from}
                        total={drugTemplates?.total}
                        count={drugTemplates?.last_page}
                        perPage={paginate?.perPage}
                        currentPage={paginate?.currentPage}
                        handleChange={paginateChangeHandler}
                    />
                }
                isLoading={drugTemplateLoading}
            />
        </>
    )
}

export default UserDrugTemplate
