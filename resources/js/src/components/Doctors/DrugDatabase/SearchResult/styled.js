import {makeStyles} from "@mui/styles";

export const useStyles = makeStyles((theme) => ({
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
}))
