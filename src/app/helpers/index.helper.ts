export function removeAccents(text: string) {
    return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}
  
// module.exports = removeAccents;


export const formatPriceNumber = (price: string|number, geo: string = "es-PY") => {
    const priceFormat = new Intl.NumberFormat('es-PY', { maximumSignificantDigits: 3 }).format(
        parseFloat(price.toString()),
    )

    return priceFormat;
}