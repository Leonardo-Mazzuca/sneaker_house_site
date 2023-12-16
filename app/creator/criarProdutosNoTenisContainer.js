import { abrirProduto } from "./criarSecaoTenis.js";
import { produtosAPI } from "../pegarProdutos.js";




let $ = document.querySelector.bind(document);


export async function criarProdutosNoTenisContainer () {

    const swiperWrapperTenis = $('.sw-tenis__container');

    const produtosRecebidos = await produtosAPI.pegarProdutos();

    const produtosEspeciais = [];
    
    for(const produto of produtosRecebidos){
        produto.especial === true ? produtosEspeciais.push(produto) : produtosEspeciais.push();
    }

  
    try{

        produtosEspeciais.forEach(produto => {

            const cardElement = document.createElement('div');
            cardElement.classList.add('swiper-slide');
            cardElement.id = 'sl-tenis-container';

            cardElement.innerHTML = `

                <div class="img__tenis">
                    <img src="./assets/${produto.template}" alt="imagem de fundo ${produto.nome}" class="img-fluid">
                </div>

                <div class="container__cards__tenis">

                <h2 class = "text-start mb-3">
                ${produto.marca} ${produto.nome}
                </h2>
    
                <div class = "cards__container__content d-flex gap-3">
                ${criarCardsDeTenis(produto.cores)}
                </div>
          
      
           
    
                <button id="acessar-${produto.id}">
                  Acessar
                </button>
    
            </div>

           
                
                
                
                `;


             


                swiperWrapperTenis.appendChild(cardElement);
                
                const acessarBtn = $(`#acessar-${produto.id}`);
                acessarBtn.addEventListener('click', ()=> {
                    abrirProduto(produto.id)
                });

        });

     

    } catch (e) {

    }




}

function criarCardsDeTenis(cores) {
    const imagensCores = Object.values(cores);

    const cardsHTML = imagensCores.map(cor => `
        <div class="card__tenis">
            <img src="./assets/${cor}" alt="Imagem do produto na cor ${cor}">
        </div>`
    ).join('');

    return cardsHTML;
}







