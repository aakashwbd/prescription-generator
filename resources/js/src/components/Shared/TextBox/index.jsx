import { TextField } from "@mui/material";
import React from "react";
import { useStyles } from "./styled";

const TextBox = (props) => {
    const classes = useStyles();

    return (
        <TextField
            className={classes.textField}
            variant="outlined"
            fullWidth
            {...props}
            onFocus={(e) => e.target.select()}
        />
    );
};

export default TextBox;
