export function removeAccents(text: string) {
    return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}
  
// module.exports = removeAccents;


export const formatPriceNumber = (price: string|number, geo: string = "es-PY") => {
    console.log(price);
    
    const priceFormat = new Intl.NumberFormat('es-PY', { 
        style: 'currency',
        currency: 'PYG',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
     }).format(
        parseFloat(price.toString()),
    )

    console.log(priceFormat);
    console.log("-------");
    return priceFormat;
}