import {makeStyles} from "@mui/styles";

export const useStyles = makeStyles((theme) => ({
    wrapper: {
        width: '100%',
        height: '100%',
        position: 'fixed',
        top: 0,
        left: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    }
}))
