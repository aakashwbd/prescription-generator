import React from 'react'
import {Grid, Stack, Typography} from "@mui/material";
import DateBox from "../../../Shared/DateBox";
import TextBox from "../../../Shared/TextBox";
import {Box} from "@mui/system";
import {useStyles} from "../styled";

const PrescriptionAdditionalBox = ({form, setForm, fieldChangeHandle = () => {}, debouncedHandler = () => {}}) => {
    const classes = useStyles()

    return (
        <Box className={classes.formBox} p={3} mb={2}>
            <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} lg={4}>
                    <Stack direction="row" alignItems="center" spacing={2} className={classes.stacks}>
                        <TextBox
                            size="small"
                            value={form.after_come}
                            onChange={(e) => fieldChangeHandle('after_come', e.target.value)}
                        />
                        <Typography variant="body1" color="primary">পর আসবেন।</Typography>
                    </Stack>
                </Grid>
                <Grid item xs={12} lg={4}>
                    <Stack direction="row" alignItems="center" spacing={2} className={classes.stacks}>
                        <Typography variant="body1" color="primary">তারিখ</Typography>
                        <DateBox
                            size="small"
                            value={form.date}
                            onChange={(value) => fieldChangeHandle('date', value)}
                        />
                    </Stack>
                </Grid>
                <Grid item xs={12} lg={4}>
                    <Stack direction="row" alignItems="center" spacing={2} className={classes.stacks}>
                        <Typography variant="body1" color="primary">পেমেন্ট</Typography>
                        <TextBox
                            size="small"
                            value={form.paid}
                            onChange={(e) => fieldChangeHandle('paid', e.target.value)}
                        />
                    </Stack>
                </Grid>
                <Grid item xs={12} lg={4}>
                    <Stack direction="row" alignItems="center" spacing={2} className={classes.stacks}>
                        <Typography variant="body1" color="primary">ভিজিট নং</Typography>
                        <TextBox
                            size="small"
                            value={form.visit_no}
                            onChange={(e) => fieldChangeHandle('visit_no', e.target.value)}
                        />
                    </Stack>
                </Grid>
                <Grid item xs={12} lg={4}>
                    <Stack direction="row" alignItems="center" spacing={2} className={classes.stacks}>
                        <Typography variant="body1" color="primary">লাষ্ট ভিজিট</Typography>
                        <TextBox
                            size="small"
                            value={form.last_visit}
                            onChange={(e) => fieldChangeHandle('last_visit', e.target.value)}
                        />
                    </Stack>
                </Grid>
                <Grid item xs={12} lg={4}>
                    <Stack direction="row" alignItems="center" spacing={2} className={classes.stacks}>
                        <Typography variant="body1" color="primary">রেফার্ড বাই</Typography>
                        <TextBox
                            size="small"
                            value={form.referred_by}
                            onChange={(e) => fieldChangeHandle('referred_by', e.target.value)}
                        />
                    </Stack>
                </Grid>

            </Grid>
        </Box>
    )
}

export default PrescriptionAdditionalBox
