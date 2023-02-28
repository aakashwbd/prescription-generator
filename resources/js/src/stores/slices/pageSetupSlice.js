import Cookies from "js-cookie";
import {toast} from "react-toastify";
import ApiUrls from "../apiUrls";

const pageSetupSlice = (set, get) => ({
    pageSetups: {
        data: []
    },
    pageSetup: {},
    pageSetupLoading: false,
    pageSetupValidateErrors: {},

    // Setter
    setPageSetups: (payload) => set((state) => ({ pageSetups: payload })),
    setPageSetup: (payload) => set((state) => ({ pageSetup: payload })),
    setPageSetupLoading: (payload) => set((state) => ({ pageSetupLoading: payload })),
    setPageSetupValidateErrors: (payload) => set((state) => ({ pageSetupValidateErrors: payload })),

    // Fetcher
    pageSetupStore: async (data, cb = () => {}) => {
        let token = Cookies.get('authToken') || null
        get().setPageSetupLoading(true);
        await fetch(ApiUrls.page_setup.index, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
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
                    get().setPageSetupValidateErrors(res.data)
                }else if (res.status === 'error'){
                    toast.error(res.message)
                }
                get().setPageSetupLoading(false);
            })
            .catch(err => {
                console.log(err)
                get().setPageSetupLoading(false);
            })
    },
    updatePageSetup: async (data, cb = () => {}) => {
        let token = Cookies.get('authToken') || null
        get().setPageSetupLoading(true);
        await fetch(ApiUrls.page_setup.show.replace(':id', data.id), {
            method: 'PATCH',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
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
                    get().setPageSetupValidateErrors(res.data)
                }else if (res.status === 'error'){
                    toast.error(res.message)
                }
                get().setPageSetupLoading(false);
            })
            .catch(err => {
                console.log(err)
                get().setPageSetupLoading(false);
            })
    },
    fetchPageSetups: async (page = 1, offset = 15,  cb = () => {}) => {
        let token = Cookies.get('authToken') || null
        get().setPageSetupLoading(true);

        await fetch(ApiUrls.page_setup.index + `?page=${page}&offset=${offset}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                Authorization: token,
            }
        })
            .then(res => res.json())
            .then(res => {
                if(res.status === 'success'){
                    get().setPageSetups(res.data)
                    cb()
                }
                get().setPageSetupLoading(false);
            })
            .catch(err => {
                console.log(err)
                get().setPageSetupLoading(false);
            })
    },
    fetchPageSetup: async (id, cb = () => {}) => {
        let token = Cookies.get('authToken') || null
        get().setPageSetupLoading(true);
        await fetch(ApiUrls.page_setup.show.replace(':id', id), {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                Authorization: token,
            }
        })
            .then(res => res.json())
            .then(res => {
                if(res.status === 'success'){
                    get().setPageSetup(res.data)
                    cb()
                }
                get().setPageSetupLoading(false);
            })
            .catch(err => {
                console.log(err)
                get().setPageSetupLoading(false);
            })
    },
    deletePageSetup: async (id, cb = () => {}) => {
        let token = Cookies.get('authToken') || null
        get().setPageSetupLoading(true);
        await fetch(ApiUrls.page_setup.show.replace(':id', id), {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: token,
            }
        })
            .then(res => res.json())
            .then(res => {
                if(res.status === 'success'){
                    toast.success(res.message)
                    cb()
                }
                get().setPageSetupLoading(false);
            })
            .catch(err => {
                console.log(err)
                get().setPageSetupLoading(false);
            })
    },
})

export default pageSetupSlice;
