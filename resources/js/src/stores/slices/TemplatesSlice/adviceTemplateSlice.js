import Cookies from "js-cookie";
import {toast} from "react-toastify";
import ApiUrls from "../../apiUrls";

const adviceTemplateSlice = (set, get) => ({
    adviceTemplates: {
        data: []
    },
    systemAdviceTemplates: {
        data: []
    },
    searchAdviceTemplates: {
        data: []
    },
    adviceTemplate: {},
    adviceTemplateLoading: false,
    adviceTemplatesValidateErrors: {},

    // Setter
    setAdviceTemplates: (payload) => set((state) => ({ adviceTemplates: payload })),
    setSystemAdviceTemplates: (payload) => set((state) => ({ systemAdviceTemplates: payload })),
    setSearchAdviceTemplates: (payload) => set((state) => ({ searchAdviceTemplates: payload })),
    setAdviceTemplate: (payload) => set((state) => ({ adviceTemplate: payload })),
    setAdviceTemplateLoading: (payload) => set((state) => ({ adviceTemplateLoading: payload })),
    setAdviceTemplateValidateErrors: (payload) => set((state) => ({ adviceTemplatesValidateErrors: payload })),

    // Fetcher
    adviceTemplateStore: async (data, cb = () => {}) => {
        let token = Cookies.get('authToken') || null
        get().setAdviceTemplateLoading(true);
        await fetch(ApiUrls.templates.advice_templates.index, {
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
                    get().setAdviceTemplateValidateErrors(res.data)
                }else if (res.status === 'error'){
                    toast.error(res.message)
                }
                get().setAdviceTemplateLoading(false);
            })
            .catch(err => {
                console.log(err)
                get().setAdviceTemplateLoading(false);
            })
    },

    updateAdviceTemplate: async (data, cb = () => {}) => {
        let token = Cookies.get('authToken') || null
        get().setAdviceTemplateLoading(true);
        await fetch(ApiUrls.templates.advice_templates.show.replace(':id', data.id), {
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
                    get().setAdviceTemplateValidateErrors(res.data)
                }else if (res.status === 'error'){
                    toast.error(res.message)
                }
                get().setAdviceTemplateLoading(false);
            })
            .catch(err => {
                console.log(err)
                get().setAdviceTemplateLoading(false);
            })
    },
    fetchAdviceTemplates: async (searchQuery="", page = 1, offset = 15, forQuery='all',  cb = () => {}) => {
        let token = Cookies.get('authToken') || null
        get().setAdviceTemplateLoading(true);

        let baseURL = ApiUrls.templates.advice_templates.index
        let url = baseURL  + `?for=${forQuery}&page=${page}&offset=${offset}`
        if(searchQuery){
            url = baseURL  + `?search=${searchQuery}&page=${page}&offset=${offset}`
        }

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
                    // if(forQuery === 'system'){
                    //     get().setSystemAdviceTemplates(res.data)
                    // }else if(forQuery === 'user_specific'){
                    //     get().setAdviceTemplates(res.data)
                    // }else if(searchQuery){
                    //     get().setSearchAdviceTemplates(res.data)
                    // }
                    if(forQuery === 'system'){
                        get().setSystemAdviceTemplates(res.data)
                    }else{
                        get().setAdviceTemplates(res.data)
                    }
                    cb()
                }
                get().setAdviceTemplateLoading(false);
            })
            .catch(err => {
                console.log(err)
                get().setAdviceTemplateLoading(false);
            })
    },
    fetchAdviceTemplate: async (id, cb = () => {}) => {
        let token = Cookies.get('authToken') || null
        get().setAdviceTemplateLoading(true);
        await fetch(ApiUrls.templates.advice_templates.show.replace(':id', id), {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                Authorization: token,
            }
        })
            .then(res => res.json())
            .then(res => {
                if(res.status === 'success'){
                    get().setAdviceTemplate(res.data)
                    cb()
                }
                get().setAdviceTemplateLoading(false);
            })
            .catch(err => {
                console.log(err)
                get().setAdviceTemplateLoading(false);
            })
    },

    deleteAdviceTemplate: async (id, cb = () => {}) => {
        let token = Cookies.get('authToken') || null
        get().setAdviceTemplateLoading(true);
        await fetch(ApiUrls.templates.advice_templates.show.replace(':id', id), {
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
                get().setAdviceTemplateLoading(false);
            })
            .catch(err => {
                console.log(err)
                get().setAdviceTemplateLoading(false);
            })
    },
})

export default adviceTemplateSlice;
