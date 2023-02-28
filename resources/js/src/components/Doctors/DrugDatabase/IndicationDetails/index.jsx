import React, {useState} from 'react'
import AppCard from "../../../Shared/AppCard";
import {TableCell, TableRow, Typography} from "@mui/material";
import AppTable from "../../../Shared/AppTable";
import {useStyles} from "./styled";

const IndicationDetails = ({data}) => {
    const classes = useStyles()
    const [headers] = useState([
        {field: "SL", align: "center"},
        {field: "Generic Name", align: "left"},
        {field: "Mode of Action", align: "left"},
    ]);

    if (Object.keys(data).length > 0) {
        return (
            <AppCard
                className={classes.card}
                header={
                    <Typography variant="h6" color="primary">{data?.name}</Typography>
                }
                content={
                    <>
                        <AppTable
                            headers={headers}
                            content={
                                <>
                                    {data?.generics?.map((item, i) => (
                                        <TableRow key={i}>
                                            <TableCell align="center">
                                                {i + 1}
                                            </TableCell>
                                            <TableCell>{item?.name}</TableCell>
                                            <TableCell>{item?.mode_of_action}</TableCell>
                                        </TableRow>
                                    ))}
                                </>
                            }
                            found={data?.generics?.length > 0}
                        />
                    </>
                }
            />
        )
    } else {
        return null;
    }
}

export default IndicationDetails
