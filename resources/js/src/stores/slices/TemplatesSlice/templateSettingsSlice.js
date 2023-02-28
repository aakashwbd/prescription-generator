import Cookies from "js-cookie";
import {toast} from "react-toastify";
import ApiUrls from "../../apiUrls";

const templateSettingsSlice = (set, get) => ({
    templateSettings: {
        data: []
    },
    templateSettingsLoading: false,
    templateSettingsValidateErrors: {},

    // Setter
    setTemplateSettings: (payload) => set((state) => ({ templateSettings: payload })),
    setTemplateSettingsLoading: (payload) => set((state) => ({ templateSettingsLoading: payload })),
    setTemplateSettingsValidateErrors: (payload) => set((state) => ({ templateSettingsValidateErrors: payload })),

    updateTemplateSetting: async (data, cb = () => {}) => {
        let token = Cookies.get('authToken') || null
        get().setTemplateSettingsLoading(true);
        await fetch(ApiUrls.templates.settings.show.replace(':id', data.id), {
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
                    get().setTemplateSettingsValidateErrors(res.data)
                }else if (res.status === 'error'){
                    toast.error(res.message)
                }
                get().setTemplateSettingsLoading(false);
            })
            .catch(err => {
                console.log(err)
                get().setTemplateSettingsLoading(false);
            })
    },

    fetchTemplateSettings: async (page = 1, offset = 10,  cb = () => {}) => {
        let token = Cookies.get('authToken') || null
        get().setTemplateSettingsLoading(true);

        await fetch(ApiUrls.templates.settings.index + `?page=${page}&offset=${offset}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                Authorization: token,
            }
        })
            .then(res => res.json())
            .then(res => {
                if(res.status === 'success'){
                    get().setTemplateSettings(res.data)
                    cb()
                }
                get().setTemplateSettingsLoading(false);
            })
            .catch(err => {
                console.log(err)
                get().setTemplateSettingsLoading(false);
            })
    },
})

export default templateSettingsSlice;
