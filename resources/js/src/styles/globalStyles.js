import {Avatar, Box, Button, Chip, List, Table, Tabs, Typography} from "@mui/material";
import { withStyles } from "@mui/styles";
import Colors from "../constants/Colors";
import {LoadingButton} from "@mui/lab";

export const FullAvatar = withStyles((theme) => ({
    root: {
        width: '100% !important',
        height: '100% !important',
        borderRadius: '4px !important',
    },
}))(Avatar);

export const FlatChip = withStyles((theme) => ({
    root: {
        "&.MuiChip-contained": {
            backgroundColor: `${Colors.primary.light}`,
            color: theme.palette.primary.main,
        },
    },
}))(Chip);

export const IconText = withStyles((theme) => ({
    root: {
        display: "flex",
        gap: "3px",
        alignItems: "center",
    },
}))(Typography);

export const AppButton = withStyles((theme) => ({
    root: {
        textTransform: "capitalize !important",
        borderRadius: "6px !important",

        "& .MuiButton-startIcon": {
            marginRight: "2px !important",
        },
    },
}))(Button);

export const LoadingAppButton = withStyles((theme) => ({
    root: {
        textTransform: "capitalize !important",
        borderRadius: "6px !important",

        "& .MuiButton-startIcon": {
            marginRight: "2px !important",
        },
    },
}))(LoadingButton);

export const PrescribeTable = withStyles((theme) => ({
    root: {
        '& .MuiTableBody-root': {
            '& .MuiTableRow-root': {
                borderBottom: `1px solid ${Colors.primary.light}`,
                '&:last-child': {
                    borderBottom: 0
                }
            },
        },

        '& .MuiTableCell-root': {
            borderBottom: '0 !important',
            lineHeight: '1.4 !important',
            padding: '6px !important',
            borderRight: `1px solid ${Colors.primary.light}`,

            '&:last-child': {
                borderRight: 0
            }
        },
        '& .MuiTableCell-head': {
            backgroundColor: `${Colors.primary.light}`,
            color: theme.palette.primary.main,
            padding: '10px 6px !important',
        },

    }
}))(Table)

export const PrescribeTabs = withStyles((theme) => ({
    root: {
        minHeight: '33px !important',

        '& .MuiTabs-flexContainer': {
            justifyContent: 'center'
        },

        '& .MuiTab-root': {
            fontSize: theme.typography.body2.fontSize,
            textTransform: 'capitalize',
            minHeight: '30px',
            padding: '8px 16px',

            '&.Mui-selected': {
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.light.main,
                borderTopLeftRadius: 8,
                borderTopRightRadius: 8
            }
        }
    }
}))(Tabs)

export const DropDownResultList = withStyles((theme) => ({
    root: {
        padding: '0 !important',
        '& .MuiListItem-root': {
            padding: '4px 8px !important',
            borderBottom: '1px solid ' + Colors.primary.lightMedium,
            '&:last-child': {
                borderBottom: 0
            }
        },
    }
}))(List)
