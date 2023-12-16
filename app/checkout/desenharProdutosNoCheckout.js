import { $, desenharCardSimples } from "../utilidades";



const containerProdutosCheckout = $(".container__cards__produtos__checkout");

function desenharCardsNoCheckout (){

    const produtosNoCarrinho = JSON.parse(localStorage.getItem("carrinho"));


        for(const item of produtosNoCarrinho) {
            
            containerProdutosCheckout.appendChild(desenharCardSimples(item));
    
        }
    

    atualizarPrecoTotal(produtosNoCarrinho);
}

function atualizarPrecoTotal (produtosNoCarrinho) {


        
  const subTotal = $('#subtotal');
  const total = $('#total-checkout');



    subTotal.textContent  =
    `Subtotal $${ produtosNoCarrinho.reduce((total, produto) => total += produto.preco * produto.quantidade,0)}`;
    total.textContent  =
    `Total $${ produtosNoCarrinho.reduce((total, produto) => total += produto.preco * produto.quantidade,0)}`;

    







}

desenharCardsNoCheckout();