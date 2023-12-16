import { produtosAPI } from "../pegarProdutos.js";
import { $ } from "../utilidades.js";


const novidadesContainer = $('.img__template__container');
const produtosRecebidos = await produtosAPI.pegarProdutos();

export function atualizarNovidades () {

    const produtosNovos = produtosRecebidos.filter(p => p.novidade === true);


    for(const produtoNovo of produtosNovos) {

        const cardProdutoNovo = document.createElement('div');
        cardProdutoNovo.classList.add('img__template__super__card');
        cardProdutoNovo.innerHTML = `
            
        <p>
        ${produtoNovo.marca} ${produtoNovo.nome}
      </p>

      <img src="./assets/${produtoNovo.template}" alt="Imagem do tênis Nike Kyrie">
        `;
        

        novidadesContainer.appendChild(cardProdutoNovo);




    }

    
    
}
