import React, {useEffect, useState} from 'react'
import {Stack, TableCell, TableRow} from "@mui/material";
import AppTablePaginator from "../../../Shared/AppTablePaginator";
import AppTable from "../../../Shared/AppTable";
import AppTableTitleBar from "../../../Shared/AppTableTitleBar";
import useStore from "../../../../stores";
import {deleteAlertMessage, tableIndex} from "../../../../utils/helpers";

const SystemAdviceTemplate = () => {
    const systemAdviceTemplates = useStore(state => state.systemAdviceTemplates)
    const adviceTemplateLoading = useStore(state => state.adviceTemplateLoading)

    const fetchAdviceTemplates = useStore(state => state.fetchAdviceTemplates)

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
            fetchAdviceTemplates("", paginate.currentPage, paginate.perPage, "system")
        }
    }, [fetchAdviceTemplates, paginate])

    return (
        <AppTable
            titleBar={<AppTableTitleBar title="SYSTEM ADVICE TEMPLATE"/>}
            headers={headers}
            content={
                <>
                    {systemAdviceTemplates?.data?.map((item, i) => (
                        <TableRow key={i}>
                            <TableCell align="center">
                                {tableIndex(paginate.currentPage, paginate.perPage) + i}
                            </TableCell>
                            <TableCell>{item.name}</TableCell>
                        </TableRow>
                    ))}
                </>
            }
            found={systemAdviceTemplates?.data?.length > 0}
            paginator={
                <AppTablePaginator
                    to={systemAdviceTemplates?.to}
                    from={systemAdviceTemplates?.from}
                    total={systemAdviceTemplates?.total}
                    count={systemAdviceTemplates?.last_page}
                    perPage={paginate.perPage}
                    currentPage={paginate.currentPage}
                    handleChange={paginateChangeHandler}
                />
            }
            isLoading={adviceTemplateLoading}
        />
    )
}

export default SystemAdviceTemplate
