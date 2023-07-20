import  Swal  from "sweetalert2";

import { createDeck, takeCard, valueCard, createImgCard } from "./usecases/index";

// const { default: Swal } = require("sweetalert2");

// constante anonima que se auto-llama 
const myModule = (() => {
  'use strict'

  // baraja

  let deck = [];
  let cardsPlayer = [];
  let contAS = 0;
  const types = ['C', 'H', 'D', 'S'],
      specialCards = ['A', 'J', 'K', 'Q'],
      otherCards = ['gery_back', 'red_back'];

  let playersPoints = [];

  // Referencias HTML
  const btnRequest = document.querySelector('#idBtnRq'),
      btnNewGame = document.querySelector('#idBtnNC'),
      btnStay = document.querySelector('#idBtnSt');
  const divCardPlayers = document.querySelectorAll('.divCards'),
      pointsHTML = document.querySelectorAll('small');

  // Funcion encargada de inicializar el juego
  const initGame = (numPlayers = 2) => {
      deck = createDeck( types, specialCards );
      playersPoints = [];
      contAS = 0;
      for (let i = 0; i < numPlayers; i++) {
          playersPoints.push(0);
      };
      cardsPlayer = [];
      for (let i = 0; i < numPlayers; i++) {
          cardsPlayer.push('');
      }

      pointsHTML.forEach(e => {
          e.innerText = 0;
      });
      divCardPlayers.forEach(e => {
          e.innerHTML = '';
      });
  };


  // Funcion encargada de acumular los puntos de los jugadores
  const accumulatePoints = (card, turnPlayer) => {
      let cardValue = valueCard(card);
      playersPoints[turnPlayer] += cardValue;
      if (turnPlayer === 0) {
          cardsPlayer[turnPlayer] += (card);
        //   console.log('Cards Player' + cardsPlayer[turnPlayer]);  
      }else{
          cardsPlayer[turnPlayer] += (card);
        //   console.log('Cards Computer' +cardsPlayer[turnPlayer]);
      }

      // Verificar si hay un AS y si supera los 21 puntos
      if (playersPoints[turnPlayer] > 21 ) {
          let validatorAS = false;    
          for (let i = 0; i < cardsPlayer[turnPlayer].length; i++) {
              const element = cardsPlayer[turnPlayer][i];
              if (element === 'A') {
                  validatorAS = true
                  contAS += 1;
              };
          };
          if (validatorAS && contAS === 1) {
              playersPoints[turnPlayer] -= 10; // Restar 10 para cambiar el valor de un AS de 11 a 1
          };
      };
      
      pointsHTML[turnPlayer].innerText = playersPoints[turnPlayer];
      return playersPoints[turnPlayer];
    };


  // Funcion encargada de determinar el ganador de la partida
  const detWins = () => {
      const [minCardsValue, pointsComputer] = playersPoints;
      setTimeout(() => {
          if ((pointsComputer > minCardsValue) && (pointsComputer > 21)) {
              Swal.fire({
                  title: 'Congratulations!!',
                  text: 'You are the winner',
                  icon: 'success',
                  confirmButtonText: 'Ok',
              }).then((result) => {
                  if (result.isConfirmed) {
                      // console.log('Ok!');
                  } else if (!result.isConfirmed) {
                      // console.log('Cancel');
                  }
              })

          } else if (pointsComputer === minCardsValue) {
              Swal.fire({
                  title: 'upps!!',
                  text: 'Nobody wins!!',
                  icon: 'warning',
                  confirmButtonText: 'Ok',
              }).then((result) => {
                  if (result.isConfirmed) {
                      // console.log('Ok!');
                  } else if (!result.isConfirmed) {
                      // console.log('Cancel');
                  }
              });
          } else {
              Swal.fire({
                  title: 'upps!!',
                  text: 'Computer wins, GAME OVER!!',
                  icon: 'error',
                  confirmButtonText: 'Ok',
              }).then((result) => {
                  if (result.isConfirmed) {
                      // console.log('Ok!');
                  } else if (!result.isConfirmed) {
                      // console.log('Cancel');
                  }
              });
          };
      }, 300);
  };

  // Funcion encargada de generar turno para la computadora
  const takeComputer = (minCardsValue) => {
      let pointsComputer = 0;
      do {
          const card = takeCard( deck );
          pointsComputer = accumulatePoints(card, playersPoints.length - 1);
          createImgCard(card, playersPoints.length - 1, divCardPlayers);
      } while ((pointsComputer < minCardsValue) && (minCardsValue <= 21));
      detWins();
  };

  

  // Eventos
  btnRequest.addEventListener('click', () => {
      const card = takeCard( deck );
      const playersPoints = accumulatePoints(card, 0);
      createImgCard(card, 0, divCardPlayers);
      setTimeout(() => {
          if (playersPoints < 21) {
          } else if (playersPoints > 21) {
              takeComputer(playersPoints);
              btnRequest.disabled = true;
              btnStay.disabled = true;
          } else if (playersPoints === 21) {
              btnRequest.disabled = true;
              btnStay.disabled = true;
              takeComputer(playersPoints);
          }
      }, 100);
  });

  btnStay.addEventListener('click', () => {
      btnRequest.disabled = true;
      btnStay.disabled = true;
      takeComputer(playersPoints[0]);
  });


  btnNewGame.addEventListener('click', () => {
      btnRequest.disabled = false;
      btnStay.disabled = false;
      initGame();
  });

  // return {
  //     newGame: initGame
  // };

})();
