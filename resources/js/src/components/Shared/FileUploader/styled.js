import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme) => ({
    avatarBox: {
        position: "relative !important",
    },
    avatar: {
        width: "100% !important",
        height: "100% !important",
        borderRadius: "5px !important",
        maxHeight: 130,

        "& .MuiAvatar-img": {
            objectFit: "contain",
        },
    },
    actionBtn: {
        backgroundColor: theme.palette.light.main + "!important",
        color: theme.palette.dark.main + "!important",
        width: "24px !important",
        height: "24px !important",
        position: "absolute !important",
        top: 12,
        right: 5,
    },
}));
