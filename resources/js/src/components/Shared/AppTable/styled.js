import { makeStyles } from "@mui/styles";
import Colors from "../../../constants/Colors";

export const useStyles = makeStyles((theme) => ({
    emptyImage: {
        width: "30% !important",
        height: "100% !important",
        borderRadius: "0 !important",
        margin: "auto",
    },
    tableContainer: {
        "&::-webkit-scrollbar": {
            height: 5,
            // backgroundColor: `${Colors.primary.primary}`,
        },
        "&::-webkit-scrollbar-thumb": {
            height: "100%",
            backgroundColor: `${Colors.primary.medium}`,
        },
    },
    table: {
        "& .MuiTableCell-root": {
            minWidth: 110,
            '&:first-child': {
                width: 20
            }
        },

        "& .MuiTableHead-root": {
            "& .MuiTableRow-head": {
                backgroundColor: theme.palette.primary.main,
                "& .MuiTableCell-head": {
                    color: theme.palette.light.main,
                    "&:first-child": {
                        borderTopLeftRadius: 8,
                    },
                    "&:last-child": {
                        borderTopRightRadius: 8,
                    },
                },
            },
        },

        "& .MuiTableBody-root": {
            "& .MuiTableRow-root": {
                backgroundColor: theme.palette.light.main,
                borderRight: `1px solid ${Colors.primary.light}`,
                borderLeft: `1px solid ${Colors.primary.light}`,
                "&:last-child": {
                    borderBottom: `1px solid ${Colors.primary.light}`,
                },
                "&:nth-child(even)": {
                    backgroundColor: `${Colors.primary.light}`,
                },
                "& .MuiTableCell-root": {
                    border: 0,
                },
            },
        },
    },
}));
