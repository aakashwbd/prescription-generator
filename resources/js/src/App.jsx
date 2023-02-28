import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import React, {useEffect} from "react";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RouterProvider } from "react-router-dom";
import Cookies from 'js-cookie'
import Colors from "./constants/Colors";
import routes from "./routes";
import useStore from "./stores";
import tokenDecoder from "./utils/jwt";


const App = () => {
    const setCurrentUser = useStore(state=>state.setCurrentUser)

    const theme = createTheme({
        typography: {
            fontFamily: ["Poppins"].join(","),
            h2: {
                fontSize: 24,
                fontWeight: 600,
            },
            h3: {
                fontSize: 22,
                fontWeight: 600,
            },
            h4: {
                fontSize: 20,
                fontWeight: 600,
            },
            h5: {
                fontSize: 18,
                fontWeight: 600,
            },
            h6: {
                fontSize: 16,
            },
            body1: {
                fontSize: 14,
            },
            body2: {
                fontSize: 12,
            },
        },
        palette: {
            mode: "light",
            primary: {
                main: Colors.primary.regular,
            },
            success: {
                main: Colors.success.regular,
            },
            warning: {
                main: Colors.warning.regular,
            },
            danger: {
                main: Colors.danger.regular,
            },
            dark: {
                main: Colors.dark.regular,
            },
            secondary: {
                main: Colors.danger.regular,
            },
            light: {
                main: Colors.light.regular,
            },
        },
    });

    useEffect(() => {
        let token = Cookies.get('authToken') || null;
        if(token){
            const { myDecodedToken, isMyTokenExpired } = tokenDecoder(
                token.split(" ")[1]
            );
            setCurrentUser({
                currentUser: !isMyTokenExpired ? myDecodedToken : null,
                isAuthenticate: !isMyTokenExpired,
                isTokenExpire: isMyTokenExpired,
            })
        }
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <ToastContainer/>
            <RouterProvider router={routes} />
        </ThemeProvider>
    );
};

export default App;
