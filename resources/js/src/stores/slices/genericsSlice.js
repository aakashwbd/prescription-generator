import ApiUrls from "../apiUrls";
import Cookies from "js-cookie";
import {toast} from "react-toastify";

const genericSlice = (set, get) => ({
    genericLoading: false,
    generics: {
        data: []
    },
    generic: {},
    genericValidateErrors: {},

    // Setter
    setGenerics: (payload) => set((state) => ({ generics: payload })),
    setGeneric: (payload) => set((state) => ({ generic: payload })),
    setGenericLoading: (payload) => set((state) => ({ genericLoading: payload })),
    setGenericValidateErrors: (payload) => set((state) => ({ genericValidateErrors: payload })),

    // Fetcher
    genericStore: async (data, cb = () => {}) => {
        let token = Cookies.get('authToken') || null
        get().setGenericLoading(true);
        await fetch(ApiUrls.generics.index, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                Authorization: token,
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(res => {
                if(res.status === 'success'){
                    toast.success(res.message)
                    cb()
                }else if (res.status === 'validate_error'){
                    get().setGenericValidateErrors(res.data)
                }else if (res.status === 'error'){
                    toast.error(res.message)
                }
                get().setGenericLoading(false);
            })
            .catch(err => {
                console.log(err)
                get().setGenericLoading(false);
            })
    },
    fetchGenerics: async (search = '', page = 1, offset = 15, cb = () => {}) => {
        let token = Cookies.get('authToken') || null
        get().setGenericLoading(true);
        await fetch(ApiUrls.generics.index + `?page=${page}&offset=${offset}&search=${search}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                Authorization: token,
            }
        })
            .then(res => res.json())
            .then(res => {
                if(res.status === 'success'){
                    get().setGenerics(res.data)
                    cb()
                }
                get().setGenericLoading(false);
            })
            .catch(err => {
                console.log(err)
                get().setGenericLoading(false);
            })
    },
    fetchGeneric: async (id, cb = () => {}) => {
        let token = Cookies.get('authToken') || null
        get().setGenericLoading(true);
        await fetch(ApiUrls.generics.show.replace(':id', id), {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                Authorization: token,
            }
        })
            .then(res => res.json())
            .then(res => {
                if(res.status === 'success'){
                    get().setGeneric(res.data)
                    cb()
                }
                get().setGenericLoading(false);
            })
            .catch(err => {
                console.log(err)
                get().setGenericLoading(false);
            })
    },
    deleteGeneric: async (id, cb = () => {}) => {
        let token = Cookies.get('authToken') || null
        get().setGenericLoading(true);
        await fetch(ApiUrls.generics.show.replace(':id', id), {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                Authorization: token,
            }
        })
            .then(res => res.json())
            .then(res => {
                if(res.status === 'success'){
                    toast.success(res.message)
                    cb()
                }
                get().setGenericLoading(false);
            })
            .catch(err => {
                console.log(err)
                get().setGenericLoading(false);
            })
    },
})

export default genericSlice;
