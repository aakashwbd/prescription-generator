import {
    AppBar,
    Container,
    Grid,
    Stack,
    Toolbar,
    Typography,
} from "@mui/material";
import React  from "react";
import { useStyles } from "./styled";
import {NavLink} from "react-router-dom";
import {LandingUrls} from "../../../../routes/siteUrls";

const NavigationBar = () => {
    const classes = useStyles();

    return (
        <AppBar position="sticky" className={classes.appBar} elevation={0}>
            <Toolbar>
                <Container maxWidth="xl">
                    <Grid container spacing={1} alignItems="center">
                        <Grid item xs={11} md={3} lg={4}>
                            <Typography variant="h3" color="primary">
                                Prescription App
                            </Typography>
                        </Grid>
                        <Grid item xs={1} md={9} lg={8}>
                            <Stack direction="row" spacing={1} alignItems="center" justifyContent="flex-end">
                                <NavLink className={({ isActive }) =>
                                    `${classes.navLink} ${isActive ? classes.activeNavLink : ""}`
                                } to={LandingUrls.AUTH.LOGIN}>Login</NavLink>
                                <NavLink className={({ isActive }) =>
                                    `${classes.navLink} ${isActive ? classes.activeNavLink : ""}`
                                } to={LandingUrls.AUTH.REGISTER}>Register</NavLink>
                            </Stack>
                        </Grid>
                    </Grid>
                </Container>
            </Toolbar>
        </AppBar>
    );
};

export default NavigationBar;
