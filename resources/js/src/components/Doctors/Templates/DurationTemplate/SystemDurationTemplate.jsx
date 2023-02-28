import React, {useEffect, useState} from 'react'
import {TableCell, TableRow} from "@mui/material";
import AppTablePaginator from "../../../Shared/AppTablePaginator";
import AppTable from "../../../Shared/AppTable";
import AppTableTitleBar from "../../../Shared/AppTableTitleBar";
import useStore from "../../../../stores";
import {tableIndex} from "../../../../utils/helpers";

const SystemDurationTemplate = () => {
    /** fetcher variables */
    const systemDurationTemplates = useStore(state => state.systemDurationTemplates)
    const durationTemplateLoading = useStore(state => state.durationTemplateLoading)

    /** fetcher action handler */
    const fetchDurationTemplates = useStore(state => state.fetchDurationTemplates)

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

    /** table paginate handler  */
    const paginateChangeHandler = (field, value) => {
        setPaginate((prevState) => ({
            ...prevState,
            [field]: parseInt(value),
        }));
    };

    /** fetch paginated data for table */
    useEffect(() => {
        if(paginate){
            fetchDurationTemplates("", paginate.currentPage, paginate.perPage, 'system')
        }
    }, [fetchDurationTemplates, paginate]);

    return (
        <AppTable
            titleBar={<AppTableTitleBar title="SYSTEM DURATION TEMPLATE"/>}
            headers={headers}
            content={
                <>
                    {systemDurationTemplates?.data.map((item, i) => (
                        <TableRow key={i}>
                            <TableCell align="center">
                                {tableIndex(paginate.currentPage, paginate.perPage) + i}
                            </TableCell>
                            <TableCell>{item.name}</TableCell>
                        </TableRow>
                    ))}
                </>
            }
            found={systemDurationTemplates?.data?.length > 0}
            paginator={
                <AppTablePaginator
                    to={systemDurationTemplates?.to}
                    from={systemDurationTemplates?.from}
                    total={systemDurationTemplates?.total}
                    count={systemDurationTemplates?.last_page}
                    perPage={paginate?.perPage}
                    currentPage={paginate?.currentPage}
                    handleChange={paginateChangeHandler}
                />
            }
            isLoading={durationTemplateLoading}
        />
    )
}

export default SystemDurationTemplate
