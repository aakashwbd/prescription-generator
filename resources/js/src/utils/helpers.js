import moment from 'moment'
import Swal from "sweetalert2";

export const debounce = (fn, delay) => {
    let timerId;
    return (...args) => {
        clearTimeout(timerId);
        timerId = setTimeout(() => fn(...args), delay);
    }
};

export const getTokenExpireStatus = (tokenTime) => {
    let currentTime = moment().format("MM-DD-YYYY, h:mm:ss a");
    let expireTime = moment(tokenTime * 1000)
        .subtract(2, "minutes")
        .format("MM-DD-YYYY, h:mm:ss a");
    return currentTime > expireTime;
};

export const infoAlertMessage = (title = '', icon = 'success', text = '', cb = () => {}) => {
    Swal.fire({
        title: title,
        text: text,
        icon: icon,
    }).then(({ isConfirmed }) => {
        if (isConfirmed) {
            cb();
        }
        return false;
    });
};

export const deleteAlertMessage = (cb = () => {}) => {
    Swal.fire({
        title: "Are you sure?",
        text: "Do you want to continue?",
        icon: "question",
        confirmButtonText: "Yes, Delete it",
        showCancelButton: true,
        focusCancel: true,
    }).then(({ isConfirmed }) => {
        if (isConfirmed) {
            cb();
        }
        return false;
    });
};

export const tableIndex = (currentPage, perPage) => {
    let index = 1;
    if(currentPage > 1){
        index = (perPage * (currentPage - 1)) + 1
    }
    return index
}

export const foundData = (value) => {
    return value ? value : "N/A"
}

export const lengthConverter = (v1, v2) => {
    return v1 * v2
}


export const bmiCalculate = (weight = 0, feet = 0, inch = 0) => {
    let height = Number(feet + '.' +inch)
    let heightInMeter = lengthConverter(height, 0.304)
    return (weight / Math.pow(heightInMeter , 2))
}
export const bmiClassStatus = (bmi = 0) => {
    let status = ''
    if(bmi <= 18.5){
        status = 'Underweight'
    }else if (bmi >= 25.0 && bmi <= 29.9){
        status = 'Overweight'
    }else if (bmi >= 30.0){
        status = 'Obesity'
    }else {
        status = 'Healthy Weight'
    }
    return status
}
export const idealWeight = (gender = "", feet = 0, inch= 0) => {
    let height = Number(feet + '.' + inch)
    let heightInMeter = lengthConverter(height, 0.304)
    let heightInInch = (heightInMeter * 39.3700787) - 60
    let iWeight = (50 + (2.3 * heightInInch))
    if(gender === "Female"){
        iWeight = (45.5 + (2.3 * heightInInch))
    }
    return iWeight
}

export const isNegative = (num) => {
    return typeof num === 'number' && Math.sign(num) === -1;
}
