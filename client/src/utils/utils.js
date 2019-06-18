export const formatNumber = (number) => {
    let result = "";
    if (number) {
        result = number.toLocaleString(navigator.language);
    }
    return result;
};
