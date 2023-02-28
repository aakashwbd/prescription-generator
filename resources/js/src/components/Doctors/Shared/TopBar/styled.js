import { makeStyles } from "@mui/styles";
import Colors from "../../../../constants/Colors";

export const useStyles = makeStyles((theme) => ({
    appBar: {
        backgroundColor: `${Colors.primary.medium} !important`,
    },
    companyLogo: {
        width: "60px !important",
        height: "60px !important",
    },
    companyName: {
        color: theme.palette.primary.main,
    },

    drawer: {
        width: "250px",
        overflow: "hidden",
        "& .MuiDrawer-paper": {
            padding: "8px",
            width: "250px",
            "&::-webkit-scrollbar": {
                display: "none",
            },
        },

        "& .MuiDrawer-paperAnchorDockedLeft": {
            borderColor: theme.palette.dark.main,
        },
    },
}));
