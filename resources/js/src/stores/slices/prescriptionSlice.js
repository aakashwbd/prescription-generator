import Cookies from "js-cookie";
import ApiUrls from "../apiUrls";
import {toast} from "react-toastify";

const prescriptionSlice = (set, get) =>  ({
    prescriptions: {
        data: []
    },
    prescription: {},
    prescriptionResponse: {},
    prescriptionSummary: {},
    prescriptionLoading: false,
    prescriptionValidateErrors: {},


    // setter
    setPrescriptions: (payload) => set((state)=> ({prescriptions: payload})),
    setPrescription: (payload) => set((state)=> ({prescription: payload})),
    setPrescriptionResponse: (payload) => set((state)=> ({prescriptionResponse: payload})),
    setPrescriptionSummary: (payload) => set((state)=> ({prescriptionSummary: payload})),
    setPrescriptionLoading: (payload) => set((state)=> ({prescriptionLoading: payload})),
    setPrescriptionValidateErrors: (payload) => set((state)=> ({prescriptionValidateErrors: payload})),


    prescriptionStore: async (data, cb = () => {}) => {
        get().setPrescriptionLoading(true)
        let token = Cookies.get('authToken') || null
        await fetch(ApiUrls.prescriptions.index, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                "Authorization" : token,
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(res => {
                if(res.status === 'success'){
                    toast.success(res.message);
                    // get().setPrescriptionResponse(res.data)
                    cb(res.data);
                }else if (res.status === 'validate_error'){
                    get().setPrescriptionValidateErrors(res.data)
                }else if (res.status === 'error'){
                    toast.error(res.message)
                }
                get().setPrescriptionLoading(false)
            })
            .catch(err => {
                console.log(err)
                get().setPrescriptionLoading(false)
            })
    },

    updatePrescription: async (data, cb = () => {}) => {
        get().setPrescriptionLoading(true)
        let token = Cookies.get('authToken') || null
        await fetch(ApiUrls.prescriptions.show.replace(':id', data.id), {
            method: 'PATCH',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                "Authorization" : token,
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(res => {
                if(res.status === 'success'){
                    toast.success(res.message);
                    // get().setPrescriptionResponse(res.data)
                    cb(res.data);
                }else if (res.status === 'validate_error'){
                    get().setPrescriptionValidateErrors(res.data)
                }else if (res.status === 'error'){
                    toast.error(res.message)
                }
                get().setPrescriptionLoading(false)
            })
            .catch(err => {
                console.log(err)
                get().setPrescriptionLoading(false)
            })
    },

    fetchPrescriptions: async (searchQuery = "", page = 1, offset = 10, status, cb = () => {}) => {
        get().setPrescriptionLoading(true)
        let token = Cookies.get('authToken') || null

        let url = ApiUrls.prescriptions.index + `?status=${status}` + `&page=${page}&offset=${offset}`
        if(searchQuery){
           url = ApiUrls.prescriptions.index + `?search=${searchQuery}` + `&page=${page}&offset=${offset}`
        }
        await fetch(url, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                "Authorization": token,
            },
        })
            .then(res => res.json())
            .then(res => {
                if(res.status === 'success'){
                    get().setPrescriptions(res.data)
                    cb()
                }
                get().setPrescriptionLoading(false)
            })
            .catch(err => {
                console.log(err)
                get().setPrescriptionLoading(false)
            })
    },

    fetchPrescriptionSummary: async (cb = () => {}) => {
        get().setPrescriptionLoading(true)
        let token = Cookies.get('authToken') || null

        await fetch(ApiUrls.prescriptions.summary, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                "Authorization": token,
            },
        })
            .then(res => res.json())
            .then(res => {
                if(res.status === 'success'){
                    get().setPrescriptionSummary(res.data)
                    cb()
                }
                get().setPrescriptionLoading(false)
            })
            .catch(err => {
                console.log(err)
                get().setPrescriptionLoading(false)
            })
    },

    fetchPrescription: async (id, cb = () => {}) => {
        get().setPrescriptionLoading(true)
        let token = Cookies.get('authToken') || null
        await fetch(ApiUrls.prescriptions.show.replace(':id', id), {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                "Authorization": token,
            },
        })
            .then(res => res.json())
            .then(res => {
                if(res.status === 'success'){
                    get().setPrescription(res.data)
                    cb()
                }
                get().setPrescriptionLoading(false)
            })
            .catch(err => {
                console.log(err)
                get().setPrescriptionLoading(false)
            })
    },

    deletePrescription: async (id, cb = () => {}) => {
        get().setPrescriptionLoading(true)
        let token = Cookies.get('authToken') || null
        await fetch(ApiUrls.prescriptions.show.replace(":id", id), {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                "Authorization": token,
            },
        })
            .then(res => res.json())
            .then(res => {
                if(res.status === 'success'){
                    toast.success(res.message)
                    cb()
                }
                get().setPrescriptionLoading(false)
            })
            .catch(err => {
                console.log(err)
                get().setPrescriptionLoading(false)
            })
    },
})
export default prescriptionSlice
