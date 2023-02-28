import React, {useEffect, useState} from 'react'
import {TableCell, TableRow} from "@mui/material";
import AppTablePaginator from "../../../Shared/AppTablePaginator";
import AppTable from "../../../Shared/AppTable";
import AppTableTitleBar from "../../../Shared/AppTableTitleBar";
import useStore from "../../../../stores";
import {tableIndex} from "../../../../utils/helpers";

const SystemInvestigationTemplate = () => {
    /** fetcher variables */
    const systemInvestigationTemplates = useStore(state => state.systemInvestigationTemplates)
    const investigationTemplateLoading = useStore(state => state.investigationTemplateLoading)

    /** fetcher actions handler */
    const fetchInvestigationTemplates = useStore(state => state.fetchInvestigationTemplates)

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
    const paginateChangeHandler  = (field, value) => {
        setPaginate((prevState) => ({
            ...prevState,
            [field]: parseInt(value),
        }));
    };

    /** fetch paginated data for table */
    useEffect(() => {
        if(paginate){
            fetchInvestigationTemplates("", paginate.currentPage, paginate.perPage, 'system')
        }
    }, [fetchInvestigationTemplates, paginate]);

    return (
        <AppTable
            titleBar={<AppTableTitleBar title="SYSTEM I/X TEMPLATE"/>}
            headers={headers}
            content={
                <>
                    {systemInvestigationTemplates?.data?.map((item, i) => (
                        <TableRow key={i}>
                            <TableCell align="center">
                                {tableIndex(paginate.currentPage, paginate.perPage) + i}
                            </TableCell>
                            <TableCell>{item.name}</TableCell>
                        </TableRow>
                    ))}
                </>
            }
            found={systemInvestigationTemplates?.data?.length > 0}
            paginator={
                <AppTablePaginator
                    to={systemInvestigationTemplates?.to}
                    from={systemInvestigationTemplates?.from}
                    total={systemInvestigationTemplates?.total}
                    count={systemInvestigationTemplates?.last_page}
                    perPage={paginate.perPage}
                    currentPage={paginate.currentPage}
                    handleChange={paginateChangeHandler}
                />
            }
            isLoading={investigationTemplateLoading}
        />
    )
}

export default SystemInvestigationTemplate
