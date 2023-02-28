import Cookies from "js-cookie";
import {toast} from "react-toastify";
import ApiUrls from "../../apiUrls";

const cubicTemplateSlice = (set, get) => ({
    cubicTemplates: {
        data: []
    },
    systemCubicTemplates: {
        data: []
    },
    searchCubicTemplates: {
        data: []
    },
    cubicTemplate: {},
    cubicTemplateLoading: false,
    cubicTemplatesValidateErrors: {},

    // Setter
    setCubicTemplates: (payload) => set((state) => ({ cubicTemplates: payload })),
    setSystemCubicTemplates: (payload) => set((state) => ({ systemCubicTemplates: payload })),
    setSearchCubicTemplates: (payload) => set((state) => ({ searchCubicTemplates: payload })),
    setCubicTemplate: (payload) => set((state) => ({ cubicTemplate: payload })),
    setCubicTemplateLoading: (payload) => set((state) => ({ cubicTemplateLoading: payload })),
    setCubicTemplateValidateErrors: (payload) => set((state) => ({ cubicTemplatesValidateErrors: payload })),

    // Fetcher
    cubicTemplateStore: async (data, cb = () => {}) => {
        let token = Cookies.get('authToken') || null
        get().setCubicTemplateLoading(true);
        await fetch(ApiUrls.templates.cubic_centimeters.index, {
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
                    get().setCubicTemplateValidateErrors(res.data)
                }else if (res.status === 'error'){
                    toast.error(res.message)
                }
                get().setCubicTemplateLoading(false);
            })
            .catch(err => {
                console.log(err)
                get().setCubicTemplateLoading(false);
            })
    },
    updateCubicTemplate: async (data, cb = () => {}) => {
        let token = Cookies.get('authToken') || null
        get().setCubicTemplateLoading(true);
        await fetch(ApiUrls.templates.cubic_centimeters.show.replace(':id', data.id), {
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
                    get().setCubicTemplateValidateErrors(res.data)
                }else if (res.status === 'error'){
                    toast.error(res.message)
                }
                get().setCubicTemplateLoading(false);
            })
            .catch(err => {
                console.log(err)
                get().setCubicTemplateLoading(false);
            })
    },
    fetchCubicTemplates: async (searchQuery="", page = 1, offset = 15, forQuery = "all", cb = () => {}) => {
        get().setCubicTemplateLoading(true);
        let token = Cookies.get('authToken') || null
        let baseUrl = ApiUrls.templates.cubic_centimeters.index
        let url = baseUrl + `?for=${forQuery}&page=${page}&offset=${offset}`

        if(searchQuery){
            url = baseUrl + `?search=${searchQuery}&page=${page}&offset=${offset}`
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
                    if(forQuery === 'system'){
                        get().setSystemCubicTemplates(res.data)
                    }else{
                        get().setCubicTemplates(res.data)
                    }
                    cb()
                }
                get().setCubicTemplateLoading(false);
            })
            .catch(err => {
                console.log(err)
                get().setCubicTemplateLoading(false);
            })
    },
    fetchCubicTemplate: async (id, cb = () => {}) => {
        let token = Cookies.get('authToken') || null
        get().setCubicTemplateLoading(true);
        await fetch(ApiUrls.templates.cubic_centimeters.show.replace(':id', id), {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                Authorization: token,
            }
        })
            .then(res => res.json())
            .then(res => {
                if(res.status === 'success'){
                    get().setCubicTemplate(res.data)
                    cb()
                }
                get().setCubicTemplateLoading(false);
            })
            .catch(err => {
                console.log(err)
                get().setCubicTemplateLoading(false);
            })
    },
    deleteCubicTemplate: async (id, cb = () => {}) => {
        let token = Cookies.get('authToken') || null
        get().setCubicTemplateLoading(true);
        await fetch(ApiUrls.templates.cubic_centimeters.show.replace(':id', id), {
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
                get().setCubicTemplateLoading(false);
            })
            .catch(err => {
                console.log(err)
                get().setCubicTemplateLoading(false);
            })
    },
})

export default cubicTemplateSlice;
