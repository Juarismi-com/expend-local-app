export function removeAccents(text: string) {
    return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}
  
export const formatPriceNumber = (price: string|number, geo: string = "es-PY") => {
    const priceFormat = new Intl.NumberFormat('es-PY', { 
        style: 'currency',
        currency: 'PYG',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
     }).format(
        parseInt(price.toString()),
    )
    return priceFormat;
}