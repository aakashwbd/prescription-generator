import React, {useEffect, useState} from 'react';
import {Box} from "@mui/system";
import {DropDownResultList} from "../../../../styles/globalStyles";
import {ListItem, ListItemText} from "@mui/material";
import useStore from "../../../../stores";
import {makeStyles} from "@mui/styles";

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

const TemplateSearch = ({forQuery, setter, reset= () => {}, action = () => {}, showFor}) => {
    const classes = useStyles()

    /** fetcher variables **/
    const medicines = useStore((state) => state.medicines)
    const durationTemplates = useStore((state) => state.durationTemplates)
    const doseTemplates = useStore((state) => state.doseTemplates)
    const cubicTemplates = useStore((state) => state.cubicTemplates)
    const onExamTemplates = useStore((state) => state.onExamTemplates)
    const investigationTemplates = useStore((state) => state.investigationTemplates)
    const drugTemplates = useStore((state) => state.drugTemplates)
    const drugTemplate = useStore((state) => state.drugTemplate)
    const treatmentTemplates = useStore((state) => state.treatmentTemplates)
    const adviceTemplates = useStore((state) => state.adviceTemplates)
    const prescriptions = useStore((state) => state.prescriptions)

    /** fetcher actions **/
    const fetchDrugTemplate = useStore((state) => state.fetchDrugTemplate)
    const fetchTreatmentTemplate = useStore((state) => state.fetchTreatmentTemplate)
    const fetchAdviceTemplate = useStore((state) => state.fetchAdviceTemplate)
    const fetchPrescription = useStore((state) => state.fetchPrescription)

    if (medicines.data.length > 0 && forQuery === 'medicine') {
        const clickHandler = (field, value) => {
            action(value)
            reset()
        }
        return (
            <Box
                className={classes.resultBox}
            >
                <DropDownResultList>
                    {medicines.data.map((item, i) => (
                        <ListItem button key={i} onClick={() => clickHandler('name', item.name)}>
                            <ListItemText>{item.name}</ListItemText>
                        </ListItem>
                    ))}
                </DropDownResultList>
            </Box>
        )
    } else if (forQuery === 'duration' && durationTemplates.data.length > 0 ) {
        const clickHandler = (field, value) => {
            action(value)
            reset()
        }
        return (
            <Box
                className={classes.resultBox}
            >
                <DropDownResultList>
                    {durationTemplates.data.map((item, i) => (
                        <ListItem button key={i} onClick={() => clickHandler('duration', item.name)}>
                            <ListItemText>{item.name}</ListItemText>
                        </ListItem>))}
                </DropDownResultList>
            </Box>
        )
    } else if (doseTemplates.data.length > 0 && forQuery === 'dose' ) {
        const clickHandler = (field, value) => {
            action(value)
            reset()
        }
        return (
            <Box
                className={classes.resultBox}
            >
                <DropDownResultList>
                    {doseTemplates.data.map((item, i) => (
                        <ListItem button key={i} onClick={() => clickHandler('dose', item.name)}>
                            <ListItemText>{item.name}</ListItemText>
                        </ListItem>))}
                </DropDownResultList>
            </Box>
        )
    }else if (cubicTemplates.data.length > 0 && forQuery === 'cubic') {
        const clickHandler = (field, value) => {
            action(value)
            reset()
        }
        return (
            <Box
                className={classes.resultBox}
            >
                <DropDownResultList>
                    {cubicTemplates.data.map((item, i) => (
                        <ListItem button key={i} onClick={() => clickHandler('name', item.name)}>
                            <ListItemText>{item.name}</ListItemText>
                        </ListItem>))}
                </DropDownResultList>
            </Box>
        )
    }else if (onExamTemplates.data.length > 0 && forQuery === 'on_exam') {
        const clickHandler = (field, value) => {
            action(value)
            reset()
        }
        return (
            <Box
                className={classes.resultBox}
            >
                <DropDownResultList>
                    {onExamTemplates.data.map((item, i) => (
                        <ListItem button key={i} onClick={() => clickHandler('name', item.name)}>
                            <ListItemText>{item.name}</ListItemText>
                        </ListItem>))}
                </DropDownResultList>
            </Box>
        )
    }else if (investigationTemplates.data.length > 0 && forQuery === 'investigation') {
        const clickHandler = (field, value) => {
            action(value)
            reset()
        }
        return (
            <Box
                className={classes.resultBox}
            >
                <DropDownResultList>
                    {investigationTemplates.data.map((item, i) => (
                        <ListItem button key={i} onClick={() => clickHandler('name', item.name)}>
                            <ListItemText>{item.name}</ListItemText>
                        </ListItem>))}
                </DropDownResultList>
            </Box>
        )
    }else if (drugTemplates.data.length > 0 && forQuery === 'drug_temp') {
        const clickHandler = (item) => {
            fetchDrugTemplate(item.id)
            reset()
        }

        return (
            <Box
                className={classes.resultBox}
            >
                <DropDownResultList>
                    {drugTemplates.data.map((item, i) => (
                        <ListItem button key={i} onClick={() => clickHandler(item)}>
                            <ListItemText>{item.name}</ListItemText>
                        </ListItem>))}
                </DropDownResultList>
            </Box>
        )
    }else if (treatmentTemplates.data.length > 0 && forQuery === 'treatment_temp') {
        const clickHandler = (item) => {
            fetchTreatmentTemplate(item.id)
            reset()
        }
        return (
            <Box
                className={classes.resultBox}
            >
                <DropDownResultList>
                    {treatmentTemplates.data.map((item, i) => (
                        <ListItem button key={i} onClick={() => clickHandler(item)}>
                            <ListItemText>{item.name}</ListItemText>
                        </ListItem>))}
                </DropDownResultList>
            </Box>
        )
    }else if (adviceTemplates.data.length > 0 && forQuery === 'advice_temp') {
        const clickHandler = (item) => {
            fetchAdviceTemplate(item.id)
            reset()
        }
        return (
            <Box
                className={classes.resultBox}
            >
                <DropDownResultList>
                    {adviceTemplates.data.map((item, i) => (
                        <ListItem button key={i} onClick={() => clickHandler(item)}>
                            <ListItemText>{item.name}</ListItemText>
                        </ListItem>))}
                </DropDownResultList>
            </Box>
        )
    }else if (prescriptions.data.length > 0 && forQuery === 'prescriptions') {
        const clickHandler = (item) => {
            fetchPrescription(item.id)
            reset()
        }
        return (
            <Box
                className={classes.resultBox}
            >
                <DropDownResultList>
                    {prescriptions.data.map((item, i) => (
                        <ListItem button key={i} onClick={() => clickHandler(item)}>
                            <ListItemText>{item.name}</ListItemText>
                        </ListItem>))}
                </DropDownResultList>
            </Box>
        )
    }else {
        return null
    }
};
export default TemplateSearch
