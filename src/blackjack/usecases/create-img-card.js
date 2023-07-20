/**
 *  Funcion encargada de agregar la carta en el div del html
 * @param { Array<String> } card 
 * @param { Number } turnPlayer 
 * @param {*} divCardPlayers
 */

export const createImgCard = (card, turnPlayer, divCardPlayers) => {
    if (!card) throw new Error("card is null");   

    // generar imagen de forma dinamica
    // assets/cartas/cartas/2H.png
    const imgcard = document.createElement('img');
    imgcard.src = `assets/cartas/cartas/${card}.png`;
    imgcard.classList.add('cards');
    divCardPlayers[turnPlayer].append(imgcard);
};