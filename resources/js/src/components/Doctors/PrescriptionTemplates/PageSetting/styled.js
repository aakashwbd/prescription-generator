import {makeStyles} from "@mui/styles";

export const useStyles = makeStyles((theme) => ({
    card: {
        maxHeight: 'initial !important'
    },
    table: {
        '& .MuiTableCell-root': {
            borderBottom: '0 !important'
        }
    }
}))
