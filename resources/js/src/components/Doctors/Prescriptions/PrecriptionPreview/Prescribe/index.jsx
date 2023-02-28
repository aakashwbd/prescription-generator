import React, {useEffect, useState} from 'react';
import {List, ListItem, ListItemText, Typography} from "@mui/material";
import {Box} from "@mui/system";

const Prescribe = ({data, settings}) => {
    const [advices, setAdvices] = useState([])
    useEffect(() => {
        if(data && data.advices){
            let arr = data?.advices?.split("<br/>")
            setAdvices(arr)
        }
    }, [data]);
    return (
        <>
            <Box minHeight='300px'>
                <List>
                    {data?.medicines?.map((item, i) => (
                        <ListItem key={i}>
                            <ListItemText >
                                <Typography
                                    sx={{
                                        fontWeight: '700 !important',
                                        fontSize: settings?.font_size + 'pt !important',
                                    }}
                                >
                                    {item?.name}
                                </Typography>
                                <Typography
                                    sx={{
                                        fontWeight: '500 !important',
                                        fontSize: settings?.font_size + 'pt !important',
                                    }}
                                >
                                    {item?.dose}
                                    {item?.instruction ? ` - ${item?.instruction}` : "" }
                                    {item?.duration ? ` - ${item?.duration}` : "" }
                                </Typography>
                            </ListItemText>
                        </ListItem>
                    ))}
                </List>
            </Box>
            <Box>
                {advices && advices.length > 0 && (
                    <List>
                        {advices.map((item, i) => (
                            <ListItem key={i}>
                                <ListItemText>
                                    <div dangerouslySetInnerHTML={{__html: item}}></div>
                                </ListItemText>
                            </ListItem>
                        ))}
                    </List>
                )}
            </Box>
        </>

    );
};

export default Prescribe;
