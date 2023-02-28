import React from 'react';
import {Box} from "@mui/system";
import {makeStyles} from "@mui/styles";

const useStyles = makeStyles(theme => ({
    section: {
        borderBottom: `1px solid ${theme.palette.dark.main}`,
        backgroundColor: theme.palette.light.main,
        // padding: '5px 10px !important'
    },
}))

const Footer = ({data}) => {
    const classes = useStyles()
    return (
        <Box
            textAlign='center'
            className={classes.section}
            sx={{
                width: data?.footer_size?.width + 'cm',
                height: data?.footer_size?.height + 'cm',
                backgroundColor: data?.header_bg_color,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            <div dangerouslySetInnerHTML={{__html: data?.footer_content}}></div>
        </Box>
    );
};

export default Footer;
