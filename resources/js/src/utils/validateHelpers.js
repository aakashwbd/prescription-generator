export const isRequiredValidate = (
    stateField,
    errorField,
    setErrors,
    message
) => {
    if (!stateField || stateField.length === 0 || stateField.id === null) {
        setErrors((prevState) => ({
            ...prevState,
            [errorField]: { text: message, show: true },
        }));
        return true;
    } else {
        setErrors((prevState) => ({
            ...prevState,
            [errorField]: { text: "", show: false },
        }));
        return false;
    }
};

export const isEqualValidate = (
    field1,
    field2,
    errorField,
    setErrors,
    message
) => {
    if (field1 !== field2) {
        setErrors((prevState) => ({
            ...prevState,
            [errorField]: { text: message, show: true },
        }));
        return true;
    } else {
        setErrors((prevState) => ({
            ...prevState,
            [errorField]: { text: "", show: false },
        }));
        return false;
    }
};

export const lengthValidate = (
    field,
    errorField,
    lengthCount,
    setErrors,
    message
) => {
    if (field.length < lengthCount) {
        setErrors((prevState) => ({
            ...prevState,
            [errorField]: { text: message, show: true },
        }));
        return true;
    } else {
        setErrors((prevState) => ({
            ...prevState,
            [errorField]: { text: "", show: false },
        }));
        return false;
    }
};

export const phoneValidation = (field, errorField, setErrors, message) => {
    const phoneCodes = ["013", "014", "015", "016", "017", "018", "019"];
    let found = false;
    phoneCodes.forEach((item) => {
        if (field.startsWith(item)) {
            found = true;
        }
    });
    if (found) {
        setErrors((prevState) => ({
            ...prevState,
            [errorField]: { text: "", show: false },
        }));
        return false;
    } else {
        setErrors((prevState) => ({
            ...prevState,
            [errorField]: { text: message, show: true },
        }));
        return true;
    }
};
