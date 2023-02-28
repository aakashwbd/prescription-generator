import { makeStyles } from "@mui/styles";
import Colors from "../../../constants/Colors";

export const useStyles = makeStyles((theme) => ({
    card: {
        border: `1px solid ${Colors.primary.medium}`,
        borderRadius: "8px !important",
        overflow: "hidden",
        "& .MuiCardContent-root": {
            padding: "10px !important",
        },
        maxHeight: 720,
        overflowY: "auto !important",
        "&::-webkit-scrollbar": {
            width: 2,
        },
        "&::-webkit-scrollbar-thumb": {
            width: "100%",
            backgroundColor: `${Colors.primary.medium}`,
        },
        boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.11) !important'
    },
    headerBox: {
        borderRadius: "8px",
        backgroundColor: `${Colors.primary.light}`,
        position: "sticky",
        top: 0,
        zIndex: 999
    },
    footerBox: {
        backgroundColor: `${Colors.primary.light}`,
        borderTop: `1px solid ${Colors.primary.medium}`,
    },
}));
