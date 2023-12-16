import { $, coletarEmail } from "../../utilidades";

export function confirmarCompra() {
    const modal = new bootstrap.Modal($('#confirmacaoModal'));
    modal.show();
   

    const realizarConfirmacao = () => {
        const produtosComprados = localStorage.getItem("carrinho");
        localStorage.setItem("produtos-comprados", produtosComprados);
        enviarDadosDaCompra(JSON.parse(produtosComprados)); 
        localStorage.removeItem("carrinho");
    }

    modal._element.addEventListener('hidden.bs.modal', ()=> {
        realizarConfirmacao();
        window.location.href = './index.html';
    });
    $("#continuar-comprando").addEventListener("click", realizarConfirmacao);
    $("#ir-para-perfil").addEventListener("click",()=>  realizarConfirmacao);
}

async function enviarDadosDaCompra(produtosComprados) {
    const url = './php/enviarDadosDaCompra.php';

 
    const dadosForm = [];
    produtosComprados.forEach((produto, index) => {
        Object.entries(produto).forEach(([chave, valor]) => {
            dadosForm.push(`compras[${index}][${chave}]=${encodeURIComponent(valor)}`);
        });
    });


    dadosForm.push(`email=${encodeURIComponent(coletarEmail())}`);

    const requisicao = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
      
        body: dadosForm.join("&"),
    });

    if (requisicao.ok) {
        const dados = await requisicao.text();
        console.log(dados);
    }
}

