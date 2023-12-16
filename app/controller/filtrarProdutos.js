import { produtosAPI } from "../pegarProdutos.js";
import { criarCardsDeTenis } from "../creator/criarSecaoTenis.js"; 

let $ = document.querySelector.bind(document);
const cardTenisContainer = $('#card-container');
const ancoraBusca = document.querySelectorAll('[data-filtrar]');
const filtrosGenero = document.querySelectorAll('[data-filtrar-genero]');
const produtosRecebidos = await produtosAPI.pegarProdutos();

export function filtrarProdutos() {
  ancoraBusca.forEach(a => {
    a.addEventListener('click', () => {
      limparCards();
      filtrarPorCategoria(a.getAttribute('data-filtrar'));
    });
  });

  filtrosGenero.forEach(a => {
    a.addEventListener('click', () => {
      limparCards();
      filtrarPorGenero(a.getAttribute('data-filtrar-genero'));
    });
  });
}

function limparCards() {
  cardTenisContainer.innerHTML = ''; 
}

function filtrarPorCategoria(filtro) {
  const produtosFiltrados = produtosRecebidos.filter(p => p.marca === filtro);
  for (const produto of produtosFiltrados) {
    criarCardsDeTenis(produto);
  }
}

function filtrarPorGenero(filtro) {
  let produtosFiltrados = [];
  if (filtro === 'todos') {
    produtosFiltrados = produtosRecebidos;
  } else {
    produtosFiltrados = produtosRecebidos.filter(p => p.feminino === (filtro === 'feminino'));
  }
  for (const produto of produtosFiltrados) {
    criarCardsDeTenis(produto);
  }
}
