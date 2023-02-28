import { Autocomplete, TextField } from "@mui/material";
import React from "react";
import TextBox from "../TextBox";

const AutocompleteBox = ({
    label = "",
    optionLabel = "",
    helperText = "",
    error = false,
    variant = "outlined",
    ref = null,
    autoFocus = false,
    ...props
}) => {
    return (
        <Autocomplete
            fullWidth
            {...(optionLabel && {
                getOptionLabel: (option) => option[optionLabel],
            })}
            ref={ref}
            {...props}
            renderInput={(params) => (
                <TextBox
                    {...params}
                    autoFocus={autoFocus}
                    label={label}
                    error={error}
                    helperText={helperText}
                    variant={variant}
                />
            )}
        />
    );
};

export default AutocompleteBox;
