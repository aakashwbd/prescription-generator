import create from 'zustand'
import { persist, devtools } from 'zustand/middleware'
import medicineSlice from "./slices/medicineSlice";
import authSlice from "./slices/authSlice";
import siteSlice from "./slices/siteSlice";
import prescriptionSlice from "./slices/prescriptionSlice";
import genericSlice from "./slices/genericsSlice";
import indicationSlice from "./slices/indicationSlice";
import therapeuticSlice from "./slices/therapeuticSlice";
import templatesSlice from "./slices/TemplatesSlice";
import pageSetupSlice from "./slices/pageSetupSlice";
import prescriptionSettingSlice from "./slices/prescriptionSettingSlice";

const store = (set, get) => ({
    ...medicineSlice(set, get),
    ...authSlice(set, get),
    ...siteSlice(set, get),
    ...prescriptionSlice(set, get),
    ...genericSlice(set, get),
    ...indicationSlice(set, get),
    ...therapeuticSlice(set, get),
    ...templatesSlice(set, get),
    ...pageSetupSlice(set, get),
    ...prescriptionSettingSlice(set, get),
})

const useStore = create(devtools(store))
export default useStore
