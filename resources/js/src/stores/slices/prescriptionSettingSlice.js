import Cookies from "js-cookie";
import {toast} from "react-toastify";
import ApiUrls from "../apiUrls";

const prescriptionSettingSlice = (set, get) => ({
    prescriptionSettings: {
        data: []
    },
    prescriptionSetting: {},
    prescriptionSettingLoading: false,
    prescriptionSettingErrors: {},

    // Setter
    setPrescriptionSettings: (payload) => set((state) => ({ prescriptionSettings: payload })),
    setPrescriptionSetting: (payload) => set((state) => ({ prescriptionSetting: payload })),
    setPrescriptionSettingLoading: (payload) => set((state) => ({ prescriptionSettingLoading: payload })),
    setPrescriptionSettingErrors: (payload) => set((state) => ({ prescriptionSettingErrors: payload })),

    // Fetcher
    prescriptionSettingStore: async (data, cb = () => {}) => {
        let token = Cookies.get('authToken') || null
        get().setPrescriptionSettingLoading(true);
        await fetch(ApiUrls.prescription_settings.index, {
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
                    get().setPrescriptionSettingErrors(res.data)
                }else if (res.status === 'error'){
                    toast.error(res.message)
                }
                get().setPrescriptionSettingLoading(false);
            })
            .catch(err => {
                console.log(err)
                get().setPrescriptionSettingLoading(false);
            })
    },
    updatePrescriptionSetting: async (data, cb = () => {}) => {
        let token = Cookies.get('authToken') || null
        get().setPrescriptionSettingLoading(true);
        await fetch(ApiUrls.prescription_settings.show.replace(':id', data.id), {
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
                    get().setPrescriptionSettingErrors(res.data)
                }else if (res.status === 'error'){
                    toast.error(res.message)
                }
                get().setPrescriptionSettingLoading(false);
            })
            .catch(err => {
                console.log(err)
                get().setPrescriptionSettingLoading(false);
            })
    },
    fetchPrescriptionSettings: async (page = 1, offset = 15,  cb = () => {}) => {
        let token = Cookies.get('authToken') || null
        get().setPrescriptionSettingLoading(true);

        await fetch(ApiUrls.prescription_settings.index + `?page=${page}&offset=${offset}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                Authorization: token,
            }
        })
            .then(res => res.json())
            .then(res => {
                if(res.status === 'success'){
                    get().setPrescriptionSettings(res.data)
                    cb()
                }
                get().setPrescriptionSettingLoading(false);
            })
            .catch(err => {
                console.log(err)
                get().setPrescriptionSettingLoading(false);
            })
    },
    fetchPrescriptionSetting: async (id, cb = () => {}) => {
        let token = Cookies.get('authToken') || null
        get().setPrescriptionSettingLoading(true);
        await fetch(ApiUrls.prescription_settings.show.replace(':id', id), {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                Authorization: token,
            }
        })
            .then(res => res.json())
            .then(res => {
                if(res.status === 'success'){
                    get().setPrescriptionSetting(res.data)
                    cb()
                }
                get().setPrescriptionSettingLoading(false);
            })
            .catch(err => {
                console.log(err)
                get().setPrescriptionSettingLoading(false);
            })
    },
    deletePrescriptionSetting: async (id, cb = () => {}) => {
        let token = Cookies.get('authToken') || null
        get().setPrescriptionSettingLoading(true);
        await fetch(ApiUrls.prescription_settings.show.replace(':id', id), {
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
                get().setPrescriptionSettingLoading(false);
            })
            .catch(err => {
                console.log(err)
                get().setPrescriptionSettingLoading(false);
            })
    },
})

export default prescriptionSettingSlice;
