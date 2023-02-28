import {makeStyles, withStyles} from "@mui/styles";
import Colors from "../../../constants/Colors";
import TextBox from "../../Shared/TextBox";
import {IconButton} from "@mui/material";
import SelectBox from "../../Shared/SelectBox";

export const useStyles = makeStyles((theme) => ({
    solidBox: {
        backgroundColor: Colors.primary.light,
        boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.2)',
        borderRadius: 2
    },
    formBox: {
        border: `1px solid ${theme.palette.primary.main}`,
        borderRadius: 2,
        boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.2)',
    },
    medicineTable: {
        maxHeight: 550,
        minHeight: 550,

        '& .MuiTableBody-root': {
            '& .MuiTableRow-root:last-child': {
                borderBottom: `1px solid ${Colors.primary.light}`,
            },
        },
    },

    stacks: {
        '& .MuiTypography-root': {
            minWidth: '100px'
        }
    },

    btn: {
        color: theme.palette.primary.main + '!important'
    },

    checkGroup: {
        '& .MuiCheckbox-root': {
            padding: '4px !important',
            color: theme.palette.primary.main
        },
        '& .MuiTypography-root': {
            fontSize: '11px !important',
            color: theme.palette.primary.main

        }
    },
    selectBox: {
        '& .MuiOutlinedInput-input': {
            padding: '4px !important',
            fontSize: '12px !important',
            color: theme.palette.primary.main
        },
        '&.MuiOutlinedInput-root': {
            '& fieldset': {
                border: '0px !important',
            },
            '&:hover fieldset': {
                border: '0px !important',
            },
            '&.Mui-focused fieldset': {
                border: '0px !important',
            },
            "& .MuiFormHelperText-root": {
                border: '0px !important',
            },
        },
    }
}))


export const PrescriptionTextBox = withStyles((theme) => ({
    root: {
        '& .MuiOutlinedInput-input': {
            padding: '4px !important',
            fontSize: '12px !important',
            color: theme.palette.primary.main
        },
        '& fieldset': {
            border: '0 !important'
        },

        '&.center': {
            '& .MuiOutlinedInput-input': {
                textAlign: 'center'
            },
        }
    }
}))(TextBox)


export const PrescriptionDeleteBtn = withStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.danger.main + '!important',
        color: theme.palette.light.main + '!important',
        padding: '0px !important',
        borderRadius: '2px !important',

        '& svg': {
            fontSize: '16px !important'
        }
    }
}))(IconButton)


