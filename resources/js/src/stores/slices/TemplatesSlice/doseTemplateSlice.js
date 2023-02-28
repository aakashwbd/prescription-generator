import Cookies from "js-cookie";
import {toast} from "react-toastify";
import ApiUrls from "../../apiUrls";

const doseTemplateSlice = (set, get) => ({
    doseTemplates: {
        data: []
    },
    systemDoseTemplates: {
        data: []
    },
    doseTemplate: {},
    doseTemplateLoading: false,
    doseTemplatesValidateErrors: {},

    // Setter
    setDoseTemplates: (payload) => set((state) => ({ doseTemplates: payload })),
    setSystemDoseTemplates: (payload) => set((state) => ({ systemDoseTemplates: payload })),
    setDoseTemplate: (payload) => set((state) => ({ doseTemplate: payload })),
    setDoseTemplateLoading: (payload) => set((state) => ({ doseTemplateLoading: payload })),
    setDoseTemplateValidateErrors: (payload) => set((state) => ({ doseTemplatesValidateErrors: payload })),

    // Fetcher
    doseTemplateStore: async (data, cb = () => {}) => {
        let token = Cookies.get('authToken') || null
        get().setDoseTemplateLoading(true);
        await fetch(ApiUrls.templates.doses.index, {
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
                    get().setDoseTemplateValidateErrors(res.data)
                }else if (res.status === 'error'){
                    toast.error(res.message)
                }
                get().setDoseTemplateLoading(false);
            })
            .catch(err => {
                console.log(err)
                get().setDoseTemplateLoading(false);
            })
    },
    updateDoseTemplate: async (data, cb = () => {}) => {
        let token = Cookies.get('authToken') || null
        get().setDoseTemplateLoading(true);
        await fetch(ApiUrls.templates.doses.show.replace(':id', data.id), {
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
                    get().setDoseTemplateValidateErrors(res.data)
                }else if (res.status === 'error'){
                    toast.error(res.message)
                }
                get().setDoseTemplateLoading(false);
            })
            .catch(err => {
                console.log(err)
                get().setDoseTemplateLoading(false);
            })
    },
    fetchDoseTemplates: async (searchQuery = "", page = 1, offset = 15, forQuery='all', cb = () => {}) => {
        let token = Cookies.get('authToken') || null
        let baseUrl = ApiUrls.templates.doses.index
        let url = baseUrl + `?for=${forQuery}&page=${page}&offset=${offset}`

        if(searchQuery){
            url = baseUrl + `?search=${searchQuery}&page=${page}&offset=${offset}`
        }
        get().setDoseTemplateLoading(true);
        await fetch( url, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                Authorization: token,
            }
        })
            .then(res => res.json())
            .then(res => {
                if(res.status === 'success'){
                    if(forQuery === 'system'){
                        get().setSystemDoseTemplates(res.data)
                    }else{
                        get().setDoseTemplates(res.data)
                    }
                    cb()
                }
                get().setDoseTemplateLoading(false);
            })
            .catch(err => {
                console.log(err)
                get().setDoseTemplateLoading(false);
            })
    },
    fetchDoseTemplate: async (id, cb = () => {}) => {
        let token = Cookies.get('authToken') || null
        get().setDoseTemplateLoading(true);
        await fetch(ApiUrls.templates.doses.show.replace(':id', id), {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                Authorization: token,
            }
        })
            .then(res => res.json())
            .then(res => {
                if(res.status === 'success'){
                    get().setDoseTemplate(res.data)
                    cb()
                }
                get().setDoseTemplateLoading(false);
            })
            .catch(err => {
                console.log(err)
                get().setDoseTemplateLoading(false);
            })
    },
    deleteDoseTemplate: async (id, cb = () => {}) => {
        let token = Cookies.get('authToken') || null
        get().setDoseTemplateLoading(true);
        await fetch(ApiUrls.templates.doses.show.replace(':id', id), {
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
                get().setDoseTemplateLoading(false);
            })
            .catch(err => {
                console.log(err)
                get().setDoseTemplateLoading(false);
            })
    },
})

export default doseTemplateSlice;
