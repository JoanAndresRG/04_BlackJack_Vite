
/**
 * Funcion encargada de tomar el valor de la carta
 * @param { String } card 
 * @returns { Number }
 */
export const valueCard = (card) => {
    if (!card) throw new Error('Card is null');
    const value = card.substring(0, card.length - 1);
    return isNaN(value) ? (value === 'A' ? 11 : 10) : value * 1;
    
  };