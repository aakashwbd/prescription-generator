import React from 'react';
import {Box} from "@mui/system";
import {List, ListItem, ListItemText, Typography} from "@mui/material";
import {makeStyles} from "@mui/styles";
import {IoTriangleOutline} from "react-icons/all";

const useStyles = makeStyles(theme => ({
    list: {
        padding: '2px !important',
        "& .MuiListItem-root": {
            padding: "0px 0px 0px 16px !important"
        }
    },
}))

const History = ({data, settings}) => {
    const classes = useStyles()
    const RenderList = ({icon="", title = "", list = [], fontSize }) => {
        return(
            <Box p={1}>
                <Typography
                    sx={{
                        fontSize: fontSize,
                        fontWeight: 700
                    }}
                >
                    {title}
                </Typography>
                <List className={classes.list}>
                    {list.map((item, i) => (
                        <ListItem key={i}>
                            <ListItemText>
                                <Typography
                                    sx={{
                                        fontSize: fontSize,
                                        fontWeight: 500
                                    }}
                                >
                                    {icon ? icon : ""} {item.name}
                                </Typography>
                            </ListItemText>
                        </ListItem>
                    ))}
                </List>
            </Box>
        )
    }
    return (
        <>
            <RenderList
                title='C/C'
                list={data?.cc}
                fontSize={settings?.font_size + 'pt !important'}
            />
            <RenderList
                title='O/E'
                list={data?.oe}
                fontSize={settings?.font_size + 'pt !important'}
            />
            <RenderList
                title='Advice'
                list={data?.ix}
                fontSize={settings?.font_size + 'pt !important'}
            />
            <RenderList
                icon={<IoTriangleOutline/>}
                title=''
                list={data?.dx}
                fontSize={settings?.font_size + 'pt !important'}
            />
            {/*<List>*/}
            {/*    {data?.dx?.map((item, i) => )}*/}
            {/*    <ListItem>*/}

            {/*    </ListItem>*/}
            {/*</List>*/}
        </>
    );
};

export default History;
