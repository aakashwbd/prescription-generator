import ApiUrls from "../apiUrls";
import Cookies from "js-cookie";
import {toast} from "react-toastify";

const therapeuticSlice = (set, get) => ({
    therapeuticLoading: false,
    therapeutics: {
        data: []
    },
    therapeutic: {},
    therapeuticValidateErrors: {},

    // Setter
    setTherapeutics: (payload) => set((state) => ({therapeutics: payload})),
    setTherapeutic: (payload) => set((state) => ({therapeutic: payload})),
    setTherapeuticLoading: (payload) => set((state) => ({therapeuticLoading: payload})),
    setTherapeuticValidateErrors: (payload) => set((state) => ({therapeuticValidateErrors: payload})),

    // Fetcher
    therapeuticStore: async (data, cb = () => {
    }) => {
        let token = Cookies.get('authToken') || null
        get().setTherapeuticLoading(true);
        await fetch(ApiUrls.therapeutics.index, {
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
                    get().setTherapeuticValidateErrors(res.data)
                } else if (res.status === 'error') {
                    toast.error(res.message)
                }
                get().setTherapeuticLoading(false);
            })
            .catch(err => {
                console.log(err)
                get().setTherapeuticLoading(false);
            })
    },
    fetchTherapeutics: async (search = '', page = 1, offset = 15, cb = () => {
    }) => {
        let token = Cookies.get('authToken') || null
        get().setTherapeuticLoading(true);
        await fetch(ApiUrls.therapeutics.index + `?page=${page}&offset=${offset}&search=${search}`, {
            method: 'GET', headers: {
                Accept: 'application/json', Authorization: token,
            }
        })
            .then(res => res.json())
            .then(res => {
                if (res.status === 'success') {
                    get().setTherapeutics(res.data)
                    cb()
                }
                get().setTherapeuticLoading(false);
            })
            .catch(err => {
                console.log(err)
                get().setTherapeuticLoading(false);
            })
    },
    fetchTherapeutic: async (id, cb = () => {
    }) => {
        let token = Cookies.get('authToken') || null
        get().setTherapeuticLoading(true);
        await fetch(ApiUrls.therapeutics.show.replace(':id', id), {
            method: 'GET', headers: {
                Accept: 'application/json', Authorization: token,
            }
        })
            .then(res => res.json())
            .then(res => {
                if (res.status === 'success') {
                    get().setTherapeutic(res.data)
                    cb()
                }
                get().setTherapeuticLoading(false);
            })
            .catch(err => {
                console.log(err)
                get().setTherapeuticLoading(false);
            })
    },
    deleteTherapeutics: async (id, cb = () => {
    }) => {
        let token = Cookies.get('authToken') || null
        get().setTherapeuticLoading(true);
        await fetch(ApiUrls.therapeutics.show.replace(':id', id), {
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
                get().setTherapeuticLoading(false);
            })
            .catch(err => {
                console.log(err)
                get().setTherapeuticLoading(false);
            })
    },
})

export default therapeuticSlice;
