import React from "react";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import TextBox from "../TextBox";

const DateBox = ({size="medium",...props}) => {
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DesktopDatePicker
                inputFormat="MM/dd/yyyy"
                {...props}
                renderInput={(params) => <TextBox {...params} size={size}  />}
            />
        </LocalizationProvider>
    );
};

export default DateBox;
