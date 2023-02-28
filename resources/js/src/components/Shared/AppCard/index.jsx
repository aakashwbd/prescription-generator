import { Card, CardContent } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useStyles } from "./styled";

const AppCard = ({ content, header, footer, className, contentClass }) => {
    const classes = useStyles();

    return (
        <Card
            className={`${classes.card} ${className ? className : ""}`}
            elevation={0}
        >
            {header && (
                <Box className={classes.headerBox} p={2}>
                    {header}
                </Box>
            )}

            <CardContent className={contentClass}>{content}</CardContent>

            {footer && (
                <Box className={classes.footerBox} p={1}>
                    {footer}
                </Box>
            )}
        </Card>
    );
};

export default AppCard;
