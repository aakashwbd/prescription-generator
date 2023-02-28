import drugTemplateSlice from "./drugTemplateSlice";
import adviceTemplateSlice from "./adviceTemplateSlice";
import cubicTemplateSlice from "./cubicCentimetersTemplateSlice";
import onExamTemplateSlice from "./onExamTemplateSlice";
import investigationTemplateSlice from "./investigationTemplateSlice";
import doseTemplateSlice from "./doseTemplateSlice";
import durationTemplateSlice from "./durationTemplateSlice";
import onExamOptionTemplateSlice from "./onExamOptionTemplateSlice";
import treatmentTemplateSlice from "./treatementTemplateSlice";
import templateSettingsSlice from "./templateSettingsSlice";

const templatesSlice = (set, get) => ({
    ...drugTemplateSlice(set, get),
    ...treatmentTemplateSlice(set, get),
    ...adviceTemplateSlice(set, get),
    ...cubicTemplateSlice(set, get),
    ...onExamTemplateSlice(set, get),
    ...investigationTemplateSlice(set, get),
    ...doseTemplateSlice(set, get),
    ...durationTemplateSlice(set, get),
    ...onExamOptionTemplateSlice(set, get),
    ...templateSettingsSlice(set, get),
})
export default templatesSlice
