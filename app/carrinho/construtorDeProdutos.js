import { adicionarAoCarrinho } from "./carrinho.js";
import { lerDoLocalStorage } from "../utilidades.js";
import { controlarAcessoDoUsuario } from "../usuario/controlarUsuario.js";

let $ = document.querySelector.bind(document);

function construirSecaoProdutoParaComprar() {
  const produto = lerDoLocalStorage("produtos") ?? {};

  const containerProdutoExibido = $(".produto__aberto");
  containerProdutoExibido.id = `produto-aberto-${produto.id}`;

  containerProdutoExibido.innerHTML = `
    <article class="produto__display row row-cols-1 row-cols-lg-2">
      <div class="imagem__produto__box">
        <div class="box__lupa-icon">
          <i class="fa-solid fa-magnifying-glass"></i>
        </div>
        <figure>
          <img
            src="assets/${produto.imagem}"
            alt="Imagem do tênis ${produto.nome}"
            class="img-fluid"
          />
        </figure>
        <div class="imagens__display">
          ${colocarOutrasCoresNaBoxImagem(produto.cores)}
        </div>
      </div>
      <div class="descricao__produto">
        <h2>${produto.nome}</h2>
        <div class="descricao__produto__menu d-flex gap-3 align-items-center">
          <h3>Tamanhos</h3>
          <h3 class="h3__guia">Guia <i class="fa-solid fa-arrow-right-long"></i></h3>
        </div>
        <div class="container__tamanho__tenis">
          ${criarBoxsTamanho(produto.tamanhos)}
         
        </div>
        <div class="btn__container">
          <button class="add__btn" id="btn-add-carrinho-${produto.id}">Adicionar</button>
          <p class="preco__tenis">$${produto.preco}</p>
        </div>
        <div class="descricao__footer">
          <a href="#">Descrições <i class="fa-solid fa-arrow-right-long"></i></a>
          <a href="#">Trocas & vendas <i class="fa-solid fa-arrow-right-long"></i></a>
          <a href="#">Estoques <i class="fa-solid fa-arrow-right-long"></i></a>
          <a href="#">Outlet <i class="fa-solid fa-arrow-right-long"></i></a>
        </div>
      </div>

      <div class="error-tamanho">Selecione um tamanho para continuar</div>
    </article>
  `;

  const boxTamanhos = document.querySelectorAll(".box__tamanho");
  verificarBoxSelecionada(boxTamanhos);
  const boxImagem = document.querySelectorAll(".imagem__cor");
  verificarBoxImagemSelecionada(boxImagem);
  trocarImagemCor();

  const btnAdicionarAoCarrinho = document.querySelector(`#btn-add-carrinho-${produto.id}`);
  btnAdicionarAoCarrinho.addEventListener("click", () => {
    const tamanhoSelecionadoElement = document.querySelector(".box__tamanho.selected");
    const corSelecionadaElement = document.querySelector(".imagem__cor.selected");
  
    if (tamanhoSelecionadoElement && corSelecionadaElement) {
      const tamanhoSelecionado = tamanhoSelecionadoElement.textContent;
      const corSelecionada = corSelecionadaElement.dataset.cor;
      const imgSelecionada = corSelecionadaElement.dataset.imagem;
  
      const produtoSelecionado = {
        id: `${produto.nome}-${corSelecionada}`.replace(/\s+/g, '-').replace(/[^a-zA-Z0-9-_]/g, ''),
        nome: produto.nome,
        preco: produto.preco,
        tamanho: tamanhoSelecionado,
        cor: corSelecionada,
        imagem: imgSelecionada,
      };
  
      adicionarAoCarrinho(produtoSelecionado);
      
    } else {
      const error = $('.error-tamanho');
      error.classList.add('visible');
      setTimeout(() => {
        error.classList.remove('visible');
      }, 3000);
    }
  });
  
}

function criarBoxsTamanho(tamanhos) {
  const boxes = tamanhos.map((tamanho) => `<div class="box__tamanho">${tamanho}</div>`);
  return boxes.join("");
}

function colocarOutrasCoresNaBoxImagem(cores) {
  const boxes = Object.entries(cores).map(([cor, imagem]) => `
    <div class="imagem__cor" data-cor="${cor}" data-imagem="${imagem}">
      <img class="img-fluid" src="assets/${imagem}" alt="Imagem do tênis ${cor}" />
    </div>
  `);
  return boxes.join("");
}

function trocarImagemCor() {
  const imagemPrincipal = document.querySelector(".imagem__produto__box img");
  const imagensCores = document.querySelectorAll(".imagem__cor");

  imagensCores.forEach((imagemCor) => {
    imagemCor.addEventListener("click", () => {
      const imagemSelecionada = imagemCor.dataset.imagem;

      imagemPrincipal.src = `assets/${imagemSelecionada}`;

      imagensCores.forEach((otherBox) => {
        if (otherBox !== imagemCor) {
          otherBox.classList.remove("selected");
        }
      });

    });
  });
}

function verificarBoxSelecionada(containerBoxTamanhos) {
  containerBoxTamanhos.forEach((box) => {
    box.addEventListener("click", () => {
      containerBoxTamanhos.forEach((otherBox) => {
        if (otherBox !== box) {
          otherBox.classList.remove("selected");
        }
      });

      !box.classList.contains("selected") ? box.classList.add("selected") : box.classList.remove("selected");
    });
  });
}

function verificarBoxImagemSelecionada(containerBoxImagem) {
  containerBoxImagem.forEach((box) => {
    box.addEventListener("click", () => {
      containerBoxImagem.forEach((otherBox) => {
        if (otherBox !== box) {
          otherBox.classList.remove("selected");
        }
      });

      !box.classList.contains("selected") ? box.classList.add("selected") : box.classList.remove("selected");
    });
  });

  containerBoxImagem[0].classList.add("selected");
}



construirSecaoProdutoParaComprar();
controlarAcessoDoUsuario();
