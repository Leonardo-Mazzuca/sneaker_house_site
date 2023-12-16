


import { abrirProduto } from "./criarSecaoTenis.js";
import { produtosAPI } from "../pegarProdutos.js";
import { criarCard } from "../utilidades.js";



let $ = document.querySelector.bind(document);


export async function criarCardsPromocao () {

   const produtosRecebidos = await produtosAPI.pegarProdutos();
   const swiperWrapper = $('#sw-queima');

   const produtosPromocao = produtosRecebidos.filter(produto => produto.promocao);

   try{

      for(const produtoPromocao of produtosPromocao) {
         const tenisCard = criarCard(produtoPromocao);
   
         const swiperSlide = document.createElement('div');
         swiperSlide.classList.add('swiper-slide');
         swiperSlide.append(tenisCard);
   
   
         tenisCard.addEventListener('click', () => abrirProduto(produtoPromocao.id));
   
         swiperWrapper.appendChild(swiperSlide);
         
   
      }

   } catch (e) {

   }


}







