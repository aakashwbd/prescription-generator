import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import React, { useState } from "react";

const SecretTextBox = (props) => {
    const [show, setShow] = useState(false);

    const typeToggleHandler = () => {
        setShow(!show);
    };

    return (
        <TextField
            {...props}
            type={show ? "text" : "password"}
            variant="outlined"
            fullWidth
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton onClick={typeToggleHandler} tabIndex={-1}>
                            {show ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                ),
            }}
        />
    );
};

export default SecretTextBox;
