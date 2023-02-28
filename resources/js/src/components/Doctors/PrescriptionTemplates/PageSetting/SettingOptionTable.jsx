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
import AppCard from "../../../Shared/AppCard";
import {useStyles} from "./styled";
import {LoadingAppButton} from "../../../../styles/globalStyles";

const SettingOptionTable = ({form={}, fieldChangeHandler = () => {}, submitHandler= () => {}, isLoading = false}) => {
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
                                    <TableCell><strong>Drug Template</strong></TableCell>
                                    <TableCell>
                                        <RadioGroup
                                            row
                                            value={form.templates.medicine}
                                            onChange={(e) => fieldChangeHandler('templates', 'medicine', e.target.value)}
                                        >
                                            <FormControlLabel value="public" control={<Radio size="small" />} label="Public" />
                                            <FormControlLabel value="system+private" control={<Radio size="small"/>} label="SYS+Private" />
                                            <FormControlLabel value="private" control={<Radio size="small"/>} label="Private" />
                                        </RadioGroup>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell><strong>Treatment Template</strong></TableCell>
                                    <TableCell>
                                        <RadioGroup
                                            row
                                            value={form.templates.treatment}
                                            onChange={(e) => fieldChangeHandler('templates', 'treatment', e.target.value)}
                                        >
                                            <FormControlLabel value="public" control={<Radio size="small" />} label="Public" />
                                            <FormControlLabel value="system+private" control={<Radio size="small"/>} label="SYS+Private" />
                                            <FormControlLabel value="private" control={<Radio size="small"/>} label="Private" />
                                        </RadioGroup>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell><strong>Advice Template</strong></TableCell>
                                    <TableCell>
                                        <RadioGroup
                                            row
                                            value={form.templates.advice}
                                            onChange={(e) => fieldChangeHandler('templates', 'advice', e.target.value)}
                                        >
                                            <FormControlLabel value="public" control={<Radio size="small" />} label="Public" />
                                            <FormControlLabel value="system+private" control={<Radio size="small"/>} label="SYS+Private" />
                                            <FormControlLabel value="private" control={<Radio size="small"/>} label="Private" />
                                        </RadioGroup>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell><strong>C/C Template</strong></TableCell>
                                    <TableCell>
                                        <RadioGroup
                                            row
                                            value={form.templates.cubic_centimeter}
                                            onChange={(e) => fieldChangeHandler('templates', 'cubic_centimeter', e.target.value)}
                                        >
                                            <FormControlLabel value="public" control={<Radio size="small" />} label="Public" />
                                            <FormControlLabel value="system+private" control={<Radio size="small"/>} label="SYS+Private" />
                                            <FormControlLabel value="private" control={<Radio size="small"/>} label="Private" />
                                        </RadioGroup>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell><strong>O/E Template</strong></TableCell>
                                    <TableCell>
                                        <RadioGroup
                                            row
                                            value={form.templates.on_examination}
                                            onChange={(e) => fieldChangeHandler('templates', 'on_examination', e.target.value)}
                                        >
                                            <FormControlLabel value="public" control={<Radio size="small" />} label="Public" />
                                            <FormControlLabel value="system+private" control={<Radio size="small"/>} label="SYS+Private" />
                                            <FormControlLabel value="private" control={<Radio size="small"/>} label="Private" />
                                        </RadioGroup>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell><strong>Duration Template</strong></TableCell>
                                    <TableCell>
                                        <RadioGroup
                                            row
                                            value={form.templates.duration}
                                            onChange={(e) => fieldChangeHandler('templates', 'duration', e.target.value)}

                                        >
                                            <FormControlLabel value="public" control={<Radio size="small" />} label="Public" />
                                            <FormControlLabel value="system+private" control={<Radio size="small"/>} label="SYS+Private" />
                                            <FormControlLabel value="private" control={<Radio size="small"/>} label="Private" />
                                        </RadioGroup>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell><strong>Dose Template</strong></TableCell>
                                    <TableCell>
                                        <RadioGroup
                                            row
                                            value={form.templates.dose}
                                            onChange={(e) => fieldChangeHandler('templates', 'dose', e.target.value)}

                                        >
                                            <FormControlLabel value="public" control={<Radio size="small" />} label="Public" />
                                            <FormControlLabel value="system+private" control={<Radio size="small"/>} label="SYS+Private" />
                                            <FormControlLabel value="private" control={<Radio size="small"/>} label="Private" />
                                        </RadioGroup>
                                    </TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell><strong>I/X Template</strong></TableCell>
                                    <TableCell>
                                        <RadioGroup
                                            row
                                            value={form.templates.investigation}
                                            onChange={(e) => fieldChangeHandler('templates', 'investigation', e.target.value)}

                                        >
                                            <FormControlLabel value="public" control={<Radio size="small" />} label="Public" />
                                            <FormControlLabel value="system+private" control={<Radio size="small"/>} label="SYS+Private" />
                                            <FormControlLabel value="private" control={<Radio size="small"/>} label="Private" />
                                        </RadioGroup>
                                    </TableCell>
                                </TableRow>

                            </TableBody>
                        </Table>
                    </TableContainer>
                    <LoadingAppButton
                        variant='contained'
                        type='submit'
                        disabled={isLoading}
                        loading={isLoading}
                        loadingIndicator="Loading…"
                    >
                        {form.id ? "Update" : "Save"}
                    </LoadingAppButton>
                </form>
            }
        />
    )
}

export default SettingOptionTable
