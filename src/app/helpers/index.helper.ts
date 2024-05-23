export function removeAccents(text: string) {
    return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}
  
// module.exports = removeAccents;
  