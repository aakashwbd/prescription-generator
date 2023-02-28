import {toast} from "react-toastify";
import ApiUrls from "../apiUrls";
import Cookies from 'js-cookie'
import tokenDecoder from "../../utils/jwt";

const authSlice = (set, get) => ({
    authLoader: false,
    authValidateErrors: {},
    authData: {
        data: {}, authDialog: false, verificationType: ''
    },
    resetData: {},

    currentUser: null,
    isAuthenticate: false,
    isTokenExpire: false,
    token: null,
    lastActivityInSecond: 0,
    me: {},


    // setter
    setAuthLoader: (payload) => set((state) => ({authLoader: payload})),
    setAuthValidateErrors: (payload) => set((state) => ({authValidateErrors: payload})),
    setAuthData: (payload) => set((state) => ({authData: payload})),
    setResetData: (payload) => set((state) => ({resetData: payload})),
    setMe: (payload) => set((state)=> ({me: payload})),

    setToken: (payload) => set((state) => ({token: payload})),
    setCurrentUser: (payload) => set((state) => ({
        currentUser: payload.currentUser, isAuthenticate: payload.isAuthenticate, isTokenExpire: payload.isTokenExpire,
    })),
    setLoggedOut: () => set((state) => ({
        currentUser: null,
        isAuthenticate: false,
        isTokenExpire: false,
        token: null,
        authValidateErrors: {},
        lastActivityInSecond: 0
    })),

    // fetcher
    register: async (data, cb = () => {
    }) => {
        get().setAuthLoader(true)
        await fetch(ApiUrls.auth.register, {
            method: 'POST', headers: {
                Accept: 'application/json', 'Content-Type': 'application/json',
            }, body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(res => {
                if (res.status === 'success') {
                    toast.success(res.message);
                    get().setAuthData({
                        authDialog: true, data: res.data, verificationType: 'register'
                    })
                    get().setAuthValidateErrors({})
                    cb()
                } else if (res.status === 'validate_error') {
                    get().setAuthValidateErrors(res.data)
                } else if (res.status === 'error') {
                    toast.error(res.message)
                }
                get().setAuthLoader(false)
            })
            .catch(err => {
                console.log(err)
                get().setAuthLoader(false)
            })
    },
    loginHandler: async (data, cb = () => {
    }) => {
        get().setAuthLoader(true)
        await fetch(ApiUrls.auth.login, {
            method: 'POST', headers: {
                Accept: 'application/json', 'Content-Type': 'application/json',
            }, body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(res => {
                if (res.status === 'success') {
                    toast.success(res.message);
                    Cookies.set('authToken', res.data.token, {expires: 1})
                    const {myDecodedToken, isMyTokenExpired} = tokenDecoder(res.data.token.split(" ")[1]);
                    get().setCurrentUser({
                        currentUser: !isMyTokenExpired ? myDecodedToken : null,
                        isAuthenticate: !isMyTokenExpired,
                        isTokenExpire: isMyTokenExpired,
                    })
                    get().setToken(res.data.token)
                    get().setAuthValidateErrors({})
                    cb()
                } else if (res.status === 'validate_error') {
                    get().setAuthValidateErrors(res.data)
                } else if (res.status === 'error') {
                    toast.error(res.message)
                    if (res.data) {
                        get().setAuthData({
                            authDialog: true, data: res.data, verificationType: 'login'
                        })
                    }
                }
                get().setAuthLoader(false)
            })
            .catch(err => {
                console.log(err)
                get().setAuthLoader(false)
            })
    },
    verifyOTP: async (verificationType, url, data, cb = () => {
    }) => {
        get().setAuthLoader(true)
        await fetch(url, {
            method: 'POST', headers: {
                Accept: 'application/json', 'Content-Type': 'application/json',
            }, body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(res => {
                if (res.status === 'success') {
                    toast.success(res.message);
                    get().setAuthData({
                        data: {}, authDialog: false,
                    })
                    if (verificationType === 'register' || verificationType === 'login') {
                        const {myDecodedToken, isMyTokenExpired} = tokenDecoder(res.data.token.split(" ")[1]);
                        Cookies.set('authToken', res.data.token, {expires: 1})
                        get().setToken(res.data.token)
                        get().setCurrentUser({
                            currentUser: !isMyTokenExpired ? myDecodedToken : null,
                            isAuthenticate: !isMyTokenExpired,
                            isTokenExpire: isMyTokenExpired,
                        })
                    } else if (verificationType === 'reset') {
                        get().setResetData(res.data)
                    }
                    cb();
                } else if (res.status === 'validate_error') {
                    get().setAuthValidateErrors(res.data)
                } else if (res.status === 'error') {
                    toast.error(res.message)
                }
                get().setAuthLoader(false)
            })
            .catch(err => {
                console.log(err)
                get().setAuthLoader(false)
            })
    },
    resend: async (url, data, cb = () => {
    }) => {
        get().setAuthLoader(true)
        await fetch(url, {
            method: 'POST', headers: {
                Accept: 'application/json', 'Content-Type': 'application/json',
            }, body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(res => {
                if (res.status === 'success') {
                    toast.success(res.message);
                    cb();
                } else if (res.status === 'validate_error') {
                    get().setAuthValidateErrors(res.data)
                } else if (res.status === 'error') {
                    toast.error(res.message)
                }
                get().setAuthLoader(false)
            })
            .catch(err => {
                console.log(err)
                get().setAuthLoader(false)
            })
    },
    logout: async (cb = () => {
    }) => {
        get().setAuthLoader(true)
        let token = Cookies.get('authToken') || null
        await fetch(ApiUrls.auth.logout, {
            method: 'POST', headers: {
                Accept: 'application/json', "Authorization": token,
            },
        })
            .then(res => res.json())
            .then(res => {
                if (res.status === 'success') {
                    Cookies.remove('authToken')
                    get().setCurrentUser({
                        currentUser: null, isAuthenticate: false, isTokenExpire: false,
                    })
                    cb();
                }
                get().setAuthLoader(false)
            })
            .catch(err => {
                console.log(err)
                get().setAuthLoader(false)
            })
    },
    resetRequest: async (data, cb = () => {
    }) => {
        get().setAuthLoader(true)
        await fetch(ApiUrls.auth.reset.request, {
            method: 'POST', headers: {
                Accept: 'application/json', 'Content-Type': 'application/json',
            }, body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(res => {
                if (res.status === 'success') {
                    get().setAuthData({
                        authDialog: true, data: res.data, verificationType: 'reset'
                    })
                    toast.success(res.message);
                    cb();
                } else if (res.status === 'validate_error') {
                    get().setAuthValidateErrors(res.data)
                } else if (res.status === 'error') {
                    toast.error(res.message)
                }
                get().setAuthLoader(false)
            })
            .catch(err => {
                console.log(err)
                get().setAuthLoader(false)
            })
    },
    resetPassword: async (data, cb = () => {
    }) => {
        get().setAuthLoader(true)
        await fetch(ApiUrls.auth.reset.confirm, {
            method: 'POST', headers: {
                Accept: 'application/json', 'Content-Type': 'application/json',
            }, body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(res => {
                if (res.status === 'success') {
                    toast.success(res.message);
                    cb();
                } else if (res.status === 'validate_error') {
                    get().setAuthValidateErrors(res.data)
                } else if (res.status === 'error') {
                    toast.error(res.message)
                }
                get().setAuthLoader(false)
            })
            .catch(err => {
                console.log(err)
                get().setAuthLoader(false)
            })
    },

    changePassword: async (data, cb = () => {}) => {
        get().setAuthLoader(true)
        let token = Cookies.get('authToken') || null
        await fetch(ApiUrls.auth.change_password, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                "Authorization" : token,
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(res => {
                if(res.status === 'success'){
                    toast.success(res.message);
                    Cookies.remove('authToken')
                    get().setCurrentUser({
                        currentUser: null,
                        isAuthenticate: false,
                        isTokenExpire: false,
                    })
                    cb();
                }else if (res.status === 'validate_error'){
                    get().setAuthValidateErrors(res.data)
                }else if (res.status === 'error'){
                    toast.error(res.message)
                }
                get().setAuthLoader(false)
            })
            .catch(err => {
                console.log(err)
                get().setAuthLoader(false)
            })
    },
    // fetchMe: async (cb = () => {}) => {
    //     let token = Cookies.get('authToken') || null
    //     await fetch(ApiUrls.auth.me, {
    //         method: 'GET',
    //         headers: {
    //             Accept: 'application/json',
    //             'Content-Type': 'application/json',
    //             "Authorization": token,
    //         },
    //     })
    //         .then(res => res.json())
    //         .then(res => {
    //             if(res.status === 'success'){
    //                 get().setFetchMe(res.data)
    //                 cb();
    //             }
    //         })
    //         .catch(err => console.log(err))
    // },

})
export default authSlice
