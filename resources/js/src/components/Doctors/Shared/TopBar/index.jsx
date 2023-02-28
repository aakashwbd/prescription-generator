import {Menu} from "@mui/icons-material";
import {
    AppBar,
    Avatar,
    Container,
    Grid,
    Hidden,
    IconButton,
    Stack,
    SwipeableDrawer,
    Toolbar,
    Typography,
} from "@mui/material";
import React, {useState} from "react";
import Images from "../../../../constants/Images";
import NavigationBar from "../NavigationBar";
import UserMenu from "../UserMenu";
import {useStyles} from "./styled";

const TopBar = () => {
    const classes = useStyles();
    const [drawerOpen, setDrawerOpen] = useState(false);

    return (
        <AppBar position="sticky" className={classes.appBar} elevation={0}>
            <Toolbar>
                <Container maxWidth="xl">
                    <Grid container spacing={1} alignItems="center">
                        <Grid item xs={11} md={3} lg={4}>
                            <Stack
                                direction="row"
                                alignItems="center"
                                spacing={1}
                            >
                                <Avatar
                                    src={Images.UserAvatar}
                                    alt="Avatar"
                                />
                                <Typography
                                    className={classes.companyName}
                                    variant="h3"
                                >
                                    Noor Doctor
                                </Typography>
                            </Stack>
                        </Grid>
                        <Grid item xs={1} md={9} lg={8}>
                            <Hidden mdDown>
                                <UserMenu />
                            </Hidden>
                            <Hidden mdUp>
                                <IconButton onClick={() => setDrawerOpen(true)}>
                                    <Menu />
                                </IconButton>
                                <SwipeableDrawer
                                    className={classes.drawer}
                                    anchor="right"
                                    open={drawerOpen}
                                    onClose={() => setDrawerOpen(false)}
                                    onOpen={() => setDrawerOpen(true)}
                                >
                                    <UserMenu />
                                    <NavigationBar />
                                </SwipeableDrawer>
                            </Hidden>
                        </Grid>
                    </Grid>
                </Container>
            </Toolbar>
        </AppBar>
    );
};

export default TopBar;
