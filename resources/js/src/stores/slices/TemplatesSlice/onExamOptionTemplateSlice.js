import Cookies from "js-cookie";
import {toast} from "react-toastify";
import ApiUrls from "../../apiUrls";

const onExamOptionTemplateSlice = (set, get) => ({
    onExamOptTemps: {
        data: []
    },
    onExamOptTemp: {},
    onExamOptTempLoading: false,
    onExamOptTempValidateErrors: {},

    // Setter
    setOnExamOptTemps: (payload) => set((state) => ({ onExamOptTemps: payload })),
    setOnExamOptTemp: (payload) => set((state) => ({ onExamOptTemp: payload })),
    setOnExamOptTempLoading: (payload) => set((state) => ({ onExamOptTempLoading: payload })),
    setOnExamOptTempValidateErrors: (payload) => set((state) => ({ onExamOptTempValidateErrors: payload })),

    // Fetcher
    onExamOptTempStore: async (data, cb = () => {}) => {
        let token = Cookies.get('authToken') || null
        get().setOnExamOptTempLoading(true);
        await fetch(ApiUrls.templates.on_exam_options.index, {
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
                    get().setOnExamOptTempValidateErrors(res.data)
                }else if (res.status === 'error'){
                    toast.error(res.message)
                }
                get().setOnExamOptTempLoading(false);
            })
            .catch(err => {
                console.log(err)
                get().setOnExamOptTempLoading(false);
            })
    },
    updateOnExamOptTemp: async (data, cb = () => {}) => {
        let token = Cookies.get('authToken') || null
        get().setOnExamOptTempLoading(true);
        await fetch(ApiUrls.templates.on_exam_options.show.replace(':id', data.id), {
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
                    get().setOnExamOptTempValidateErrors(res.data)
                }else if (res.status === 'error'){
                    toast.error(res.message)
                }
                get().setOnExamOptTempLoading(false);
            })
            .catch(err => {
                console.log(err)
                get().setOnExamOptTempLoading(false);
            })
    },
    fetchOnExamOptTemps: async (page = 1, offset = 15, forQuery='all', cb = () => {}) => {
        let token = Cookies.get('authToken') || null
        let baseUrl = ApiUrls.templates.on_exam_options.index
        let url = baseUrl + `?for=${forQuery}&page=${page}&offset=${offset}`

        get().setOnExamOptTempLoading(true);
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

                    }else{
                        get().setOnExamOptTemps(res.data)
                    }
                    cb()
                }
                get().setOnExamOptTempLoading(false);
            })
            .catch(err => {
                console.log(err)
                get().setOnExamOptTempLoading(false);
            })
    },
    fetchOnExamOptTemp: async (id, cb = () => {}) => {
        let token = Cookies.get('authToken') || null
        get().setOnExamOptTempLoading(true);
        await fetch(ApiUrls.templates.on_exam_options.show.replace(':id', id), {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                Authorization: token,
            }
        })
            .then(res => res.json())
            .then(res => {
                if(res.status === 'success'){
                    get().setOnExamOptTemp(res.data)
                    cb()
                }
                get().setOnExamOptTempLoading(false);
            })
            .catch(err => {
                console.log(err)
                get().setOnExamOptTempLoading(false);
            })
    },
    deleteOnExamOptTemp: async (id, cb = () => {}) => {
        let token = Cookies.get('authToken') || null
        get().setOnExamOptTempLoading(true);
        await fetch(ApiUrls.templates.on_exam_options.show.replace(':id', id), {
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
                get().setOnExamOptTempLoading(false);
            })
            .catch(err => {
                console.log(err)
                get().setOnExamOptTempLoading(false);
            })
    },
})

export default onExamOptionTemplateSlice;
