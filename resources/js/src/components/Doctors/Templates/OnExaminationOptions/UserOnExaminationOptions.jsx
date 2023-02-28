import React, {useEffect, useState} from 'react'
import {Stack, TableCell, TableRow} from "@mui/material";
import AppTablePaginator from "../../../Shared/AppTablePaginator";
import AppTable from "../../../Shared/AppTable";
import AppTableTitleBar from "../../../Shared/AppTableTitleBar";
import {AppButton, FlatChip} from "../../../../styles/globalStyles";
import {FaEdit} from "react-icons/fa";
import {RiAddCircleFill} from "react-icons/all";
import CrudDialog from "../../../Shared/CrudDialog";
import OnExaminationOptionForm from "../Forms/OnExaminationOptionForm";
import useStore from "../../../../stores";
import {deleteAlertMessage, tableIndex} from "../../../../utils/helpers";

const UserOnExaminationOptions = () => {
    /** fetcher variables **/
    const onExamOptTemps = useStore(state => state.onExamOptTemps)
    const onExamOptTemp = useStore(state => state.onExamOptTemp)
    const onExamOptTempLoading = useStore(state => state.onExamOptTempLoading)

    /** fetcher actions handle */
    const fetchOnExamOptTemps = useStore(state => state.fetchOnExamOptTemps)
    const fetchOnExamOptTemp = useStore(state => state.fetchOnExamOptTemp)
    const deleteOnExamOptTemp = useStore(state => state.deleteOnExamOptTemp)

    /** dialog open & close state */
    const [addDialog, setAddDialog] = useState(false)

    /** table headRow state */
    const [headers] = useState([
        { field: "SL", align: "center" },
        { field: "Name", align: "left" },
        { field: "Position", align: "center" },
        { field: "Status", align: "center" },
        { field: "Action", align: "center" },
    ]);

    /** table paginate state */
    const [paginate, setPaginate] = useState({
        perPage: 10,
        currentPage: 1,
    });

    /** data delete handler */
    const deleteHandler = (id) => {
        deleteAlertMessage(() =>
            deleteOnExamOptTemp(id, ()=>{
                fetchOnExamOptTemps(paginate.currentPage, paginate.perPage, 'user_specific')
            })
        );
    }

    /** data edit handler */
    const editHandler = (id) => {
        setAddDialog(true)
        fetchOnExamOptTemp(id)
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
            fetchOnExamOptTemps( paginate.currentPage, paginate.perPage, 'user_specific')
        }
    }, [fetchOnExamOptTemps, paginate]);

    return (
        <>
            <CrudDialog
                title={onExamOptTemp && Object.keys(onExamOptTemp).length > 0 ? "Update Option" : "Add New Option"}
                open={addDialog}
                size="xs"
                close={() => setAddDialog(false)}
            >
                <OnExaminationOptionForm
                    closeHandler = {() => setAddDialog(false)}
                    fetchHandler = {() => fetchOnExamOptTemps(paginate.currentPage, paginate.perPage, 'user_specific')}
                    data={onExamOptTemp}
                />
            </CrudDialog>

            <AppTable
                titleBar={<AppTableTitleBar title="USER O/E BOX OPTIONS" controller={
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
                        {onExamOptTemps?.data?.map((item, i) => (
                            <TableRow key={i}>
                                <TableCell align="center">
                                    {tableIndex(paginate.currentPage, paginate.perPage) + i}
                                </TableCell>
                                <TableCell>{item.name}</TableCell>
                                <TableCell align="center">{item.position}</TableCell>
                                <TableCell align="center">
                                    <FlatChip label={item.status} color="success" size="small" />
                                </TableCell>
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
                found={onExamOptTemps?.data?.length > 0}
                paginator={
                    <AppTablePaginator
                        to={onExamOptTemps?.to}
                        from={onExamOptTemps?.from}
                        total={onExamOptTemps?.total}
                        count={onExamOptTemps?.last_page}
                        perPage={paginate.perPage}
                        currentPage={paginate.currentPage}
                        handleChange={paginateChangeHandler}
                    />
                }
                isLoading={onExamOptTempLoading}
            />
        </>
    )
}
export default UserOnExaminationOptions
