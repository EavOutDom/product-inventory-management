import dayjs from "dayjs";

export const currency = (number) => {
    if (!number) return "$0.00";
    return "$" + (Math.round(number * 100) / 100).toFixed(2);
};

export const discount = (number) => {
    if (!number) return "0.00%";
    return number.toFixed(2) + "%";
};

export const formatDateClient = (date) => {
    if (!date) return;
    return dayjs(date, "YYYY-MM-DD").format("DD/MM/YYYY");
};
