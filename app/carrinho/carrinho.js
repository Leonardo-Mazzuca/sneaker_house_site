import { construirTabela } from "../constructors/construirTabelaCarrinho";
import { $, lerDoLocalStorage, salvarLocalStorage } from "../utilidades";



const produtosAdicionados = lerDoLocalStorage('carrinho') || [];

export function adicionarAoCarrinho(produto) {
  const produtoExistente = produtosAdicionados.find((p) => p.id === produto.id);

  const temLogin = localStorage.getItem("usuario-logado") ?? "";

  if (temLogin) {

    if (produtoExistente) {

      aumentarQuantidadeProduto(produtoExistente);

    } else {
      const novoProduto = { ...produto, quantidade: 1 };
      produtosAdicionados.push(novoProduto);
    }

    if(verificarSeCarrinhoEstaVazio()){
      console.log("Ainda vazio");
    }
    desenharProdutoNoCarrinho(produtosAdicionados);
    atualizarQuantidadeTotal();
    salvarLocalStorage('carrinho', produtosAdicionados);
    
  } else {
    alert("Faça login para realizar a compra!");
  }



}


export function atualizarQuantidadeTotal() {
  const quantidadeTotalElemento = $('.quantidade');

  if (quantidadeTotalElemento) {
    const quantidadeTotal = produtosAdicionados.reduce((total, produto) => total + produto.quantidade, 0);

    if (quantidadeTotal > 0) {
      quantidadeTotalElemento.classList.add('visible');
      quantidadeTotalElemento.textContent = `${quantidadeTotal}`;
    } else {
      quantidadeTotalElemento.classList.remove('visible');
    }
  }
}

function abrirCarrinho() {


  const carrinho = $('#carrinho');
  const iconeCarrinho = $('#abrir-compras');
  const main = $('main');
  const footer = $('footer');

  carrinho.classList.toggle('is-open');

  if (carrinho.classList.contains('is-open')) {
    main.style.display = 'none';
    footer.style.display = 'none';
  } else {
    main.style.display = 'block';
    footer.style.display = 'block';
  }

}


function verificarSeCarrinhoEstaVazio() {

  const carrinhoElement = $(".carrinho__aberto");

  if(produtosAdicionados.length === 0) {

  carrinhoElement.innerHTML = '';

    carrinhoElement.innerHTML = `
    
    <div class="carrinho__vazio d-flex">

    <div class = "d-flex align-items-center justify-content-center flex-wrap text-center" >
    <h3 >
    Seu carrinho parece vazio...
    </h3>

  <figure >
    <img src="assets/empty-car.png" alt="Imagem de um carrinho vazio">
  </figure>
    </div>
    



    </div>
    
    `;

    return true;

  } else {

    carrinhoElement.innerHTML = construirTabela();


  }

  }





function desenharProdutoNoCarrinho(produtosAdicionados) {
  const tabelaProdutos = $('.tabela__produtos');
 
  if(tabelaProdutos) {

    tabelaProdutos.innerHTML = '';
  
    produtosAdicionados.forEach(produto => {
      const tr = document.createElement('tr');
      tr.classList.add('produto__no__carrinho');
  
      const trInner = `
        <td class="td__produto">
          <div class="imagem__produto__carrinho">
            <img src="./assets/${produto.imagem}" alt="imagem do snicker ${produto.nome}" class="img-fluid">
            <div class="produto__especificacoes">
              <h3>${produto.nome}</h3>
              <h5>${produto.cor}</h5>
              <p>Tamanho ${produto.tamanho}</p>
            </div>
          </div>
        </td>
        <td class="td__preco">$${produto.preco}</td>
        <td class="td__quantidade">
          <div class="btn__container">
            <button id="decrementar-quantidade-${produto.id}"><i class="fa-solid fa-circle-minus"></i></button>
            <span class="quantidade__total-${produto.id}">${produto.quantidade}</span>
            <button id="aumentar-quantidade-${produto.id}"><i class="fa-solid fa-circle-plus"></i></button>
          </div>
        </td>
        <td class="td__total">
          <div class="total__carrinho">
            <p class = "total__produto-${produto.id}"></p>
            <button id="excluir-item-${produto.id}"><i class="fa-solid fa-circle-xmark"></i></button>
          </div>
        </td>
      `;
  
  
  
      tr.innerHTML = trInner;
      tabelaProdutos.appendChild(tr);
  
      decrementarEAumentarQuantidade(produto);
      atualizarPrecoTotalProdutoNoCarrinho(produto);
      excluirProduto(produto);
      atualizarSubTotal();
  
    });
  }
}

