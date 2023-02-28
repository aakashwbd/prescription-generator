import {Container, Stack} from "@mui/material";
import {Box} from "@mui/system";
import React from "react";
import {NavLink} from "react-router-dom";
import doctorNavList from "../../../../constants/doctorNavList";
import {useStyles} from "./styled";
import {RiArrowDownSFill} from "react-icons/all";

const NavigationBar = () => {
    const classes = useStyles();

    return (
        <Box className={classes.wrapper} py={1} my={1}>
            <Container maxWidth="xl">
                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="center"
                    className={classes.stackWrapper}
                    spacing={1}
                >
                    {doctorNavList.map((item, i) =>
                        item.hasOwnProperty("children") ? (
                            <Box
                                key={i}
                                variant="body2"
                                className={classes.navLink}
                            >
                                {item.name} <RiArrowDownSFill />
                                <Box className={`dropdown ${classes.dropdownMenu}`}>
                                    <Stack direction="column" spacing={1} p={1}>
                                        {item.children.map((cItem, j) => (
                                            <NavLink
                                                key={j}
                                                to={cItem.link}
                                                className={({ isActive }) =>
                                                    `${classes.navLink} ${
                                                        isActive
                                                            ? classes.activeNavLink
                                                            : ""
                                                    }`
                                                }
                                            >
                                                {cItem.name}
                                            </NavLink>
                                        ))}
                                    </Stack>
                                </Box>
                            </Box>
                        ) : (
                            <NavLink
                                key={i}
                                to={item.link}
                                className={({ isActive }) =>
                                    `${classes.navLink} ${isActive ? classes.activeNavLink : ""}`
                                }
                            >
                                {item.name}
                            </NavLink>
                        )
                    )}
                </Stack>
            </Container>
        </Box>
    );
};

export default NavigationBar;
