import { makeStyles } from "@mui/styles";
import Colors from "../../../constants/Colors";

export const useStyles = makeStyles((theme) => ({
    wrapper: {
        borderRadius: 8,
        overflow: "hidden",
        border: `1px solid ${Colors.primary.lightMedium}`,
    },
    titleBox: {
        backgroundColor: `${Colors.primary.lightMedium}`,
    },
    label: {
        color: theme.palette.light.main,
    },
    textField: {
        "& .MuiOutlinedInput-input": {
            border: 0,
            width: 40,
            padding: "8.5px 5px !important",
        },
        "& fieldset": {
            border: "0 !important",
        },
    },
}));
