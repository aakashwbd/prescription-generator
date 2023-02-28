import React from 'react'
import {
    FormControlLabel,
    Radio,
    RadioGroup,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow
} from "@mui/material";
import TextBox from "../../../Shared/TextBox";
import AppCard from "../../../Shared/AppCard";
import {useStyles} from "./styled";
import {LoadingAppButton} from "../../../../styles/globalStyles";

const OptionTable = ({form ={}, fieldChangeHandler = () => {}, submitHandler = () => {}, isLoading=false}) => {
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
                                    <TableCell><strong>Print Font Size (pt)</strong></TableCell>
                                    <TableCell>
                                        <TextBox
                                            size="small"
                                            value={form.font_size}
                                            onChange={(e) => fieldChangeHandler('font_size', e.target.value)}
                                        />
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell><strong>Line Per Page</strong></TableCell>
                                    <TableCell>
                                        <TextBox
                                            size="small"
                                            value={form.line_per_page}
                                            onChange={(e) => fieldChangeHandler('line_per_page', e.target.value)}
                                        />
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell><strong>Visit Fees</strong></TableCell>
                                    <TableCell>
                                        <TextBox
                                            size="small"
                                            value={form.visit_fee}
                                            onChange={(e) => fieldChangeHandler('visit_fee', e.target.value)}
                                        />
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell><strong>Re-Visit Fees</strong></TableCell>
                                    <TableCell>
                                        <TextBox
                                            size="small"
                                            value={form.re_visit_fee}
                                            onChange={(e) => fieldChangeHandler('re_visit_fee', e.target.value)}
                                        />
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell><strong>Re-Visit Validity (days)</strong></TableCell>
                                    <TableCell>
                                        <TextBox
                                            size="small"
                                            value={form.re_visit_validity}
                                            onChange={(e) => fieldChangeHandler('re_visit_validity', e.target.value)}
                                        />
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell><strong>Default Revisit Text</strong></TableCell>
                                    <TableCell>
                                        <TextBox
                                            size="small"
                                            value={form.default_revisit_count}
                                            onChange={(e) => fieldChangeHandler('default_revisit_count', e.target.value)}
                                        />
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell><strong>Barcode Display</strong></TableCell>
                                    <TableCell>
                                        <RadioGroup
                                            row
                                            value={form.barcode_display}
                                            onChange={(e) => fieldChangeHandler('barcode_display', e.target.value)}
                                        >
                                            <FormControlLabel value={1} control={<Radio size="small" />} label="Yes" />
                                            <FormControlLabel value={0} control={<Radio size="small"/>} label="No" />
                                        </RadioGroup>
                                    </TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell><strong>Barcode Position</strong></TableCell>
                                    <TableCell>
                                        <RadioGroup
                                            row
                                            value={form.barcode_position}
                                            onChange={(e) => fieldChangeHandler('barcode_position', e.target.value)}
                                        >
                                            <FormControlLabel value="left" control={<Radio size="small" />} label="Left Bottom Position" />
                                            <FormControlLabel value="right" control={<Radio size="small"/>} label="Right Top Position" />
                                        </RadioGroup>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell><strong>Multi page Print?</strong></TableCell>
                                    <TableCell>
                                        <RadioGroup
                                            row
                                            value={form.multiple_page_print}
                                            onChange={(e) => fieldChangeHandler('multiple_page_print', e.target.value)}
                                        >
                                            <FormControlLabel value={1} control={<Radio size="small" />} label="Yes" />
                                            <FormControlLabel value={0} control={<Radio size="small"/>} label="No" />
                                        </RadioGroup>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell><strong>Display Visit No?</strong></TableCell>
                                    <TableCell>
                                        <RadioGroup
                                            row
                                            value={form.visit_no_display}
                                            onChange={(e) => fieldChangeHandler('visit_no_display', e.target.value)}
                                        >
                                            <FormControlLabel value={1} control={<Radio size="small" />} label="Yes" />
                                            <FormControlLabel value={0} control={<Radio size="small"/>} label="No" />
                                        </RadioGroup>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell><strong>Print Patient's Info (Name, age, date etc) ?</strong></TableCell>
                                    <TableCell>
                                        <RadioGroup
                                            row
                                            value={form.patient_info}
                                            onChange={(e) => fieldChangeHandler('patient_info', e.target.value)}
                                        >
                                            <FormControlLabel value={1} control={<Radio size="small" />} label="Yes" />
                                            <FormControlLabel value={0} control={<Radio size="small"/>} label="No" />
                                        </RadioGroup>
                                    </TableCell>
                                </TableRow>
                                {/*<TableRow>*/}
                                {/*    <TableCell><strong>Display text title "Rx." ?</strong></TableCell>*/}
                                {/*    <TableCell>*/}
                                {/*        <RadioGroup*/}
                                {/*            row*/}
                                {/*            value={form.title_display}*/}
                                {/*            onChange={(e) => fieldChangeHandler('title_display', e.target.value)}*/}
                                {/*        >*/}
                                {/*            <FormControlLabel value={1} control={<Radio size="small" />}
                                 label="Yes" />*/}
                                {/*            <FormControlLabel value={0} control={<Radio size="small"/>}
                                 label="No" />*/}
                                {/*        </RadioGroup>*/}
                                {/*    </TableCell>*/}
                                {/*</TableRow>*/}
                                <TableRow>
                                    <TableCell><strong>Display "Name" ?</strong></TableCell>
                                    <TableCell>
                                        <RadioGroup
                                            row
                                            value={form.name_display}
                                            onChange={(e) => fieldChangeHandler('name_display', e.target.value)}
                                        >
                                            <FormControlLabel value={1} control={<Radio size="small" />} label="Yes" />
                                            <FormControlLabel value={0} control={<Radio size="small"/>} label="No" />
                                        </RadioGroup>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell><strong>Display "Age" ?</strong></TableCell>
                                    <TableCell>
                                        <RadioGroup
                                            row
                                            value={form.age_display}
                                            onChange={(e) => fieldChangeHandler('age_display', e.target.value)}
                                        >
                                            <FormControlLabel value={1} control={<Radio size="small" />} label="Yes" />
                                            <FormControlLabel value={0} control={<Radio size="small"/>} label="No" />
                                        </RadioGroup>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell><strong>Display "Sex" ?</strong></TableCell>
                                    <TableCell>
                                        <RadioGroup
                                            row
                                            value={form.gender_display}
                                            onChange={(e) => fieldChangeHandler('gender_display', e.target.value)}
                                        >
                                            <FormControlLabel value={1} control={<Radio size="small" />} label="Yes" />
                                            <FormControlLabel value={0} control={<Radio size="small"/>} label="No" />
                                        </RadioGroup>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell><strong>Display "Weight" ?</strong></TableCell>
                                    <TableCell>
                                        <RadioGroup
                                            row
                                            value={form.weight_display}
                                            onChange={(e) => fieldChangeHandler('weight_display', e.target.value)}
                                        >
                                            <FormControlLabel value={1} control={<Radio size="small" />} label="Yes" />
                                            <FormControlLabel value={0} control={<Radio size="small"/>} label="No" />
                                        </RadioGroup>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell><strong>Display "Date" ?</strong></TableCell>
                                    <TableCell>
                                        <RadioGroup
                                            row
                                            value={form.date_display}
                                            onChange={(e) => fieldChangeHandler('date_display', e.target.value)}
                                        >
                                            <FormControlLabel value={1} control={<Radio size="small" />} label="Yes" />
                                            <FormControlLabel value={0} control={<Radio size="small"/>} label="No" />
                                        </RadioGroup>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell><strong>Display "Address" ?</strong></TableCell>
                                    <TableCell>
                                        <RadioGroup
                                            row
                                            value={form.address_display}
                                            onChange={(e) => fieldChangeHandler('address_display', e.target.value)}
                                        >
                                            <FormControlLabel value={1} control={<Radio size="small" />} label="Yes" />
                                            <FormControlLabel value={0} control={<Radio size="small"/>} label="No" />
                                        </RadioGroup>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell><strong>Display "Reg. No" ?</strong></TableCell>
                                    <TableCell>
                                        <RadioGroup
                                            row
                                            value={form.registration_no_display}
                                            onChange={(e) => fieldChangeHandler('registration_no_display', e.target.value)}
                                        >
                                            <FormControlLabel value={1} control={<Radio size="small" />} label="Yes" />
                                            <FormControlLabel value={0} control={<Radio size="small"/>} label="No" />
                                        </RadioGroup>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell><strong>Display "Mobile" ?</strong></TableCell>
                                    <TableCell>
                                        <RadioGroup
                                            row
                                            value={form.mobile_display}
                                            onChange={(e) => fieldChangeHandler('mobile_display', e.target.value)}
                                        >
                                            <FormControlLabel value={1} control={<Radio size="small" />} label="Yes" />
                                            <FormControlLabel value={0} control={<Radio size="small"/>} label="No" />
                                        </RadioGroup>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell><strong>Display "C/C" ?</strong></TableCell>
                                    <TableCell>
                                        <RadioGroup
                                            row
                                            value={form.cubic_centimeter_display}
                                            onChange={(e) => fieldChangeHandler('cubic_centimeter_display', e.target.value)}
                                        >
                                            <FormControlLabel value={1} control={<Radio size="small" />} label="Yes" />
                                            <FormControlLabel value={0} control={<Radio size="small"/>} label="No" />
                                        </RadioGroup>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell><strong>Display "O/E" ?</strong></TableCell>
                                    <TableCell>
                                        <RadioGroup
                                            row
                                            value={form.on_examination_display}
                                            onChange={(e) => fieldChangeHandler('on_examination_display', e.target.value)}
                                        >
                                            <FormControlLabel value={1} control={<Radio size="small" />} label="Yes" />
                                            <FormControlLabel value={0} control={<Radio size="small"/>} label="No" />
                                        </RadioGroup>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell><strong>Display "Advice" ?</strong></TableCell>
                                    <TableCell>
                                        <RadioGroup
                                            row
                                            value={form.advice_display}
                                            onChange={(e) => fieldChangeHandler('advice_display', e.target.value)}
                                        >
                                            <FormControlLabel value={1} control={<Radio size="small" />} label="Yes" />
                                            <FormControlLabel value={0} control={<Radio size="small"/>} label="No" />
                                        </RadioGroup>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell><strong>Display "D/x" ?</strong></TableCell>
                                    <TableCell>
                                        <RadioGroup
                                            row
                                            value={form.disease_display}
                                            onChange={(e) => fieldChangeHandler('disease_display', e.target.value)}
                                        >
                                            <FormControlLabel value={1} control={<Radio size="small" />} label="Yes" />
                                            <FormControlLabel value={0} control={<Radio size="small"/>} label="No" />
                                        </RadioGroup>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell><strong>Display "Footer" ?</strong></TableCell>
                                    <TableCell>
                                        <RadioGroup
                                            row
                                            value={form.footer_display}
                                            onChange={(e) => fieldChangeHandler('footer_display', e.target.value)}
                                        >
                                            <FormControlLabel value={1} control={<Radio size="small" />} label="Yes" />
                                            <FormControlLabel value={0} control={<Radio size="small"/>} label="No" />
                                        </RadioGroup>
                                    </TableCell>
                                </TableRow>
                                {/*<TableRow>*/}
                                {/*    <TableCell><strong>Past H/O Print?</strong></TableCell>*/}
                                {/*    <TableCell>*/}
                                {/*        <RadioGroup*/}
                                {/*            row*/}
                                {/*            value={form.print_past_history}*/}
                                {/*            onChange={(e) => fieldChangeHandler('print_past_history', e.target.value)}*/}
                                {/*        >*/}
                                {/*            <FormControlLabel value={1} control={<Radio size="small" />} label="Yes" />*/}
                                {/*            <FormControlLabel value={0} control={<Radio size="small"/>} label="No" />*/}
                                {/*        </RadioGroup>*/}
                                {/*    </TableCell>*/}
                                {/*</TableRow>*/}
                                {/*<TableRow>*/}
                                {/*    <TableCell><strong>Present H/O Print?</strong></TableCell>*/}
                                {/*    <TableCell>*/}
                                {/*        <RadioGroup*/}
                                {/*            row*/}
                                {/*            value={form.print_present_history}*/}
                                {/*            onChange={(e) => fieldChangeHandler('print_present_history', e.target.value)}*/}
                                {/*        >*/}
                                {/*            <FormControlLabel value={1} control={<Radio size="small" />} label="Yes" />*/}
                                {/*            <FormControlLabel value={0} control={<Radio size="small"/>} label="No" />*/}
                                {/*        </RadioGroup>*/}
                                {/*    </TableCell>*/}
                                {/*</TableRow>*/}
                                {/*<TableRow>*/}
                                {/*    <TableCell><strong>Notes Print?</strong></TableCell>*/}
                                {/*    <TableCell>*/}
                                {/*        <RadioGroup*/}
                                {/*            row*/}
                                {/*            value={form.print_notes}*/}
                                {/*            onChange={(e) => fieldChangeHandler('print_notes', e.target.value)}*/}
                                {/*        >*/}
                                {/*            <FormControlLabel value={1} control={<Radio size="small" />} label="Yes" />*/}
                                {/*            <FormControlLabel value={0} control={<Radio size="small"/>} label="No" />*/}
                                {/*        </RadioGroup>*/}
                                {/*    </TableCell>*/}
                                {/*</TableRow>*/}
                                {/*<TableRow>*/}
                                {/*    <TableCell><strong>EDD Print?</strong></TableCell>*/}
                                {/*    <TableCell>*/}
                                {/*        <RadioGroup*/}
                                {/*            row*/}
                                {/*            value={form.print_edd}*/}
                                {/*            onChange={(e) => fieldChangeHandler('print_edd', e.target.value)}*/}
                                {/*        >*/}
                                {/*            <FormControlLabel value={1} control={<Radio size="small" />} label="Yes" />*/}
                                {/*            <FormControlLabel value={0} control={<Radio size="small"/>} label="No" />*/}
                                {/*        </RadioGroup>*/}
                                {/*    </TableCell>*/}
                                {/*</TableRow>*/}

                            </TableBody>
                        </Table>
                    </TableContainer>
                    <LoadingAppButton
                        variant="contained"
                        color="primary"
                        type='submit'
                        disabled={isLoading}
                        loading={isLoading}
                        loadingIndicator="Loading…"
                    >
                        Update
                    </LoadingAppButton>
                </form>
            }
        />
    )
}
export default OptionTable
