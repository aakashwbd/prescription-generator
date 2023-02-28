import React from 'react';
import {Box} from "@mui/system";
import {DropDownResultList} from "../../../../styles/globalStyles";
import {ListItem, ListItemText} from "@mui/material";
import {makeStyles} from "@mui/styles";
import useStore from "../../../../stores";

const useStyles = makeStyles(theme => ({
    resultBox: {
        position: 'absolute',
        top: '110%',
        left: 0,
        width: '100%',
        backgroundColor: theme.palette.light.main,
        border: `1px solid ${theme.palette.primary.main}`,
        zIndex: '999',
        maxHeight: 500,
        overflowY: 'auto'
    },
}))

const DrugTemplateSearch = ({setter, reset=()=>{}}) => {
    const classes = useStyles()

    /** fetcher variables **/
    const drugTempsBySearch = useStore((state) => state.drugTempsBySearch)

    /** item set in setter variable **/
    const setHandler = (item) => {
        setter(item)
        reset()
    }

    if(drugTempsBySearch?.data?.length > 0){
        return (
            <Box className={classes.resultBox}>
                <DropDownResultList>
                    {drugTempsBySearch?.data?.map((item, i) => (
                        <ListItem button key={i} onClick={() => setHandler(item)}>
                            <ListItemText>{item.name}</ListItemText>
                        </ListItem>
                    ))}
                </DropDownResultList>
            </Box>
        );
    }
};

export default DrugTemplateSearch;
