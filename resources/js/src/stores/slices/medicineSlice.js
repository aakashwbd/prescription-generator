import ApiUrls from "../apiUrls";
import Cookies from "js-cookie";

const medicineSlice = (set, get) => ({
    medicines: {
        data: []
    },
    allMedicines: [],
    medicine: {},
    medicineLoading: false,

    // Setter
    toggleLoading: (payload) => set((state) => ({ medicineLoading: payload })),
    setMedicines: (payload) => set((state) => ({ medicines: payload })),
    setMedicine: (payload) => set((state) => ({ medicine: payload })),

    // Fetcher
    fetchMedicines: async (searchQuery = '', page = 1, offset = 15, cb = () => {}) => {
        let token = Cookies.get('authToken') || null
        await fetch(ApiUrls.medicines.index + `?page=${page}&offset=${offset}&search=${searchQuery}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                Authorization: token,
            }
        })
            .then(res => res.json())
            .then(res => {
                if(res.status === 'success'){
                    get().setMedicines(res.data)
                    cb()
                }
            })
            .catch(err => console.log(err))
    },
    fetchMedicine: async (id, cb = () => {}) => {
        let token = Cookies.get('authToken') || null
        await fetch(ApiUrls.medicines.show.replace(':id', id), {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                Authorization: token,
            }
        })
            .then(res => res.json())
            .then(res => {
                console.log(res)
                if(res.status === 'success'){
                    get().setMedicine(res.data)
                    cb()
                }
            })
            .catch(err => console.log(err))
    },
})

export default medicineSlice
