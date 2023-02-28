import { Box, Container, Hidden } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import NavigationBar from "../../components/Landings/Shared/NavigationBar";

const LandingLayout = () => {
    return (
        <>
            <NavigationBar />
            <Container maxWidth="xl">
                <Box py={2}>
                    <Outlet />
                </Box>
            </Container>
        </>
    );
};

export default LandingLayout;
