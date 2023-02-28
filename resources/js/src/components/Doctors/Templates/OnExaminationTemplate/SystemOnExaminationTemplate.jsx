import React, {useEffect, useState} from 'react'
import {Stack, TableCell, TableRow} from "@mui/material";
import AppTablePaginator from "../../../Shared/AppTablePaginator";
import AppTable from "../../../Shared/AppTable";
import AppTableTitleBar from "../../../Shared/AppTableTitleBar";
import useStore from "../../../../stores";
import {deleteAlertMessage, tableIndex} from "../../../../utils/helpers";

const SystemOnExaminationTemplate = () => {
    /** fetcher variables */
    const systemOnExamTemplates = useStore(state => state.systemOnExamTemplates)
    const onExamTemplateLoading = useStore(state => state.onExamTemplateLoading)

    /** fetcher actions handle */
    const fetchOnExamTemplates = useStore(state => state.fetchOnExamTemplates)

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


    /** table data paginate handler */
    const paginateChangeHandler  = (field, value) => {
        setPaginate((prevState) => ({
            ...prevState,
            [field]: parseInt(value),
        }));
    };

    /** fetch paginated data in table */
    useEffect(() => {
        if(paginate){
            fetchOnExamTemplates("",paginate.currentPage, paginate.perPage, 'system')
        }
    }, [fetchOnExamTemplates, paginate]);

    return (
        <AppTable
            titleBar={<AppTableTitleBar title="SYSTEM O/E TEMPLATE"/>}
            headers={headers}
            content={
                <>
                    {systemOnExamTemplates?.data?.map((item, i) => (
                        <TableRow key={i}>
                            <TableCell align="center">
                                {tableIndex(paginate.currentPage, paginate.perPage) + i}
                            </TableCell>
                            <TableCell>{item.name}</TableCell>
                        </TableRow>
                    ))}
                </>
            }
            found={systemOnExamTemplates?.data.length > 0}
            paginator={
                <AppTablePaginator
                    from={systemOnExamTemplates?.from}
                    to={systemOnExamTemplates?.to}
                    total={systemOnExamTemplates?.total}
                    count={systemOnExamTemplates?.last_page}
                    perPage={paginate.perPage}
                    currentPage={paginate.currentPage}
                    handleChange={paginateChangeHandler}
                />
            }
            isLoading={onExamTemplateLoading}
        />
    )
}

export default SystemOnExaminationTemplate
