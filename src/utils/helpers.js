export const formatPrice = (price) => {
    return new Intl.NumberFormat('en-CO', {
        style: 'currency',
        currency: "COP"
    }).format(price);
}