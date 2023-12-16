import { criarAvaliacao } from "./creator/criarSecaoTenis";

export let $ = document.querySelector.bind(document);

export function salvarLocalStorage(key, info) {
  localStorage.setItem(key, JSON.stringify(info));
}

export function lerDoLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

export function limparLocalStorage(key) {
  localStorage.removeItem(key);
}

export const caminhosImgInstagram = [
  "instagram-img/instagram-1.jpg",
  "instagram-img/instagram-2.jpg",
  "instagram-img/instagram-3.jpg",
  "instagram-img/instagram-4.jpg",
  "instagram-img/instagram-5.jpg",
  "instagram-img/instagram-6.jpg",
  "instagram-img/instagram-7.jpg",
  "instagram-img/instagram-8.jpg",
];

export function criarCard(produto) {
  const tenisCard = document.createElement("div");
  tenisCard.classList.add("tenis__card");
  const avaliacaoAleatoria = produto.avaliacao || criarAvaliacao(produto);

  tenisCard.innerHTML = `

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

  return tenisCard;
}

export function coletarEmail() {
  const emailUsuario = localStorage.getItem("usuario-logado") ?? "";
  if (emailUsuario) {
    const emailSemAspas = emailUsuario.replace(/^"(.*)"$/, "$1");
    return emailSemAspas;
  }
  return "";
}

export function desenharCardSimples(item) {
  const card = document.createElement("div");
  card.classList.add("card__checkout");

  card.innerHTML = `
  
    <div class = "img__container">
    <figure>
    <img src="assets/${item.imagem}" alt="Imagem do sneaker ${
    item.nome
  }" class="img-fluid">
  </figure>
    </div>
  
  <div class="text-container">

    <div class = "d-flex gap-3">
    <h2>
    ${item.nome}
    </h2>
  
    <p>
    $${item.quantidade > 1 ? item.preco * item.quantidade : item.preco}
    </p>

    </div>

    <div class = "tamanho__container d-flex gap-3">
    <p>
        ${item.tamanho}
    </p>

    <p>Uni - ${item.quantidade}</p>
    </div>
  
    
    `;

  return card;
}

// limparLocalStorage('carrinho')
