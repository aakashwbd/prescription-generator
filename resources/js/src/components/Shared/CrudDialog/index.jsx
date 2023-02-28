import {Dialog, DialogContent, IconButton, Typography} from "@mui/material";
import {Box} from "@mui/system";
import React from "react";
import {useStyles} from "./styled";
import {RiCloseCircleFill} from "react-icons/all";

const CrudDialog = ({
    title = "",
    open = false,
    size = "xs",
    close = () => {},
    fullScreen=false,
    children,
}) => {
    const classes = useStyles();

    return (
        <Dialog
            fullScreen={fullScreen}
            open={open}
            maxWidth={size}
            onClose={close}
            fullWidth
            className={classes.dialog}
        >
            <Box className={classes.header} p={2}>
                <Typography variant="h6" className={classes.title}>
                    {title}
                </Typography>
                {close && (
                    <IconButton
                        onClick={close}
                        size="small"
                        className={classes.closeBtn}
                    >
                        <RiCloseCircleFill size={24} />
                    </IconButton>
                )}
            </Box>
            <DialogContent className={classes.contentBox}>
                {children}
            </DialogContent>
        </Dialog>
    );
};

export default CrudDialog;
