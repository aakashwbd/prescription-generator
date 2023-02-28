import Cookies from "js-cookie";
import {toast} from "react-toastify";
import ApiUrls from "../../apiUrls";

const treatmentTemplateSlice = (set, get) => ({
    treatmentTemplates: {
        data: []
    },
    systemTreatmentTemplates: {
        data: []
    },
    treatmentTemplate: {},
    treatmentTemplateLoading: false,
    treatmentTemplatesValidateErrors: {},

    // Setter
    setTreatmentTemplates: (payload) => set((state) => ({ treatmentTemplates: payload })),
    setSystemTreatmentTemplates: (payload) => set((state) => ({ systemTreatmentTemplates: payload })),
    setTreatmentTemplate: (payload) => set((state) => ({ treatmentTemplate: payload })),
    setTreatmentTemplateLoading: (payload) => set((state) => ({ treatmentTemplateLoading: payload })),
    setTreatmentTemplateValidateErrors: (payload) => set((state) => ({ treatmentTemplatesValidateErrors: payload })),

    // Fetcher
    treatmentTemplateStore: async (data, cb = () => {}) => {
        let token = Cookies.get('authToken') || null
        get().setTreatmentTemplateLoading(true);
        await fetch(ApiUrls.templates.treatments_templates.index, {
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
                    get().setTreatmentTemplateValidateErrors(res.data)
                }else if (res.status === 'error'){
                    toast.error(res.message)
                }
                get().setTreatmentTemplateLoading(false);
            })
            .catch(err => {
                console.log(err)
                get().setTreatmentTemplateLoading(false);
            })
    },

    updateTreatmentTemplate: async (data, cb = () => {}) => {
        let token = Cookies.get('authToken') || null
        get().setTreatmentTemplateLoading(true);
        await fetch(ApiUrls.templates.treatments_templates.show.replace(':id', data.id), {
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
                    get().setTreatmentTemplateValidateErrors(res.data)
                }else if (res.status === 'error'){
                    toast.error(res.message)
                }
                get().setTreatmentTemplateLoading(false);
            })
            .catch(err => {
                console.log(err)
                get().setTreatmentTemplateLoading(false);
            })
    },

    fetchTreatmentTemplates: async (searchQuery= '', page = 1, offset = 15,  forQuery="", cb = () => {}) => {
        let token = Cookies.get('authToken') || null
        let baseURL = ApiUrls.templates.treatments_templates.index
        let url = baseURL + `?for=${forQuery}&page=${page}&offset=${offset}`
        if(searchQuery){
            url = baseURL + `?search=${searchQuery}&page=${page}&offset=${offset}`
        }
        get().setTreatmentTemplateLoading(true);
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
                        get().setSystemTreatmentTemplates(res.data)
                    }else{
                        get().setTreatmentTemplates(res.data)
                    }
                    cb()
                }
                get().setTreatmentTemplateLoading(false);
            })
            .catch(err => {
                console.log(err)
                get().setTreatmentTemplateLoading(false);
            })
    },

    fetchTreatmentTemplate: async (id, cb = () => {}) => {
        let token = Cookies.get('authToken') || null
        get().setTreatmentTemplateLoading(true);
        await fetch(ApiUrls.templates.treatments_templates.show.replace(':id', id), {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                Authorization: token,
            }
        })
            .then(res => res.json())
            .then(res => {
                if(res.status === 'success'){
                    get().setTreatmentTemplate(res.data)
                    cb()
                }
                get().setTreatmentTemplateLoading(false);
            })
            .catch(err => {
                console.log(err)
                get().setTreatmentTemplateLoading(false);
            })
    },

    deleteTreatmentTemplate: async (id, cb = () => {}) => {
        let token = Cookies.get('authToken') || null
        get().setTreatmentTemplateLoading(true);
        await fetch(ApiUrls.templates.treatments_templates.show.replace(':id', id), {
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
                get().setTreatmentTemplateLoading(false);
            })
            .catch(err => {
                console.log(err)
                get().setTreatmentTemplateLoading(false);
            })
    },
})

export default treatmentTemplateSlice;
