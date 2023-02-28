import { Button } from "@mui/material";
import { makeStyles, withStyles } from "@mui/styles";
import Colors from "../../../../constants/Colors";

export const useStyles = makeStyles((theme) => ({
    wrapper: {
        backgroundColor: `${Colors.primary.light}`,
    },
    stackWrapper: {
        flexWrap: "wrap",
        [theme.breakpoints.down("md")]: {
            flexDirection: "column !important",
            alignItems: "flex-start !important",
        },
    },
    navLink: {
        textDecoration: "none",
        fontSize: theme.typography.body2.fontSize,
        color: theme.palette.primary.main,
        padding: "3px 8px",
        position: "relative !important",
        display: "block",
        cursor: "pointer",

        "& .dropdown": {
            display: "none",
            "& a:after": {
                display: "none",
            },
        },
        "&:hover": {
            "& .dropdown": {
                display: "block",
            },
        },
    },
    activeNavLink: {
        fontWeight: "600 !important",
        backgroundColor: theme.palette.light.main,
        borderRadius: 6,
        border: `2px solid ${Colors.primary.medium}`
    },

    dropdownMenu: {
        position: "absolute",
        top: 10,
        left: 0,
        backgroundColor: theme.palette.light.main,
        borderRadius: 8,
        width: 200,
        boxShadow: `0 0 10px 1px ${Colors.primary.light}`,
        zIndex: 9999,
    },
}));

export const LinkButton = withStyles((theme) => ({
    root: {
        textTransform: "capitalize !important",
        minWidth: "initial !important",
        fontSize: theme.typography.body2.fontSize,
        position: "relative !important",
        "&:after": {
            content: "''",
            width: 1,
            height: "40%",
            backgroundColor: theme.palette.primary.main,
            position: "absolute",
            top: "50%",
            right: 0,
            transform: "translateY(-50%)",
        },
        "&:last-child": {
            "&:after": {
                display: "none",
            },
        },
    },
}))(Button);
