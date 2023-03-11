export const currency = (number) => {
    if (!number) return "$0.00";
    return "$" + (Math.round(number * 100) / 100).toFixed(2);
};
