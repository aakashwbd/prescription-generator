import React, {useEffect, useState} from 'react'
import moment from "moment/moment";
import AppTable from "../../../components/Shared/AppTable";
import AppTableTitleBar from "../../../components/Shared/AppTableTitleBar";
import {AppButton, FlatChip} from "../../../styles/globalStyles";
import {FaFilter, RiAddCircleFill} from "react-icons/all";
import {Stack, TableCell, TableRow} from "@mui/material";
import {FaEdit} from "react-icons/fa";
import AppTablePaginator from "../../../components/Shared/AppTablePaginator";
import CrudDialog from "../../../components/Shared/CrudDialog";
import AppointmentForm from "../../../components/Doctors/Appointments/AppointmentForm";
import useStore from "../../../stores";
import {deleteAlertMessage, foundData, tableIndex} from "../../../utils/helpers";
import {useNavigate} from "react-router-dom";
import {DoctorUrls} from "../../../routes/siteUrls";

const Appointments = () => {
    const navigate = useNavigate()
    const prescriptions = useStore(state => state.prescriptions)
    const prescriptionLoading = useStore(state => state.prescriptionLoading)

    const fetchPrescriptions = useStore(state => state.fetchPrescriptions)
    const fetchPrescription = useStore(state => state.fetchPrescription)
    const deletePrescription = useStore(state => state.deletePrescription)

    const [addDialog, setAddDialog] = useState(false)

    const [headers] = useState([
        { field: "SL", align: "center" },
        { field: "Date", align: "center" },
        { field: "Apnt.No", align: "center" },
        { field: "Name", align: "left" },
        { field: "Reg.No", align: "center" },
        { field: "Age", align: "center" },
        { field: "Sex", align: "center" },
        { field: "Mobile", align: "center" },
        { field: "Address", align: "left" },
        { field: "Paid", align: "center" },
        { field: "Status", align: "center" },
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
            deletePrescription(id, ()=>{
                fetchPrescriptions("", paginate.currentPage, paginate.perPage , 'Pending')
            })
        );
    }
    const editHandler = (id) => {
        setAddDialog(true)
        fetchPrescription(id)
    }

    useEffect(() => {
        if(paginate){
            fetchPrescriptions("", paginate.currentPage, paginate.perPage , 'Pending')
        }
    }, [fetchPrescriptions, paginate]);

    return (
        <>
            <CrudDialog title="Add Appointment" open={addDialog} size="xs" close={() => setAddDialog(false)}>
                <AppointmentForm
                    closeHandler = {() => setAddDialog(false)}
                    fetchHandler = {() => fetchPrescriptions("", paginate.currentPage, paginate.perPage , 'Pending')}
                />
            </CrudDialog>

            <AppTable
                titleBar={<AppTableTitleBar
                    title="Appointment List"
                    controller={
                        <>
                            {/*<AppButton*/}
                            {/*    variant="outlined"*/}
                            {/*    color="primary"*/}
                            {/*    size="small"*/}
                            {/*    startIcon={<FaFilter />}*/}
                            {/*>*/}
                            {/*    Filter*/}
                            {/*</AppButton>*/}
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
                    }
                />}
                headers={headers}
                content={
                    <>
                        {prescriptions?.data?.map((item, i) => (
                            <TableRow key={i}>
                                <TableCell align="center">
                                    {tableIndex(paginate.currentPage, paginate.perPage) + i}
                                </TableCell>
                                <TableCell align="center">{foundData(moment(item.date).format("MMM Do YY"))}</TableCell>
                                <TableCell align="center">{foundData(item.appoint_no)}</TableCell>
                                <TableCell>{foundData(item.name)}</TableCell>
                                <TableCell align="center">{foundData(item.registration_no)}</TableCell>
                                <TableCell align="center">{foundData(item.age)}</TableCell>
                                <TableCell align="center">{foundData(item.gender)}</TableCell>
                                <TableCell align="center">{foundData(item.mobile)}</TableCell>
                                <TableCell>{foundData(item.address)}</TableCell>
                                <TableCell align="center">{foundData(item.paid)}</TableCell>
                                <TableCell align="center">
                                    <FlatChip label={foundData(item.status)} size="small" color="warning" />
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
                                            onClick={() => navigate(DoctorUrls.PRESCRIPTIONS.CREATE + `?edit=${item.id}`)}
                                        >
                                            Prescribe
                                        </AppButton>
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
                found={prescriptions?.data?.length > 0}
                paginator={
                    <AppTablePaginator
                        to={prescriptions?.to}
                        from={prescriptions?.from}
                        total={prescriptions?.total}
                        count={prescriptions?.last_page}
                        perPage={paginate.perPage}
                        currentPage={paginate.currentPage}
                        handleChange={paginateChangeHandler}
                    />
                }
                isLoading={prescriptionLoading}
            />
        </>
    );
}

export default Appointments
