import React from 'react';
import {Table, TableBody, TableCell, TableContainer, TableRow} from "@mui/material";
import moment from "moment";
import {makeStyles} from "@mui/styles";

const useStyles = makeStyles(theme => ({
    tableContainer: {
        verticalAlign: 'center !important',
        width: '95% !important',
        margin: 'auto !important',
        overflowX: 'visible !important'
    },
    tableRow: {
        "& .MuiTableCell-root": {
            padding: '4px !important',
            border: 'none !important',
        }
    }
}))

const PatientInfo = ({size, settings, data}) => {
    const classes = useStyles()
    return (
        <TableContainer
            className={classes.tableContainer}
            sx={{
                width: size?.patient_info_size?.width + 'cm',
                height: size?.patient_info_size?.height + 'cm',
            }}
        >
            <Table>
                <TableBody>
                    <TableRow className={classes.tableRow}>
                        {settings?.name_display ? (
                            <TableCell
                                width='45%'
                                sx={{
                                    fontSize: settings?.font_size + 'pt !important',
                                    fontWeight: '500 !important'
                                }}
                            >
                                Name :  {data?.name}
                            </TableCell>
                        ) : ""}
                        {settings?.age_display ? (
                            <TableCell
                                width='15%'
                                sx={{
                                    fontSize: settings?.font_size + 'pt !important',
                                    fontWeight: '500 !important',
                                }}
                            >
                                Age : {data?.age}
                            </TableCell>
                        ) : ""}
                        {settings?.gender_display ? (
                            <TableCell
                                width='15%'
                                sx={{
                                    fontSize: settings?.font_size + 'pt !important',
                                    fontWeight: '500 !important',
                                }}
                            >
                                Sex :  {data?.gender}
                            </TableCell>
                        ) : ""}
                        {settings?.date_display ? (
                            <TableCell
                                width='25%'
                                sx={{
                                    fontSize: settings?.font_size + 'pt !important',
                                    fontWeight: '500 !important'
                                }}
                            >
                                Date : {moment(data?.date).format('D-MM-YYYY')}
                            </TableCell>
                        ) : ""}
                    </TableRow>
                    <TableRow className={classes.tableRow}>
                        {settings?.address_display ? (
                            <TableCell
                                width='45%'
                                sx={{

                                    fontSize: settings?.font_size + 'pt !important',
                                    fontWeight: '500 !important'
                                }}
                            >
                                Address : {data?.address}
                            </TableCell>
                        ) : ""}
                        {settings?.registration_no_display ? (
                            <TableCell
                                width='20%'
                                sx={{
                                    fontSize: settings?.font_size + 'pt !important',
                                    fontWeight: '500 !important'
                                }}
                            >
                                Reg. No : {data?.registration_no}
                            </TableCell>
                        ) : ""}
                        {settings?.weight_display ? (
                            <TableCell
                                width='10%'
                                sx={{
                                    fontSize: settings?.font_size + 'pt !important',
                                    fontWeight: '500 !important'
                                }}
                            >
                                Wt. : {data?.bmi?.weight}
                            </TableCell>
                        ) : ""}
                        {settings?.mobile_display ? (
                            <TableCell width='25%' sx={{fontSize: settings?.font_size + 'pt !important', fontWeight: '500 !important'}}>
                                Mobile : {data?.mobile}
                            </TableCell>
                        ) : ""}
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default PatientInfo;
