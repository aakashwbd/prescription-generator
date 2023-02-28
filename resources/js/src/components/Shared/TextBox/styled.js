import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme) => ({
    textField: {
        "& .MuiOutlinedInput-root": {
            borderRadius: "4px !important",
            color: theme.palette.primary.main
        },
        '& fieldset': {
            borderColor: theme.palette.primary.main
        },
        '& .MuiInputAdornment-root': {
            color: theme.palette.primary.main
        },
        '& .MuiOutlinedInput-input': {
            '&::placeholder': {
                color: theme.palette.primary.main
            }
        },
    },
}));
