
/**
 * Función encargada de tomar una carta
 * @param {Array<String>} deck 
 * @returns { String }
 */
export const takeCard = ( deck ) => {
    if ( !deck || deck.length === 0) {
        throw 'There are no more cards in the deck!'
    }
    const card = deck.pop();

    return card;
};