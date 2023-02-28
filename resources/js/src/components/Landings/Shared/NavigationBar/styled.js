import { makeStyles } from "@mui/styles";
import Colors from "../../../../constants/Colors";

export const useStyles = makeStyles((theme) => ({
    appBar: {
        backgroundColor: `${Colors.primary.medium} !important`,
    },
    navLink: {
        backgroundColor: `${Colors.primary.regular}`,
        padding: '8px 16px',
        borderRadius: 4,
        color: theme.palette.light.main,
        textDecoration: 'none'
    },
    activeNavLink: {
        backgroundColor: `${Colors.primary.lightMedium}`,
    }
}));
