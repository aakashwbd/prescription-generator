import {
    FormControl,
    FormHelperText,
    InputLabel,
    MenuItem,
    Select,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";

const useStyles = makeStyles((theme) => ({
    select: {
        borderRadius: "4px !important",
        color: theme.palette.primary.main + '!important',

        "& fieldset": {
            borderColor: theme.palette.primary.main,
        },
    },
    helperText: {
        color: theme.palette.danger.main + "!important",
    },
    error: {
        "& fieldset": {
            border: `1px solid ${theme.palette.danger.main} !important`,
        },
    },
}));

const SelectBox = ({
    options = [],
    error = false,
    valueType = "string",
    valueKey = "value",
    helperText = "",
    label = "",
    ...props
}) => {
    const classes = useStyles();
    function renderItem(data, type) {
        if (typeof data === "object") {
            return data[type];
        } else if (typeof data === "string") {
            return data;
        }
    }

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };

    return (
        <FormControl fullWidth>
            <InputLabel id="selectBox-label">{label}</InputLabel>
            <Select
                className={`${classes.select} ${error ? classes.error : ""}`}
                fullWidth
                label={label}
                MenuProps={MenuProps}
                {...props}
            >
                {options.map((item, i) => (
                    <MenuItem
                        key={i}
                        value={
                            valueType === "object"
                                ? item
                                : renderItem(item, valueKey)
                        }
                    >
                        {renderItem(item, "name")}
                    </MenuItem>
                ))}
            </Select>
            {error && (
                <FormHelperText className={classes.helperText}>
                    {helperText}
                </FormHelperText>
            )}
        </FormControl>
    );
};

export default SelectBox;
