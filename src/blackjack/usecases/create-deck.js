import _ from "underscore";


/**
 * Función encargada de generar la baraja
 * @param {Array<String>} typesCards 
 * @param {Array<String>} specialCards 
 * @returns {Array<String>}
 */
export const createDeck = (typesCards, specialCards) => {
    if (!typesCards || typesCards.length === 0 )  throw new Error('Types cards is null or length < 1');
    if (!specialCards || specialCards.length === 0 )  throw new Error('specialCards cards is null or length < 1');
    
    let deck = [];
    for (let i = 2; i <= 10; i++) {
        typesCards.forEach(type => {
            deck.push(`${i}${type}`)
        });
    }
    specialCards.forEach(type => {
        typesCards.forEach(spec => {
            deck.push(`${type}${spec}`);
        });
    });
    deck = _.shuffle(deck);
    // console.log({deck});
    return deck;
};