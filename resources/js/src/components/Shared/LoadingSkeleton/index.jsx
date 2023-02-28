import React from "react";
import { Skeleton } from "@mui/material";

const LoadingSkeleton = () => {
    return (
        <>
            <Skeleton
                variant="text"
                animation="wave"
                sx={{ fontSize: "1.5rem" }}
            />
            <Skeleton variant="rectangular" animation="wave" height={200} />
            <Skeleton
                variant="text"
                animation="wave"
                sx={{ fontSize: "1.5rem" }}
            />
        </>
    );
};

export default LoadingSkeleton;
