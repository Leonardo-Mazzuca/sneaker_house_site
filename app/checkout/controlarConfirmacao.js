import { $, desenharCardSimples } from "../utilidades";
import { atualizarDadosPessoais } from "./confirmacao/atualizarDadosConfirm";
import { cancelarCompra } from "./confirmacao/cancelarCompra";
import { confirmarCompra } from "./confirmacao/confirmarCompra";


const secaoProdutosConfirmar = document.querySelectorAll(".produtos__confirmar");


function desenharProdutosParaConfirmar (){

    const produtosNoCarrinho = JSON.parse(localStorage.getItem("carrinho"));


        for(const item of produtosNoCarrinho) {
            
            secaoProdutosConfirmar.forEach(secao => {
                secao.appendChild(desenharCardSimples(item));
            })
    
        }
    

    atualizarPrecoTotal(produtosNoCarrinho);
    
}

function atualizarPrecoTotal (produtosNoCarrinho) {


        
    const subTotal = $('#subtotal');
    const total = document.querySelectorAll('.total-confirmar');
  
  
  
      subTotal.textContent  =
      `Subtotal $${ produtosNoCarrinho.reduce((total, produto) => total += produto.preco * produto.quantidade,0)}`;

      total.forEach(t => {
        t.textContent  =
      `Total $${ produtosNoCarrinho.reduce((total, produto) => total += produto.preco * produto.quantidade,0)}`;
      })
      
  
      
  
  
  
  
  
  
  
}



$("#cancelar-compra-btn").addEventListener("click", cancelarCompra);
$("#agendar-compra-btn").addEventListener("click", confirmarCompra);

atualizarDadosPessoais();
desenharProdutosParaConfirmar();