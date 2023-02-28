import React from 'react'
import {Table, TableBody, TableCell, TableContainer, TableRow} from "@mui/material";
import TextBox from "../../../../Shared/TextBox";
import AppCard from "../../../../Shared/AppCard";
import {useStyles} from "./styled";
import {LoadingAppButton} from "../../../../../styles/globalStyles";
import {Box} from "@mui/system";

const PageSizeTable = ({form, fieldChangeHandler=()=>{}, submitHandler = () => {}, loader=false}) => {
    const classes = useStyles()

    return (
        <AppCard
            className={classes.card}
            content={
                <form onSubmit={submitHandler}>
                    <TableContainer>
                        <Table size="small" className={classes.table}>
                            <TableBody>
                                <TableRow>
                                    <TableCell colSpan={3}><strong>হেডার সাইজ : (1)</strong></TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>দৈর্ঘ্য /height সেন্টিমিটারে</TableCell>
                                    <TableCell>
                                        <TextBox
                                            size="small"
                                            value={form?.header_size?.height}
                                            onChange={(e) => fieldChangeHandler('header_size', 'height', e.target.value)}
                                        />
                                    </TableCell>
                                    <TableCell>cm</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>প্রস্থ /width সেন্টিমিটারে</TableCell>
                                    <TableCell>
                                        <TextBox
                                            size="small"
                                            value={form?.header_size?.width}
                                            onChange={(e) => fieldChangeHandler('header_size', 'width', e.target.value)}
                                        />
                                    </TableCell>
                                    <TableCell>cm</TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell colSpan={3}><strong>রোগীর তথ্য: (2)</strong></TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>দৈর্ঘ্য /height সেন্টিমিটারে</TableCell>
                                    <TableCell>
                                        <TextBox
                                            size="small"
                                            value={form?.patient_info_size?.height}
                                            onChange={(e) => fieldChangeHandler('patient_info_size', 'height', e.target.value)}
                                        />
                                    </TableCell>
                                    <TableCell>cm</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>প্রস্থ /width সেন্টিমিটারে</TableCell>
                                    <TableCell>
                                        <TextBox
                                            size="small"
                                            value={form?.patient_info_size?.width}
                                            onChange={(e) => fieldChangeHandler('patient_info_size', 'width', e.target.value)}
                                        />
                                    </TableCell>
                                    <TableCell>cm</TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell colSpan={3}><strong>হিস্ট্রি অংশ: (3)</strong></TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>দৈর্ঘ্য /height সেন্টিমিটারে</TableCell>
                                    <TableCell>
                                        <TextBox
                                            size="small"
                                            value={form?.history_size?.height}
                                            onChange={(e) => fieldChangeHandler('history_size', 'height', e.target.value)}
                                        />
                                    </TableCell>
                                    <TableCell>cm</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>প্রস্থ /width সেন্টিমিটারে</TableCell>
                                    <TableCell>
                                        <TextBox
                                            size="small"
                                            value={form?.history_size?.width}
                                            onChange={(e) => fieldChangeHandler('history_size', 'width', e.target.value)}
                                        />
                                    </TableCell>
                                    <TableCell>cm</TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell colSpan={3}><strong>মূল প্যাড প্রেসক্রিপশন অংশ: (4)</strong></TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>দৈর্ঘ্য /height সেন্টিমিটারে</TableCell>
                                    <TableCell>
                                        <TextBox
                                            size="small"
                                            value={form?.prescribe_size?.height}
                                            onChange={(e) => fieldChangeHandler('prescribe_size', 'height', e.target.value)}
                                        />
                                    </TableCell>
                                    <TableCell>cm</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>প্রস্থ /width সেন্টিমিটারে</TableCell>
                                    <TableCell>
                                        <TextBox
                                            size="small"
                                            value={form?.prescribe_size?.width}
                                            onChange={(e) => fieldChangeHandler('prescribe_size', 'width', e.target.value)}
                                        />
                                    </TableCell>
                                    <TableCell>cm</TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell colSpan={3}><strong>ফুটার: (5)</strong></TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>দৈর্ঘ্য /height সেন্টিমিটারে</TableCell>
                                    <TableCell>
                                        <TextBox
                                            size="small"
                                            value={form?.footer_size?.height}
                                            onChange={(e) => fieldChangeHandler('footer_size', 'height', e.target.value)}
                                        />
                                    </TableCell>
                                    <TableCell>cm</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>প্রস্থ /width সেন্টিমিটারে</TableCell>
                                    <TableCell>
                                        <TextBox
                                            size="small"
                                            value={form?.footer_size?.width}
                                            onChange={(e) => fieldChangeHandler('footer_size', 'width', e.target.value)}
                                        />
                                    </TableCell>
                                    <TableCell>cm</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell colSpan={3}><strong>সম্পূর্ণ প্রেসক্রিপশনের সাইজ: (6)</strong></TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>দৈর্ঘ্য /height সেন্টিমিটারে</TableCell>
                                    <TableCell>
                                        <TextBox
                                            size="small"
                                            value={form?.prescription_size?.height}
                                            onChange={(e) => fieldChangeHandler('prescription_size', 'height', e.target.value)}
                                        />
                                    </TableCell>
                                    <TableCell>cm</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>প্রস্থ /width সেন্টিমিটারে</TableCell>
                                    <TableCell>
                                        <TextBox
                                            size="small"
                                            value={form?.prescription_size?.width}
                                            onChange={(e) => fieldChangeHandler('prescription_size', 'width', e.target.value)}
                                        />
                                    </TableCell>
                                    <TableCell>cm</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Box textAlign='center' my={2}>
                        <LoadingAppButton
                            variant="contained"
                            color="primary"
                            type='submit'
                            disabled={loader}
                            loading={loader}
                            loadingIndicator="Loading…"
                        >
                            Update
                        </LoadingAppButton>
                    </Box>
                </form>
            }
        />
    )
}

export default PageSizeTable
