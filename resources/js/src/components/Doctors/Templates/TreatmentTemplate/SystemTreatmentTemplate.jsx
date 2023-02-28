import React, {useEffect, useState} from 'react'
import {Stack, TableCell, TableRow} from "@mui/material";
import AppTablePaginator from "../../../Shared/AppTablePaginator";
import AppTable from "../../../Shared/AppTable";
import AppTableTitleBar from "../../../Shared/AppTableTitleBar";
import useStore from "../../../../stores";
import {deleteAlertMessage, tableIndex} from "../../../../utils/helpers";

const SystemTreatmentTemplate = () => {
    const [headers] = useState([
        { field: "SL", align: "center" },
        { field: "Template Name", align: "left" },
    ]);

    /** fetcher variables **/
    const systemTreatmentTemplates = useStore(state => state.systemTreatmentTemplates)
    const treatmentTemplateLoading = useStore(state => state.treatmentTemplateLoading)

    /** fetcher action handlers **/
    const fetchTreatmentTemplates = useStore(state => state.fetchTreatmentTemplates)


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
            fetchTreatmentTemplates("",paginate.currentPage, paginate.perPage, 'system')
        }
    }, [fetchTreatmentTemplates, paginate]);

    return (
        <AppTable
            titleBar={<AppTableTitleBar title="SYSTEM TREATMENT TEMPLATE"/>}
            headers={headers}
            content={
                <>
                    {systemTreatmentTemplates?.data?.map((item, i) => (
                        <TableRow key={i}>
                            <TableCell align="center">
                                {tableIndex(paginate.currentPage, paginate.perPage) + i}
                            </TableCell>
                            <TableCell>{item.name}</TableCell>
                        </TableRow>
                    ))}
                </>
            }
            found={systemTreatmentTemplates?.data?.length > 0}
            paginator={
                <AppTablePaginator
                    to={systemTreatmentTemplates?.to}
                    from={systemTreatmentTemplates?.from}
                    total={systemTreatmentTemplates?.total}
                    count={systemTreatmentTemplates?.last_page}
                    perPage={paginate?.perPage}
                    currentPage={paginate?.currentPage}
                    handleChange={paginateChangeHandler}
                />
            }
            isLoading={treatmentTemplateLoading}
        />
    )
}

export default SystemTreatmentTemplate
