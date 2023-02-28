import React from 'react'
import {DropDownResultList} from "../../../../styles/globalStyles";
import {ListItem, ListItemText} from "@mui/material";
import useStore from "../../../../stores";
import {useStyles} from "./styled";
import {Box} from "@mui/system";

const SearchResult = ({reset = () => {}}) => {
    const classes = useStyles()

    const medicines = useStore((state) => state.medicines)
    const generics = useStore((state) => state.generics)
    const indications = useStore((state) => state.indications)
    const therapeutics = useStore((state) => state.therapeutics)
    const doseTemplates = useStore((state) => state.doseTemplates)

    const fetchMedicine = useStore((state) => state.fetchMedicine)
    const fetchGeneric = useStore((state) => state.fetchGeneric)
    const fetchIndication = useStore((state) => state.fetchIndication)
    const fetchTherapeutic = useStore((state) => state.fetchTherapeutic)


    if (medicines.data.length > 0) {
        return (
            <Box
                className={classes.resultBox}
            >
                <DropDownResultList>
                    {medicines.data.map((item, i) => (
                        <ListItem button key={i} onClick={() => fetchMedicine(item.id, () => {
                            reset()
                        })}>
                            <ListItemText>{item.name}</ListItemText>
                        </ListItem>))}
                </DropDownResultList>
            </Box>
        )
    } else if (generics.data.length > 0) {
        return (<Box className={classes.resultBox}>
                <DropDownResultList>
                    {generics.data.map((item, i) => (
                        <ListItem button key={i} onClick={() => fetchGeneric(item.id, () => {
                            reset()
                        })}>
                            <ListItemText>{item.name}</ListItemText>
                        </ListItem>))}
                </DropDownResultList>
            </Box>)
    } else if (indications.data.length > 0) {
        return (<Box className={classes.resultBox}>
                <DropDownResultList>
                    {indications.data.map((item, i) => (
                        <ListItem button key={i} onClick={() => fetchIndication(item.id, () => {
                            reset()
                        })}>
                            <ListItemText>{item.name}</ListItemText>
                        </ListItem>))}
                </DropDownResultList>
            </Box>)
    } else if (therapeutics.data.length > 0) {
        return (<Box className={classes.resultBox}>
                <DropDownResultList>
                    {therapeutics.data.map((item, i) => (
                        <ListItem button key={i} onClick={() => fetchTherapeutic(item.id, () => {
                            reset()
                        })}>
                            <ListItemText>{item.name}</ListItemText>
                        </ListItem>))}
                </DropDownResultList>
            </Box>)
    }  else {
        return null
    }
}

export default SearchResult
