import React, {useState} from 'react'
import AppCard from "../../../Shared/AppCard";
import {Grid, Stack, TableCell, TableRow, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import AppTable from "../../../Shared/AppTable";
import {useStyles} from "./styled";

const GenericDetails = ({data}) => {
    const classes = useStyles()
    const [headers] = useState([{field: "SL", align: "center"}, {
        field: "Brand Name",
        align: "left"
    }, {field: "Strength", align: "center"}, {field: "Form", align: "center"}, {
        field: "Manufacturer",
        align: "left"
    }, {field: "Pack Size", align: "center"}, {field: "Price", align: "center"},]);

    if (Object.keys(data).length > 0) {
        return (<AppCard
                className={classes.card}
                header={<Typography variant="h6" color="primary">{data?.name}</Typography>}
                content={<>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6} lg={4}>
                            <Stack direction="column" spacing={2}>
                                <AppCard
                                    header={<Typography variant="body1"><strong>This Generic Available
                                        as</strong></Typography>}
                                    content={<Stack direction="column" spacing={1}>
                                        {data?.medicine_types?.map((item, i) => (
                                            <Link to='/' key={i}>{item.name}</Link>))}
                                    </Stack>}
                                />

                                <AppCard
                                    header={<Typography variant="body1"><strong>Strength Available
                                        as</strong></Typography>}
                                    content={<Stack direction="column" spacing={1}>
                                        {data?.strengths?.map((item, i) => (<Link to='/' key={i}>{item.name}</Link>))}
                                    </Stack>}
                                />

                                <AppCard
                                    header={<Typography variant="body1"><strong>Mode Of Action</strong></Typography>}
                                    content={<Typography variant="body2">{data?.mode_of_action}</Typography>}
                                />
                            </Stack>
                        </Grid>
                        <Grid item xs={12} sm={6} lg={8}>
                            <AppTable
                                headers={headers}
                                content={<>
                                    {data?.medicines?.map((item, i) => (<TableRow key={i}>
                                            <TableCell align="center">
                                                {i + 1}
                                            </TableCell>
                                            <TableCell>{item.name}</TableCell>
                                            <TableCell
                                                align="center">{item?.strength?.name || 'N/A'}</TableCell>
                                            <TableCell
                                                align="center">{item?.medicine_type?.name || 'N/A'}</TableCell>
                                            <TableCell>{item?.manufacturer?.name || 'N/A'}</TableCell>
                                            <TableCell align="center">
                                                {item?.package_prices?.map((pItem, pI) => (<span
                                                        key={pI}>{pItem?.package}{pI < (item.package_prices.length - 1) ? ',' : ''}</span>))}
                                            </TableCell>
                                            <TableCell align="center">Tk.
                                                {item?.package_prices?.map((pItem, pI) => (<span
                                                        key={pI}>{pItem?.price}{pI < (item.package_prices.length - 1) ? ',' : ''}</span>))}
                                            </TableCell>
                                        </TableRow>))}
                                </>}
                                found={data?.medicines?.length > 0}
                            />
                        </Grid>
                    </Grid>
                </>}
            />)
    } else {
        return null
    }
}

export default GenericDetails
