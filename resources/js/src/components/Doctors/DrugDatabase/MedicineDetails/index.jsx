import React, {useState} from 'react'
import AppCard from "../../../Shared/AppCard";
import {TableCell, TableRow, Typography} from "@mui/material";
import {useStyles} from "./styled";
import AppTable from "../../../Shared/AppTable";

const MedicineDetails = ({data}) => {
    const classes = useStyles()
    const [headers] = useState([
        {field: "SL", align: "center"},
        {field: "Package", align: "left"},
        {field: "Price", align: "center"},
    ]);

    if (Object.keys(data).length > 0) {
        return (
            <AppCard
                className={classes.card}
                header={
                    <Typography variant="h6"
                                color="primary">{data?.name} {data?.strength?.name} ({data?.medicine_type?.name})</Typography>
                }
                content={
                    <>
                        <Typography variant="body1" mb={1} color="primary"><strong>Generic</strong></Typography>
                        <Typography variant="body1" mb={1}>{data?.generic?.name || 'N/A'}</Typography>

                        <Typography variant="body1" mb={1} color="primary"><strong>Therapeutic
                            Class</strong></Typography>
                        <Typography variant="body1" mb={1}>{data?.therapeutic_class?.name || 'N/A'}</Typography>

                        <Typography variant="body1" mb={1} color="primary"><strong>Adult Dose</strong></Typography>
                        <Typography variant="body1" mb={1}>{data?.adult_dose || 'N/A'}</Typography>

                        <Typography variant="body1" mb={1} color="primary"><strong>Child Dose</strong></Typography>
                        <Typography variant="body1" mb={1}>{data?.child_dose || 'N/A'}</Typography>

                        <Typography variant="body1" mb={1} color="primary"><strong>Renal Dose</strong></Typography>
                        <Typography variant="body1" mb={1}>{data?.renal_dose || 'N/A'}</Typography>

                        <Typography variant="body1" mb={1} color="primary"><strong>Administration</strong></Typography>
                        <Typography variant="body1" mb={1}>{data?.administration || 'N/A'}</Typography>

                        <Typography variant="body1" mb={1} color="primary"><strong>Indication</strong></Typography>
                        <Typography variant="body1" mb={1}>{data?.indication}</Typography>

                        <Typography variant="body1" mb={1}
                                    color="primary"><strong>Contraindication</strong></Typography>
                        <Typography variant="body1" mb={1}>{data?.contraindication || 'N/A'}</Typography>

                        <Typography variant="body1" mb={1} color="primary"><strong>Side Effects</strong></Typography>
                        <Typography variant="body1" mb={1}>{data?.side_effect || 'N/A'}</Typography>

                        <Typography variant="body1" mb={1} color="primary"><strong>Pregnancy
                            Category</strong></Typography>
                        <Typography variant="body1"
                                    mb={1}>Category: {data?.pregnancy_category?.name || 'N/A'}</Typography>
                        <Typography variant="body1" mb={1}>{data?.pregnancy_category?.description || 'N/A'}</Typography>

                        <Typography variant="body1" mb={1} color="primary"><strong>Mode of Action</strong></Typography>
                        <Typography variant="body1" mb={1}>{data?.generic?.mode_of_action || 'N/A'}</Typography>

                        <Typography variant="body1" mb={1} color="primary"><strong>Interaction</strong></Typography>
                        <Typography variant="body1" mb={1}>{data?.interaction || 'N/A'}</Typography>

                        <Typography variant="body1" mb={1} color="primary"><strong>Pack And Size</strong></Typography>

                        <AppTable
                            headers={headers}
                            content={
                                <>
                                    {data?.package_prices?.map((item, i) => (
                                        <TableRow key={i}>
                                            <TableCell align="center">
                                                {i + 1}
                                            </TableCell>
                                            <TableCell>{item?.package}</TableCell>
                                            <TableCell align="center">Tk. {item?.price}</TableCell>
                                        </TableRow>
                                    ))}
                                </>
                            }
                            found={data?.package_prices?.length > 0}
                        />
                    </>
                }
            />
        )
    } else {
        return null;
    }
}

export default MedicineDetails
