import {Box, Hidden} from "@mui/material";
import React, {useEffect} from "react";
import {Outlet, useNavigate} from "react-router-dom";
import NavigationBar from "../../components/Doctors/Shared/NavigationBar";
import TopBar from "../../components/Doctors/Shared/TopBar";
import useStore from "../../stores";
import {LandingUrls} from "../../routes/siteUrls";
import {getTokenExpireStatus} from "../../utils/helpers";


const DoctorLayout = () => {
    const navigate = useNavigate()
    const setLoggedOut = useStore((state) => state.setLoggedOut)
    const currentUser = useStore((state) => state.currentUser)
    const isTokenExpire = useStore((state) => state.isTokenExpire)
    const isAuthenticate = useStore((state) => state.isAuthenticate)

    useEffect(() => {
        if(!isAuthenticate || isTokenExpire){
            navigate(LandingUrls.AUTH.LOGIN)
        }
    }, [isAuthenticate, isTokenExpire])

    useEffect(() => {
        if(!isAuthenticate && currentUser && Object.keys(currentUser).length > 0){
            navigate(LandingUrls.AUTH.LOGIN)
        }
    }, [currentUser, isAuthenticate]);

    useEffect(() => {
        let interval;
        if (currentUser && currentUser.exp && !isTokenExpire) {
            interval = setInterval(() => {
                let expire = getTokenExpireStatus(currentUser.exp);
                if (expire) {
                    navigate(LandingUrls.AUTH.LOGIN)
                    setLoggedOut()
                }
            }, 20000);
        }
        return () => {
            clearInterval(interval)
        }
    }, [currentUser, isTokenExpire]);

    return (
        <>
            <TopBar />
            <Hidden mdDown>
                <NavigationBar />
            </Hidden>
            <Box p={2}>
                <Outlet />
            </Box>
        </>
    );
};

export default DoctorLayout;
