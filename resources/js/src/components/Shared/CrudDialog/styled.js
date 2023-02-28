import { makeStyles } from "@mui/styles";
import Colors from "../../../constants/Colors";

export const useStyles = makeStyles((theme) => ({
    dialog: {
        borderRadius: 8,
    },
    header: {
        backgroundColor: `${Colors.primary.light}`,
        boxSizing: "border-box",
        position: "relative",
        border: `1px solid ${theme.palette.primary.main}`,
        borderRadius: 4
    },
    title: {
        fontWeight: "600 !important",
        display: "flex",
        alignItems: "center",
        color: theme.palette.primary.main + "!important",
        "& .MuiSvgIcon-root": {
            marginRight: 10,
        },
    },
    closeBtn: {
        color: theme.palette.dark.main + "!important",
        position: "absolute !important",
        top: "50%",
        right: 10,
        transform: "translateY(-50%)",
    },
    contentBox: {
        // backgroundColor: theme.palette.dark.main,
        padding: "20px 25px !important",

        "&::-webkit-scrollbar": {
            backgroundColor: "transparent",
            width: 5,
        },
        "&::-webkit-scrollbar-thumb": {
            backgroundColor: theme.palette.primary.main,
            borderRadius: 3,
        },
    },
}));
