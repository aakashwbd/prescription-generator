import { Stack, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useStyles } from "./styled";

const LimitTextBox = ({ label = "Page", value, onChange = () => {}, ...props }) => {
    const classes = useStyles();
    return (
        <Stack direction="row" className={classes.wrapper}>
            <Box className={classes.titleBox} p={1}>
                <Typography variant="body2" className={classes.label}>
                    {label}
                </Typography>
            </Box>
            <TextField
                variant="outlined"
                size="small"
                type="number"
                className={classes.textField}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                {...props}
            />
        </Stack>
    );
};

export default LimitTextBox;