function decrementarEAumentarQuantidade(produto) {
  
  const decrementarButton = $(`#decrementar-quantidade-${produto.id}`);
  if (decrementarButton) {
    decrementarButton.addEventListener('click', () => {
      decrementarQuantidadeProduto(produto);
      atualizarSubTotal();

    });
  }

  const aumentarButton = $(`#aumentar-quantidade-${produto.id}`);
  if (aumentarButton) {
    aumentarButton.addEventListener('click', () => {
      aumentarQuantidadeProduto(produto);
      atualizarSubTotal();
    });
  }

 
}

function atualizarQuantidadeDoProdutoNoCarrinho (produto) {

  const quantidadeDoProduto = $(`.quantidade__total-${produto.id}`);
  if(quantidadeDoProduto){
    quantidadeDoProduto.textContent = produto.quantidade;

  }

}

function aumentarQuantidadeProduto (produto) {
  produto.quantidade++;
  atualizarQuantidadeDoProdutoNoCarrinho(produto);
  atualizarQuantidadeTotal();
  atualizarPrecoTotalProdutoNoCarrinho(produto);
  salvarLocalStorage('carrinho', produtosAdicionados);
  
}

function decrementarQuantidadeProduto(produto) {
  produto.quantidade--;

  if (produto.quantidade <= 0) {
    excluirProduto(produto);
  } else {
    atualizarQuantidadeDoProdutoNoCarrinho(produto);
    atualizarQuantidadeTotal();
    atualizarPrecoTotalProdutoNoCarrinho(produto);
    salvarLocalStorage('carrinho', produtosAdicionados);
  }
}

function atualizarPrecoTotalProdutoNoCarrinho(produto) {
  const totalProdutoCarrinho = $(`.total__produto-${produto.id}`);
  
  if (totalProdutoCarrinho) {
    totalProdutoCarrinho.textContent = `$${produto.preco * produto.quantidade}`;
    salvarLocalStorage('carrinho', produtosAdicionados);
  }
}

function excluirProduto(produto) {
  const excluirButton = $(`#excluir-item-${produto.id}`);
  excluirButton.addEventListener('click', () => {
    const indice = produtosAdicionados.indexOf(produto);

    if (indice !== -1) {
      produtosAdicionados.splice(indice, 1);
      desenharProdutoNoCarrinho(produtosAdicionados);
      salvarLocalStorage('carrinho', produtosAdicionados);
      atualizarQuantidadeTotal();
      atualizarSubTotal();
      verificarSeCarrinhoEstaVazio();
    }
  });

  if (produto.quantidade <= 0) {
    const indice = produtosAdicionados.indexOf(produto);
    if (indice !== -1) {
      produtosAdicionados.splice(indice, 1);
      desenharProdutoNoCarrinho(produtosAdicionados);
      salvarLocalStorage('carrinho', produtosAdicionados);
      atualizarQuantidadeTotal();
      atualizarSubTotal();
    }
  }
}

function atualizarSubTotal () {

  const subTotal = $('#subtotal');
  const total = $('#total-carrinho');


  subTotal.textContent  =
  `$${ produtosAdicionados.reduce((total, produto) => total += produto.preco * produto.quantidade,0)}`;
  total.textContent  =
  `Total: $${ produtosAdicionados.reduce((total, produto) => total += produto.preco * produto.quantidade,0)}`;

  salvarLocalStorage('carrinho', produtosAdicionados);

}




$('#abrir-compras').addEventListener('click', abrirCarrinho);







export function inicializarCarrinho() {

  if (verificarSeCarrinhoEstaVazio()) {
    return;
  }

  desenharProdutoNoCarrinho(produtosAdicionados);
  atualizarQuantidadeTotal();

}



inicializarCarrinho();
