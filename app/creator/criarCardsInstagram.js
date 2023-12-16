import { $, caminhosImgInstagram } from "../utilidades.js";


export function criarCardsInstagram () {
    const imgInstagramContainer = $('#container-instagram');
    
    for(const caminho of caminhosImgInstagram) {
        const cardImg = document.createElement('div');
        cardImg.classList.add('card__img');

        cardImg.innerHTML = `
        <img src="./assets/${caminho}" alt="Imagem de um tênis do instagram da Sneaker House">
        `;

        imgInstagramContainer.appendChild(cardImg);
    }

}