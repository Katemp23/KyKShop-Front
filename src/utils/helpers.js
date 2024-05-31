export const formatPrice = (price) => {
    return new Intl.NumberFormat('en-CO', {
        style: 'currency',
        currency: "COP",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(price);
}