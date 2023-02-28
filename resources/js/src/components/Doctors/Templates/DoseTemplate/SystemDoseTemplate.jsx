import React, {useEffect, useState} from 'react'
import {Stack, TableCell, TableRow} from "@mui/material";
import AppTablePaginator from "../../../Shared/AppTablePaginator";
import AppTable from "../../../Shared/AppTable";
import AppTableTitleBar from "../../../Shared/AppTableTitleBar";
import useStore from "../../../../stores";
import {deleteAlertMessage, tableIndex} from "../../../../utils/helpers";

const SystemDoseTemplate = () => {
    /** fetcher variables */
    const systemDoseTemplates = useStore(state => state.systemDoseTemplates)
    const doseTemplateLoading = useStore(state => state.doseTemplateLoading)

    /** fetcher action handler */
    const fetchDoseTemplates = useStore(state => state.fetchDoseTemplates)

    /** table headRow state */
    const [headers] = useState([
        { field: "SL", align: "center" },
        { field: "Template Name", align: "left" },
    ]);

    /** table paginate state */
    const [paginate, setPaginate] = useState({
        perPage: 10,
        currentPage: 1,
    });

    /** table paginate handler */
    const paginateChangeHandler = (field, value) => {
        setPaginate((prevState) => ({
            ...prevState,
            [field]: parseInt(value),
        }));
    }

    /** fetch paginated table data */
    useEffect(() => {
        if(paginate){
            fetchDoseTemplates("", paginate.currentPage, paginate.perPage, "system")
        }
    }, [fetchDoseTemplates, paginate]);

    return (
        <AppTable
            titleBar={<AppTableTitleBar title="SYSTEM DOSE TEMPLATE"/>}
            headers={headers}
            content={
                <>
                    {systemDoseTemplates?.data?.map((item, i) => (
                        <TableRow key={i}>
                            <TableCell align="center">
                                {tableIndex(paginate.currentPage, paginate.perPage) + i}
                            </TableCell>
                            <TableCell>{item.name}</TableCell>
                        </TableRow>
                    ))}
                </>
            }
            found={systemDoseTemplates?.data?.length > 0}
            paginator={
                <AppTablePaginator
                    to={systemDoseTemplates?.to}
                    from={systemDoseTemplates?.from}
                    total={systemDoseTemplates?.total}
                    count={systemDoseTemplates?.last_page}
                    perPage={paginate?.perPage}
                    currentPage={paginate?.currentPage}
                    handleChange={paginateChangeHandler}
                />
            }
            isLoading={doseTemplateLoading}
        />
    )
}

export default SystemDoseTemplate
