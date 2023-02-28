import { makeStyles } from "@mui/styles";
import Colors from "../../../constants/Colors";

export const useStyles = makeStyles((theme) => ({
    ul: {
        "& .MuiPaginationItem-root": {
            backgroundColor: `${Colors.primary.light} !important`,

            "&.Mui-selected": {
                backgroundColor: `${Colors.primary.lightMedium} !important`,
            },
        },
    },

    pageWrapper: {
        justifyContent: "flex-start",
        [theme.breakpoints.down("md")]: {
            justifyContent: "center",
        },
    },
    paginateWrapper: {
        justifyContent: "flex-end",
        [theme.breakpoints.down("md")]: {
            justifyContent: "center",
        },

        "@media(max-width: 485px)": {
            flexDirection: "column !important",
            gap: "10px",
        },
    },
}));
