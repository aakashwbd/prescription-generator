import React, {useEffect, useState} from 'react'
import {Stack, TableCell, TableRow} from "@mui/material";
import {AppButton} from "../../../styles/globalStyles";
import AppTable from "../../../components/Shared/AppTable";
import AppTableTitleBar from "../../../components/Shared/AppTableTitleBar";
import {FaFilter} from "react-icons/all";
import {FaEdit} from "react-icons/fa";
import {BiDetail} from "react-icons/bi";
import AppTablePaginator from "../../../components/Shared/AppTablePaginator";
import moment from "moment";
import useStore from "../../../stores";
import {deleteAlertMessage, foundData, tableIndex} from "../../../utils/helpers";
import {useNavigate} from "react-router-dom";
import {DoctorUrls} from "../../../routes/siteUrls";

const PrescriptionList = () => {
    const navigate = useNavigate()

    const [headers] = useState([
        { field: "SL", align: "center" },
        { field: "Reg", align: "center" },
        { field: "Date", align: "center" },
        { field: "Name", align: "left" },
        { field: "Age", align: "center" },
        { field: "Sex", align: "center" },
        { field: "Address", align: "left" },
        { field: "Dx/Condition", align: "left" },
        { field: "Action", align: "center" },
    ]);

    const fetchPrescriptions = useStore(state => state.fetchPrescriptions)
    const deletePrescription = useStore(state => state.deletePrescription)

    const prescriptions = useStore(state => state.prescriptions)
    const prescriptionLoading = useStore(state => state.prescriptionLoading)

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
                fetchPrescriptions("", paginate.currentPage, paginate.perPage , 'all')
            })
        );
    }


    /** fetch data **/
    useEffect(() => {
        if(paginate){
            fetchPrescriptions("", paginate.currentPage, paginate.perPage , 'done')
        }
    }, [fetchPrescriptions, paginate]);

    return (
        <AppTable
            titleBar={<AppTableTitleBar
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
            />}
            headers={headers}
            content={
                <>
                    {prescriptions?.data?.map((item, i) => (
                        <TableRow key={i}>
                            <TableCell align="center">
                                {tableIndex(paginate.currentPage, paginate.perPage) + i}
                            </TableCell>
                            <TableCell align="center">{foundData(item?.registration_no)}</TableCell>
                            <TableCell align="center">{foundData(moment(item?.date).format("D/MM/YYYY"))}</TableCell>
                            <TableCell>{foundData(item?.name)}</TableCell>
                            <TableCell align="center">{foundData(item?.age)}</TableCell>
                            <TableCell align="center">{foundData(item?.gender)}</TableCell>
                            <TableCell>{foundData(item?.address)}</TableCell>
                            <TableCell>
                                {item?.dx ? (
                                    item?.dx?.map((dItem, d) => (
                                        <React.Fragment key={d}>
                                            {dItem?.name}
                                        </React.Fragment>
                                    ))
                                ) : "N/A"}
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
                                        startIcon={<BiDetail />}
                                    >
                                        Details
                                    </AppButton>
                                    <AppButton
                                        variant="outlined"
                                        color="primary"
                                        size="small"
                                        startIcon={<FaEdit />}
                                        onClick={() => navigate(DoctorUrls.PRESCRIPTIONS.CREATE + `?edit=${item.id}`)}
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
                                    <AppButton
                                        variant="outlined"
                                        color="primary"
                                        size="small"
                                        startIcon={<FaEdit />}
                                    >
                                        Print
                                    </AppButton>
                                    <AppButton
                                        variant="outlined"
                                        color="primary"
                                        size="small"
                                        startIcon={<FaEdit />}
                                    >
                                        Print W
                                    </AppButton>
                                    {/*<AppButton*/}
                                    {/*    variant="outlined"*/}
                                    {/*    color="primary"*/}
                                    {/*    size="small"*/}
                                    {/*    startIcon={<FaEdit />}*/}
                                    {/*>*/}
                                    {/*    EMR*/}
                                    {/*</AppButton>*/}
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
    );
}

export default PrescriptionList
