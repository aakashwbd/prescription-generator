import React, {useEffect, useState} from 'react'
import {Stack, TableCell, TableRow} from "@mui/material";
import AppTablePaginator from "../../../Shared/AppTablePaginator";
import AppTable from "../../../Shared/AppTable";
import AppTableTitleBar from "../../../Shared/AppTableTitleBar";
import useStore from "../../../../stores";
import {deleteAlertMessage, tableIndex} from "../../../../utils/helpers";

const SystemCubicCentimeterTemplate = () => {
    const systemCubicTemplates = useStore(state => state.systemCubicTemplates)
    const cubicTemplateLoading = useStore(state => state.cubicTemplateLoading)

    const fetchCubicTemplates = useStore(state => state.fetchCubicTemplates)

    const [headers] = useState([
        { field: "SL", align: "center" },
        { field: "Template Name", align: "left" },
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

    useEffect(() => {
        if(paginate){
            fetchCubicTemplates("", paginate.currentPage, paginate.perPage, "system")
        }
    }, [fetchCubicTemplates, paginate]);

    return (
        <AppTable
            titleBar={<AppTableTitleBar title="SYSTEM C/C TEMPLATE"/>}
            headers={headers}
            content={
                <>
                    {systemCubicTemplates?.data?.map((item, i) => (
                        <TableRow key={i}>
                            <TableCell align="center">
                                {tableIndex(paginate.currentPage, paginate.perPage) + i}
                            </TableCell>
                            <TableCell>{item.name}</TableCell>
                        </TableRow>
                    ))}
                </>
            }
            found={systemCubicTemplates?.data?.length > 0}
            paginator={
                <AppTablePaginator
                    to={systemCubicTemplates?.to}
                    from={systemCubicTemplates?.from}
                    total={systemCubicTemplates?.total}
                    count={systemCubicTemplates?.last_page}
                    perPage={paginate.perPage}
                    currentPage={paginate.currentPage}
                    handleChange={paginateChangeHandler}
                />
            }
            isLoading={cubicTemplateLoading}
        />
    )
}

export default SystemCubicCentimeterTemplate
