import {decodeToken, isExpired} from "react-jwt";

const tokenDecoder = (token) => {
    const myDecodedToken = decodeToken(token);
    const isMyTokenExpired = isExpired(token);

    return {myDecodedToken, isMyTokenExpired};
};

export default tokenDecoder;
