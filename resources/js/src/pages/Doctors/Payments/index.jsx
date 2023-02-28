import React, {useEffect, useState} from 'react'
import moment from "moment/moment";
import AppTable from "../../../components/Shared/AppTable";
import AppTableTitleBar from "../../../components/Shared/AppTableTitleBar";
import {AppButton} from "../../../styles/globalStyles";
import {FaFilter} from "react-icons/all";
import {Stack, TableCell, TableRow, Typography} from "@mui/material";
import {FaEdit} from "react-icons/fa";
import AppTablePaginator from "../../../components/Shared/AppTablePaginator";
import useStore from "../../../stores";
import {deleteAlertMessage, foundData, tableIndex} from "../../../utils/helpers";

const Payments = () => {
    const fetchPrescriptions = useStore(state => state.fetchPrescriptions)
    const fetchPrescriptionSummary = useStore(state => state.fetchPrescriptionSummary)
    const deletePrescription = useStore(state => state.deletePrescription)
    const prescriptions = useStore(state => state.prescriptions)
    const prescriptionSummary = useStore(state => state.prescriptionSummary)
    const prescriptionLoading = useStore(state => state.prescriptionLoading)

    const [headers] = useState([
        { field: "SL", align: "center" },
        { field: "Date", align: "center" },
        { field: "Reg.No", align: "center" },
        { field: "Name", align: "left" },
        { field: "Address", align: "left" },
        { field: "Mobile", align: "center" },
        { field: "Payment", align: "center" },
        { field: "Action", align: "center" },
    ]);

    /** table paginate state **/
    const [paginate, setPaginate] = useState({
        perPage: 10,
        currentPage: 1,
    });

    /** table data paginate handler **/
    const paginateChangeHandler  = (field, value) => {
        setPaginate((prevState) => ({
            ...prevState,
            [field]: parseInt(value),
        }));
    };

    const deleteHandler = (id) => {
        deleteAlertMessage(() =>
            deletePrescription(id, ()=>{
                fetchPrescriptions("", paginate.currentPage, paginate.perPage , 'Done')
                fetchPrescriptionSummary()
            })
        );
    }

    /** fetch data **/
    useEffect(() => {
        if(paginate){
            fetchPrescriptions("", paginate.currentPage, paginate.perPage , 'Done')
        }
    }, [fetchPrescriptions, paginate]);
    useEffect(() => {
        fetchPrescriptionSummary()
    }, [fetchPrescriptionSummary]);

    return (
        <>
            <AppTableTitleBar
                title="Payment List"
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
                    </>
                }
            />

            <Typography variant="body1" mb={3}>
                <strong>Daily Total : {prescriptionSummary?.daily_income}/- | Monthly Total: {prescriptionSummary?.monthly_income}/-</strong>
            </Typography>

            <AppTable
                headers={headers}
                content={
                    <>
                        {prescriptions?.data?.map((item, i) => (
                            <TableRow key={i}>
                                <TableCell align="center">
                                    {tableIndex(paginate.currentPage, paginate.perPage) + i}
                                </TableCell>
                                <TableCell align="center">{foundData(moment(item.date).format("D MMM YYYY"))}</TableCell>
                                <TableCell align="center">{foundData(item.registration_no)}</TableCell>
                                <TableCell>{foundData(item.name)}</TableCell>
                                <TableCell>{foundData(item.address)}</TableCell>
                                <TableCell align="center">{foundData(item.mobile)}</TableCell>
                                <TableCell align="center">{foundData(item.paid)}</TableCell>
                                <TableCell align="center">
                                    <Stack
                                        direction="row"
                                        spacing={1}
                                        justifyContent="center"
                                    >
                                        {/*<AppButton*/}
                                        {/*    variant="outlined"*/}
                                        {/*    color="primary"*/}
                                        {/*    size="small"*/}
                                        {/*    startIcon={<FaEdit />}*/}
                                        {/*>*/}
                                        {/*    Edit*/}
                                        {/*</AppButton>*/}
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

export default Payments
