import { makeStyles } from "@mui/styles";
import Colors from "../../../../constants/Colors";

export const useStyles = makeStyles((theme) => ({
    wrapper: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        [theme.breakpoints.down("md")]: {
            flexDirection: "column !important",
            alignItems: "flex-start",
            justifyContent: "flex-start",
        },
    },
    userBtn: {
        textTransform: 'capitalize !important',
        [theme.breakpoints.down("md")]: {
            width: "100% !important",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
        },
    },
    nameBox: {
        textAlign: "right",
        overflow: "hidden",
        whiteSpace: "no-wrap",
        textOverflow: "ellipse",
        [theme.breakpoints.down("md")]: {
            textAlign: "center",
        },
    },

    list: {
        padding: "0 !important",
        "& .MuiListItem-root": {
            gap: "10px",
            padding: "6px 8px !important",
            borderBottom: `1px solid ${Colors.primary.light}`,
            "&:last-child": {
                borderBottom: 0,
            },
        },
        "& .MuiListItemIcon-root": {
            minWidth: "initial",
            "&.danger": {
                color: theme.palette.danger.main,
            },
        },
        "& .MuiListItemText-root": {
            color: theme.palette.dark.main,
            "& .MuiTypography-root": {
                fontWeight: "600 !important",
            },
        },
    },
}));
