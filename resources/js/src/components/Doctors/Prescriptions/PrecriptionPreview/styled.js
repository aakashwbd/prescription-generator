import {makeStyles} from "@mui/styles";
import Colors from "../../../../constants/Colors";

export const useStyles = makeStyles((theme) => ({
    fullPage: {
        backgroundColor: Colors.primary.light,
        border: `1px solid ${theme.palette.dark.main}`,
        // transform: 'scale(0.7)',
        // transformOrigin: 'top left',
        // zoom: '65%'
    },
    section: {
        borderBottom: `1px solid ${theme.palette.dark.main}`,
        backgroundColor: theme.palette.light.main,
        // padding: '5px 10px !important'
    },
    leftSection: {
        borderRight: `1px solid ${theme.palette.dark.main}`,
    },


}))
