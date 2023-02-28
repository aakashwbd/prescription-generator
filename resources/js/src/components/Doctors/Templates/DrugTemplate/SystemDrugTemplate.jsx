import React, {useEffect, useState} from 'react'
import {Stack, TableCell, TableRow} from "@mui/material";
import AppTablePaginator from "../../../Shared/AppTablePaginator";
import AppTable from "../../../Shared/AppTable";
import AppTableTitleBar from "../../../Shared/AppTableTitleBar";
import useStore from "../../../../stores";
import {deleteAlertMessage, tableIndex} from "../../../../utils/helpers";

const SystemDrugTemplate = () => {
    const [headers] = useState([
        { field: "SL", align: "center" },
        { field: "Template Name", align: "left" },
    ]);

    /** fetcher variables **/
    const systemDrugTemps = useStore(state => state.systemDrugTemps)
    const drugTemplateLoading = useStore(state => state.drugTemplateLoading)

    /** fetcher action handlers **/
    const fetchDrugTemplates = useStore(state => state.fetchDrugTemplates)

    const [paginate, setPaginate] = useState({
        perPage: 10,
        currentPage: 1,
    });


    const paginateChangeHandler = (field, value) => {
        setPaginate((prevState) => ({
            ...prevState,
            [field]: parseInt(value),
        }));
    };

    useEffect(() => {
        if(paginate){
            fetchDrugTemplates("",paginate.currentPage, paginate.perPage, 'system')
        }
    }, [fetchDrugTemplates, paginate]);

    return (
        <AppTable
            titleBar={<AppTableTitleBar title="SYSTEM DRUG TEMPLATE"/>}
            headers={headers}
            content={
                <>
                    {systemDrugTemps?.data?.map((item, i) => (
                        <TableRow key={i}>
                            <TableCell align="center">
                                {tableIndex(paginate.currentPage, paginate.perPage) + i}
                            </TableCell>
                            <TableCell>{item.name}</TableCell>
                        </TableRow>
                    ))}
                </>
            }
            found={systemDrugTemps?.data?.length > 0}
            paginator={
                <AppTablePaginator
                    to={systemDrugTemps?.to}
                    from={systemDrugTemps?.from}
                    total={systemDrugTemps?.total}
                    count={systemDrugTemps?.last_page}
                    perPage={paginate?.perPage}
                    currentPage={paginate?.currentPage}
                    handleChange={paginateChangeHandler}
                />
            }
            isLoading={drugTemplateLoading}
        />
    )
}

export default SystemDrugTemplate
