import React, {useEffect, useState} from 'react'
import {Stack, TableCell, TableRow} from "@mui/material";
import AppTablePaginator from "../../../Shared/AppTablePaginator";
import AppTable from "../../../Shared/AppTable";
import AppTableTitleBar from "../../../Shared/AppTableTitleBar";
import {AppButton} from "../../../../styles/globalStyles";
import {FaEdit} from "react-icons/fa";
import AdviceTemplateForm from "../Forms/AdviceTemplateForm";
import CrudDialog from "../../../Shared/CrudDialog";
import CubicCentimeterTemplateForm from "../Forms/CubicCentimeterTemplateForm";
import {RiAddCircleFill} from "react-icons/all";
import {deleteAlertMessage, tableIndex} from "../../../../utils/helpers";
import useStore from "../../../../stores";

const UserCubicCentimeterTemplate = () => {
    /** state variables **/
    const cubicTemplates = useStore(state => state.cubicTemplates)
    const cubicTemplate = useStore(state => state.cubicTemplate)
    const cubicTemplateLoading = useStore(state => state.cubicTemplateLoading)

    /** state actions handle **/
    const fetchCubicTemplates = useStore(state => state.fetchCubicTemplates)
    const fetchCubicTemplate = useStore(state => state.fetchCubicTemplate)
    const deleteCubicTemplate = useStore(state => state.deleteCubicTemplate)

    /** dialog open & close state **/
    const [addDialog, setAddDialog] = useState(false)

    /** table headRow state **/
    const [headers] = useState([
        { field: "SL", align: "center" },
        { field: "Template Name", align: "left" },
        { field: "Action", align: "center" },
    ]);

    /** table paginate state **/
    const [paginate, setPaginate] = useState({
        perPage: 10,
        currentPage: 1,
    });

    /** table data delete handler **/
    const deleteHandler = (id) => {
        deleteAlertMessage(() =>
            deleteCubicTemplate(id, ()=>{
                fetchCubicTemplates("", paginate.currentPage, paginate.perPage, "user_specific")
            })
        );
    }

    /** table data edit handler **/
    const editHandler = (id) => {
        setAddDialog(true)
        fetchCubicTemplate(id)
    }

    /** table paginate handler **/
    const paginateChangeHandler  = (field, value) => {
        setPaginate((prevState) => ({
            ...prevState,
            [field]: parseInt(value),
        }));
    };

    /** fetch paginated data **/
    useEffect(() => {
        if(paginate){
            fetchCubicTemplates("", paginate.currentPage, paginate.perPage, "user_specific")
        }
    }, [fetchCubicTemplates, paginate]);

    return (
        <>
            <CrudDialog
                title={cubicTemplate && Object.keys(cubicTemplate).length > 0 ? "Update Templates" : "Add New Template"}
                open={addDialog}
                size="sm"
                close={() => setAddDialog(false)}
            >
                <CubicCentimeterTemplateForm
                    closeHandler={() => setAddDialog(false)}
                    fetchHandler = {() => fetchCubicTemplates("", paginate.currentPage, paginate.perPage, "user_specific")}
                    data = {cubicTemplate}
                />
            </CrudDialog>

            <AppTable
                titleBar={<AppTableTitleBar title="USER C/C TEMPLATE" controller={
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
                        {cubicTemplates?.data?.map((item, i) => (
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
                found={cubicTemplates?.data?.length > 0}
                paginator={
                    <AppTablePaginator
                        to={cubicTemplates?.to}
                        from={cubicTemplates?.from}
                        total={cubicTemplates?.total}
                        count={cubicTemplates?.last_page}
                        perPage={paginate.perPage}
                        currentPage={paginate.currentPage}
                        handleChange={paginateChangeHandler}
                    />
                }
                isLoading={cubicTemplateLoading}
            />
        </>
    )
}

export default UserCubicCentimeterTemplate
