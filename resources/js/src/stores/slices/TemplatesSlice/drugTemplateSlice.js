import Cookies from "js-cookie";
import {toast} from "react-toastify";
import ApiUrls from "../../apiUrls";

const drugTemplateSlice = (set, get) => ({
    drugTemplates: {
        data: []
    },
    drugTempsBySearch: {
        data: []
    },
    systemDrugTemps: {
        data: []
    },
    drugTemplate: {},
    drugTemplateLoading: false,
    drugTemplatesValidateErrors: {},

    // Setter
    setDrugTemplates: (payload) => set((state) => ({ drugTemplates: payload })),
    setSystemDrugTemplates: (payload) => set((state) => ({ systemDrugTemps: payload })),
    setDrugTempsBySearch: (payload) => set((state) => ({ drugTempsBySearch: payload })),
    setDrugTemplate: (payload) => set((state) => ({ drugTemplate: payload })),
    setDrugTemplateLoading: (payload) => set((state) => ({ drugTemplateLoading: payload })),
    setDrugTemplateValidateErrors: (payload) => set((state) => ({ drugTemplatesValidateErrors: payload })),

    // Fetcher
    drugTemplateStore: async (data, cb = () => {}) => {
        let token = Cookies.get('authToken') || null
        get().setDrugTemplateLoading(true);
        await fetch(ApiUrls.templates.medicines_templates.index, {
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
                    get().setDrugTemplateValidateErrors(res.data)
                }else if (res.status === 'error'){
                    toast.error(res.message)
                }
                get().setDrugTemplateLoading(false);
            })
            .catch(err => {
                console.log(err)
                get().setDrugTemplateLoading(false);
            })
    },

    updateDrugTemplate: async (data, cb = () => {}) => {
        let token = Cookies.get('authToken') || null
        get().setDrugTemplateLoading(true);
        await fetch(ApiUrls.templates.medicines_templates.show.replace(':id', data.id), {
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
                    get().setDrugTemplateValidateErrors(res.data)
                }else if (res.status === 'error'){
                    toast.error(res.message)
                }
                get().setDrugTemplateLoading(false);
            })
            .catch(err => {
                console.log(err)
                get().setDrugTemplateLoading(false);
            })
    },

    fetchDrugTemplates: async (searchQuery = '', page = 1, offset = 15, forQuery = '',  cb = () => {}) => {
        let token = Cookies.get('authToken') || null
        let baseUrl = ApiUrls.templates.medicines_templates.index
        let url = baseUrl + `?for=${forQuery}&page=${page}&offset=${offset}`
        if(searchQuery){
            url = baseUrl + `?search=${searchQuery}&page=${page}&offset=${offset}`
        }
        get().setDrugTemplateLoading(true);
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
                        get().setSystemDrugTemplates(res.data)
                    }else{
                        get().setDrugTemplates(res.data)
                    }
                    cb()
                }
                get().setDrugTemplateLoading(false);
            })
            .catch(err => {
                console.log(err)
                get().setDrugTemplateLoading(false);
            })
    },
    fetchDrugTemplate: async (id, cb = () => {}) => {
        let token = Cookies.get('authToken') || null
        get().setDrugTemplateLoading(true);
        await fetch(ApiUrls.templates.medicines_templates.show.replace(':id', id), {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                Authorization: token,
            }
        })
            .then(res => res.json())
            .then(res => {
                if(res.status === 'success'){
                    get().setDrugTemplate(res.data)
                    cb()
                }
                get().setDrugTemplateLoading(false);
            })
            .catch(err => {
                console.log(err)
                get().setDrugTemplateLoading(false);
            })
    },
    deleteDrugTemplate: async (id, cb = () => {}) => {
        let token = Cookies.get('authToken') || null
        get().setDrugTemplateLoading(true);
        await fetch(ApiUrls.templates.medicines_templates.show.replace(':id', id), {
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
                get().setDrugTemplateLoading(false);
            })
            .catch(err => {
                console.log(err)
                get().setDrugTemplateLoading(false);
            })
    },
})

export default drugTemplateSlice;
