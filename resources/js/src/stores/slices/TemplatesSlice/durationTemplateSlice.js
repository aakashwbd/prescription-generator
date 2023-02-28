import Cookies from "js-cookie";
import {toast} from "react-toastify";
import ApiUrls from "../../apiUrls";

const durationTemplateSlice = (set, get) => ({
    durationTemplates: {
        data: []
    },
    systemDurationTemplates: {
        data: []
    },
    durationTemplate: {},
    durationTemplateLoading: false,
    durationTemplatesValidateErrors: {},

    // Setter
    setDurationTemplates: (payload) => set((state) => ({ durationTemplates: payload })),
    setSystemDurationTemplates: (payload) => set((state) => ({ systemDurationTemplates: payload })),
    setDurationTemplate: (payload) => set((state) => ({ durationTemplate: payload })),
    setDurationTemplateLoading: (payload) => set((state) => ({ durationTemplateLoading: payload })),
    setDurationTemplateValidateErrors: (payload) => set((state) => ({ durationTemplatesValidateErrors: payload })),

    // Fetcher
    durationTemplateStore: async (data, cb = () => {}) => {
        let token = Cookies.get('authToken') || null
        get().setDurationTemplateLoading(true);
        await fetch(ApiUrls.templates.durations.index, {
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
                    get().setDurationTemplateValidateErrors(res.data)
                }else if (res.status === 'error'){
                    toast.error(res.message)
                }
                get().setDurationTemplateLoading(false);
            })
            .catch(err => {
                console.log(err)
                get().setDurationTemplateLoading(false);
            })
    },
    updateDurationTemplate: async (data, cb = () => {}) => {
        let token = Cookies.get('authToken') || null
        get().setDurationTemplateLoading(true);
        await fetch(ApiUrls.templates.durations.show.replace(':id', data.id), {
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
                    get().setDurationTemplateValidateErrors(res.data)
                }else if (res.status === 'error'){
                    toast.error(res.message)
                }
                get().setDurationTemplateLoading(false);
            })
            .catch(err => {
                console.log(err)
                get().setDurationTemplateLoading(false);
            })
    },
    fetchDurationTemplates: async (searchQuery = '',page = 1, offset = 15,  forQuery='all',  cb = () => {}) => {
        let token = Cookies.get('authToken') || null
        let baseUrl = ApiUrls.templates.durations.index
        let url = baseUrl + `?for=${forQuery}&page=${page}&offset=${offset}`
        if(searchQuery){
            url = baseUrl + `?search=${searchQuery}&page=${page}&offset=${offset}`
        }
        get().setDurationTemplateLoading(true);
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
                        get().setSystemDurationTemplates(res.data)
                    }else{
                        get().setDurationTemplates(res.data)
                    }

                    cb()
                }
                get().setDurationTemplateLoading(false);
            })
            .catch(err => {
                console.log(err)
                get().setDurationTemplateLoading(false);
            })
    },
    fetchDurationTemplate: async (id, cb = () => {}) => {
        let token = Cookies.get('authToken') || null
        get().setDurationTemplateLoading(true);
        await fetch(ApiUrls.templates.durations.show.replace(':id', id), {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                Authorization: token,
            }
        })
            .then(res => res.json())
            .then(res => {
                if(res.status === 'success'){
                    get().setDurationTemplate(res.data)
                    cb()
                }
                get().setDurationTemplateLoading(false);
            })
            .catch(err => {
                console.log(err)
                get().setDurationTemplateLoading(false);
            })
    },
    deleteDurationTemplate: async (id, cb = () => {}) => {
        let token = Cookies.get('authToken') || null
        get().setDurationTemplateLoading(true);
        await fetch(ApiUrls.templates.durations.show.replace(':id', id), {
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
                get().setDurationTemplateLoading(false);
            })
            .catch(err => {
                console.log(err)
                get().setDurationTemplateLoading(false);
            })
    },
})

export default durationTemplateSlice;
