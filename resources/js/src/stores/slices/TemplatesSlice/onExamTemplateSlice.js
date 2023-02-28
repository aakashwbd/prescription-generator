import Cookies from "js-cookie";
import {toast} from "react-toastify";
import ApiUrls from "../../apiUrls";

const onExamTemplateSlice = (set, get) => ({
    onExamTemplates: {
        data: []
    },
    systemOnExamTemplates: {
        data: []
    },
    onExamTemplate: {},
    onExamTemplateLoading: false,
    onExamTemplatesValidateErrors: {},

    // Setter
    setOnExamTemplates: (payload) => set((state) => ({ onExamTemplates: payload })),
    setSystemOnExamTemplates: (payload) => set((state) => ({ systemOnExamTemplates: payload })),
    setOnExamTemplate: (payload) => set((state) => ({ onExamTemplate: payload })),
    setOnExamTemplateLoading: (payload) => set((state) => ({ onExamTemplateLoading: payload })),
    setOnExamTemplateValidateErrors: (payload) => set((state) => ({ onExamTemplatesValidateErrors: payload })),

    // Fetcher
    onExamTemplateStore: async (data, cb = () => {}) => {
        let token = Cookies.get('authToken') || null
        get().setOnExamTemplateLoading(true);
        await fetch(ApiUrls.templates.on_exam.index, {
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
                    get().setOnExamTemplateValidateErrors(res.data)
                }else if (res.status === 'error'){
                    toast.error(res.message)
                }
                get().setOnExamTemplateLoading(false);
            })
            .catch(err => {
                console.log(err)
                get().setOnExamTemplateLoading(false);
            })
    },
    updateOnExamTemplate: async (data, cb = () => {}) => {
        let token = Cookies.get('authToken') || null
        get().setOnExamTemplateLoading(true);
        await fetch(ApiUrls.templates.on_exam.show.replace(':id', data.id), {
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
                    get().setOnExamTemplateValidateErrors(res.data)
                }else if (res.status === 'error'){
                    toast.error(res.message)
                }
                get().setOnExamTemplateLoading(false);
            })
            .catch(err => {
                console.log(err)
                get().setOnExamTemplateLoading(false);
            })
    },
    fetchOnExamTemplates: async (searchQuery = "",page = 1, offset = 15, forQuery ='all', cb = () => {}) => {
        let token = Cookies.get('authToken') || null
        let baseURl = ApiUrls.templates.on_exam.index
        let url = baseURl + `?for=${forQuery}&page=${page}&offset=${offset}`
        if(searchQuery){
            url = baseURl + `?search=${searchQuery}&page=${page}&offset=${offset}`
        }
        get().setOnExamTemplateLoading(true);
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
                        get().setSystemOnExamTemplates(res.data)
                    }else{
                        get().setOnExamTemplates(res.data)
                    }
                    cb()
                }
                get().setOnExamTemplateLoading(false);
            })
            .catch(err => {
                console.log(err)
                get().setOnExamTemplateLoading(false);
            })
    },
    fetchOnExamTemplate: async (id, cb = () => {}) => {
        let token = Cookies.get('authToken') || null
        get().setOnExamTemplateLoading(true);
        await fetch(ApiUrls.templates.on_exam.show.replace(':id', id), {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                Authorization: token,
            }
        })
            .then(res => res.json())
            .then(res => {
                if(res.status === 'success'){
                    get().setOnExamTemplate(res.data)
                    cb()
                }
                get().setOnExamTemplateLoading(false);
            })
            .catch(err => {
                console.log(err)
                get().setOnExamTemplateLoading(false);
            })
    },
    deleteOnExamTemplate: async (id, cb = () => {}) => {
        let token = Cookies.get('authToken') || null
        get().setOnExamTemplateLoading(true);
        await fetch(ApiUrls.templates.on_exam.show.replace(':id', id), {
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
                get().setOnExamTemplateLoading(false);
            })
            .catch(err => {
                console.log(err)
                get().setOnExamTemplateLoading(false);
            })
    },
})

export default onExamTemplateSlice;
