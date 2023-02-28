import ApiUrls from "../apiUrls";
import Cookies from "js-cookie";
import {toast} from "react-toastify";

const indicationSlice = (set, get) => ({
    indicationLoading: false,
    indications: {
        data: []
    },
    indication: {},
    indicationValidateErrors: {},

    // Setter
    setIndications: (payload) => set((state) => ({indications: payload})),
    setIndication: (payload) => set((state) => ({indication: payload})),
    setIndicationLoading: (payload) => set((state) => ({indicationLoading: payload})),
    setIndicationValidateErrors: (payload) => set((state) => ({indicationValidateErrors: payload})),

    // Fetcher
    indicationStore: async (data, cb = () => {
    }) => {
        let token = Cookies.get('authToken') || null
        get().setIndicationLoading(true);
        await fetch(ApiUrls.indications.index, {
            method: 'POST', headers: {
                Accept: 'application/json', Authorization: token,
            }, body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(res => {
                if (res.status === 'success') {
                    toast.success(res.message)
                    cb()
                } else if (res.status === 'validate_error') {
                    get().setIndicationValidateErrors(res.data)
                } else if (res.status === 'error') {
                    toast.error(res.message)
                }
                get().setIndicationLoading(false);
            })
            .catch(err => {
                console.log(err)
                get().setIndicationLoading(false);
            })
    },
    fetchIndications: async (search = '', page = 1, offset = 15, cb = () => {
    }) => {
        let token = Cookies.get('authToken') || null
        get().setIndicationLoading(true);
        await fetch(ApiUrls.indications.index + `?page=${page}&offset=${offset}&search=${search}`, {
            method: 'GET', headers: {
                Accept: 'application/json', Authorization: token,
            }
        })
            .then(res => res.json())
            .then(res => {
                if (res.status === 'success') {
                    get().setIndications(res.data)
                    cb()
                }
                get().setIndicationLoading(false);
            })
            .catch(err => {
                console.log(err)
                get().setIndicationLoading(false);
            })
    },
    fetchIndication: async (id, cb = () => {
    }) => {
        let token = Cookies.get('authToken') || null
        get().setIndicationLoading(true);
        await fetch(ApiUrls.indications.show.replace(':id', id), {
            method: 'GET', headers: {
                Accept: 'application/json', Authorization: token,
            }
        })
            .then(res => res.json())
            .then(res => {
                if (res.status === 'success') {
                    get().setIndication(res.data)
                    cb()
                }
                get().setIndicationLoading(false);
            })
            .catch(err => {
                console.log(err)
                get().setIndicationLoading(false);
            })
    },
    deleteIndication: async (id, cb = () => {
    }) => {
        let token = Cookies.get('authToken') || null
        get().setIndicationLoading(true);
        await fetch(ApiUrls.indications.show.replace(':id', id), {
            method: 'DELETE', headers: {
                Accept: 'application/json', Authorization: token,
            }
        })
            .then(res => res.json())
            .then(res => {
                if (res.status === 'success') {
                    toast.success(res.message)
                    cb()
                }
                get().setIndicationLoading(false);
            })
            .catch(err => {
                console.log(err)
                get().setIndicationLoading(false);
            })
    },
})

export default indicationSlice;
