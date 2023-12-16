
import { produtosAPI } from "../pegarProdutos.js";
import { salvarLocalStorage } from "../utilidades.js";


let $ = document.querySelector.bind(document);
const cardTenisContainer = $('#card-container');
const produtosRecebidos = await produtosAPI.pegarProdutos();


export async function criarCardsDeTenis (produto) {

    

    try{   
            
          

            const card = document.createElement('div');
            card.classList.add('tenis__card');
            const avaliacaoAleatoria = produto.avaliacao || criarAvaliacao(produto);
            card.innerHTML = `

              ${produto.svg}
              
              <div class="tenis__imagem-template">
                <figure class="tenis__figure">
                  <img src="./assets/${produto.imagem}" alt="Imagem do tênis ${produto.nome}">
                </figure>
              </div>

              <div class = "tenis__card__body">
              <h4 class = "text-start fw-light">
              ${produto.marca} ${produto.nome} 
              </h4>


              <div class = 'tenis__card__avaliation'>

              <div class="star__container text-warning">
                ${avaliacaoAleatoria} 
    
                </div>  

                <p id="preco-produto">
                  $${produto.preco}
                </p>
              
              </div>

              </div>
            </div>
              `;

            card.addEventListener('click', () => abrirProduto(produto.id));
      
            cardTenisContainer.appendChild(card);

    }catch (e) {

    }


}

export function renderizarProdutos () {
  

  for(const produto of produtosRecebidos){
    criarCardsDeTenis(produto);
  }

}

export function abrirProduto (idProduto) {

    const produtoAbrir = produtosRecebidos.find(p => p.id === idProduto);
    salvarLocalStorage('produtos', produtoAbrir);

    if(produtoAbrir){

       window.location.href = './produto-aberto.html'

    }
       
}

export function criarAvaliacao(produto) {

  if (produto.avaliacao) {
      return produto.avaliacao;
  }

  const avaliacao = Math.max(0, Math.min(5, Math.random() * 2 + 3));
  const avaliacaoArredondada = Math.round(avaliacao * 2) / 2;

  const estrelasHTML = Array.from({ length: 5 }, (_, index) => {
      if (index + 0.5 === avaliacaoArredondada) {
          return '<i class="fa-solid fa-star-half-stroke"></i>';
      } else if (index + 1 <= avaliacaoArredondada) {
          return '<i class="fa-solid fa-star"></i>';
      } else {
          return '<i class="fa-regular fa-star"></i>';
      }
  }).join('');


  produto.avaliacao = `<div class="star__container">${estrelasHTML}</div>`;
  salvarLocalStorage('produtos', produtosRecebidos);

  return produto.avaliacao;
}