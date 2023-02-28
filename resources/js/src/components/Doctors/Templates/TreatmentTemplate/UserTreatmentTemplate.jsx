import React, {useEffect, useState} from 'react'
import {Stack, TableCell, TableRow} from "@mui/material";
import AppTablePaginator from "../../../Shared/AppTablePaginator";
import AppTable from "../../../Shared/AppTable";
import AppTableTitleBar from "../../../Shared/AppTableTitleBar";
import {AppButton} from "../../../../styles/globalStyles";
import {FaEdit} from "react-icons/fa";
import CrudDialog from "../../../Shared/CrudDialog";
import DrugTemplateForm from "../Forms/DrugTemplateForm";
import {RiAddCircleFill} from "react-icons/all";
import TreatmentTemplateForm from "../Forms/TreatmentTemplateForm";
import useStore from "../../../../stores";
import {deleteAlertMessage, tableIndex} from "../../../../utils/helpers";

const UserTreatmentTemplate = () => {
    /** fetcher variables **/
    const treatmentTemplates = useStore(state => state.treatmentTemplates)
    const treatmentTemplate = useStore(state => state.treatmentTemplate)
    const treatmentTemplateLoading = useStore(state => state.treatmentTemplateLoading)

    /** fetcher action handlers **/
    const fetchTreatmentTemplates = useStore(state => state.fetchTreatmentTemplates)
    const fetchTreatmentTemplate = useStore(state => state.fetchTreatmentTemplate)
    const deleteTreatmentTemplate = useStore(state => state.deleteTreatmentTemplate)

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
        fetchTreatmentTemplate(id)
    }

    const deleteHandler = (id) => {
        deleteAlertMessage(() =>
            deleteTreatmentTemplate(id, ()=>{
                fetchTreatmentTemplates("",paginate.currentPage, paginate.perPage, 'user_specific')
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
            fetchTreatmentTemplates("",paginate.currentPage, paginate.perPage, 'user_specific')
        }
    }, [fetchTreatmentTemplates, paginate]);

    return (
        <>
            <CrudDialog
                title={treatmentTemplate && Object.keys(treatmentTemplate).length > 0 ? "Update Template": "Add New Template"}
                open={addDialog}
                size="lg"
                close={() => setAddDialog(false)}
            >
                <TreatmentTemplateForm
                    closeHandler={() => setAddDialog(false)}
                    fetchHandler = {() => fetchTreatmentTemplates("",paginate.currentPage, paginate.perPage, 'user_specific')}
                    data={treatmentTemplate}
                />
            </CrudDialog>

            <AppTable
                titleBar={<AppTableTitleBar title="USER TREATMENT TEMPLATE" controller={
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
                }/> }
                headers={headers}
                content={
                    <>
                        {treatmentTemplates?.data?.map((item, i) => (
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
                found={treatmentTemplates?.data?.length > 0}
                paginator={
                    <AppTablePaginator
                        to={treatmentTemplates?.to}
                        from={treatmentTemplates?.from}
                        total={treatmentTemplates?.total}
                        count={treatmentTemplates?.last_page}
                        perPage={paginate?.perPage}
                        currentPage={paginate?.currentPage}
                        handleChange={paginateChangeHandler}
                    />
                }
                isLoading={treatmentTemplateLoading}
            />
        </>
    )
}

export default UserTreatmentTemplate
