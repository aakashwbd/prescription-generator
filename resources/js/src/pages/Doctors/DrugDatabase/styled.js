import {makeStyles} from "@mui/styles";
import Colors from "../../../constants/Colors";

export const useStyles = makeStyles((theme) => ({
    relativeBox: {
        position: 'relative'
    },
    resultBox: {
        position: 'absolute',
        top: '110%',
        left: 0,
        width: '100%',
        backgroundColor: theme.palette.light.main,
        border: `1px solid ${theme.palette.primary.main}`,
        zIndex: '999',
        maxHeight: 500,
        overflowY: 'auto'
    },
    card: {
        overflow: 'initial !important'
    }
}))
