import Cookies from "js-cookie";
import {toast} from "react-toastify";
import ApiUrls from "../../apiUrls";

const investigationTemplateSlice = (set, get) => ({
    investigationTemplates: {
        data: []
    },
    systemInvestigationTemplates: {
        data: []
    },
    investigationTemplate: {},
    investigationTemplateLoading: false,
    investigationTemplatesValidateErrors: {},

    // Setter
    setInvestigationTemplates: (payload) => set((state) => ({ investigationTemplates: payload })),
    setSystemInvestigationTemplates: (payload) => set((state) => ({ systemInvestigationTemplates: payload })),
    setInvestigationTemplate: (payload) => set((state) => ({ investigationTemplate: payload })),
    setInvestigationTemplateLoading: (payload) => set((state) => ({ investigationTemplateLoading: payload })),
    setInvestigationTemplateValidateErrors: (payload) => set((state) => ({ investigationTemplatesValidateErrors: payload })),

    // Fetcher
    investigationTemplateStore: async (data, cb = () => {}) => {
        let token = Cookies.get('authToken') || null
        get().setInvestigationTemplateLoading(true);
        await fetch(ApiUrls.templates.investigations.index, {
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
                    get().setInvestigationTemplateValidateErrors(res.data)
                }else if (res.status === 'error'){
                    toast.error(res.message)
                }
                get().setInvestigationTemplateLoading(false);
            })
            .catch(err => {
                console.log(err)
                get().setInvestigationTemplateLoading(false);
            })
    },
    updateInvestigationTemplate: async (data, cb = () => {}) => {
        let token = Cookies.get('authToken') || null
        get().setInvestigationTemplateLoading(true);
        await fetch(ApiUrls.templates.investigations.show.replace(':id', data.id), {
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
                    get().setInvestigationTemplateValidateErrors(res.data)
                }else if (res.status === 'error'){
                    toast.error(res.message)
                }
                get().setInvestigationTemplateLoading(false);
            })
            .catch(err => {
                console.log(err)
                get().setInvestigationTemplateLoading(false);
            })
    },
    fetchInvestigationTemplates: async (searchQuery ="", page = 1, offset = 15, forQuery='all',  cb = () => {}) => {
        let token = Cookies.get('authToken') || null
        get().setInvestigationTemplateLoading(true);
        let baseURL = ApiUrls.templates.investigations.index
        let url = baseURL + `?for=${forQuery}&page=${page}&offset=${offset}`

        if(searchQuery) url = baseURL + `?search=${searchQuery}&page=${page}&offset=${offset}`

        await fetch(url, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                Authorization: token,
            }
        })
            .then(res => res.json())
            .then(res => {
                if(res.status === 'success'){
                    if(forQuery === 'system') {
                        get().setSystemInvestigationTemplates(res.data)
                    }else{
                        get().setInvestigationTemplates(res.data)
                    }
                    cb()
                }
                get().setInvestigationTemplateLoading(false);
            })
            .catch(err => {
                console.log(err)
                get().setInvestigationTemplateLoading(false);
            })
    },
    fetchInvestigationTemplate: async (id, cb = () => {}) => {
        let token = Cookies.get('authToken') || null
        get().setInvestigationTemplateLoading(true);
        await fetch(ApiUrls.templates.investigations.show.replace(':id', id), {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                Authorization: token,
            }
        })
            .then(res => res.json())
            .then(res => {
                if(res.status === 'success'){
                    get().setInvestigationTemplate(res.data)
                    cb()
                }
                get().setInvestigationTemplateLoading(false);
            })
            .catch(err => {
                console.log(err)
                get().setInvestigationTemplateLoading(false);
            })
    },
    deleteInvestigationTemplate: async (id, cb = () => {}) => {
        let token = Cookies.get('authToken') || null
        get().setInvestigationTemplateLoading(true);
        await fetch(ApiUrls.templates.investigations.show.replace(':id', id), {
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
                get().setInvestigationTemplateLoading(false);
            })
            .catch(err => {
                console.log(err)
                get().setInvestigationTemplateLoading(false);
            })
    },
})

export default investigationTemplateSlice;
