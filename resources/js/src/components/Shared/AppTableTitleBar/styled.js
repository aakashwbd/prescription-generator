import { makeStyles } from "@mui/styles";
import Colors from "../../../constants/Colors";

export const useStyles = makeStyles((theme) => ({
    titleBox: {
        border: `1px solid ${Colors.primary.medium}`,
        overflow: "hidden",
    },
    stack: {
        [theme.breakpoints.down("sm")]: {
            flexDirection: "column !important",
            gap: "10px",
        },
    },
    title: {
        '& span': {
            fontSize: theme.typography.h2.fontSize
        },
        [theme.breakpoints.down("md")]: {
            paddingLeft: "0 !important",
        },
    },
    searchBtn: {
        backgroundColor: `${Colors.primary.light} !important`,
    },
}));
