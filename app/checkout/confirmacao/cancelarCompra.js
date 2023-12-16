import { $ } from "../../utilidades";


export function cancelarCompra () {


    const modal = new bootstrap.Modal(document.getElementById('cancelarModal'));

    modal.show();

    const cancelarCompraGeral = $("#cancelar-compra-geral");
    if(cancelarCompraGeral){

        cancelarCompraGeral.addEventListener("click", ()=> {


            localStorage.removeItem("carrinho");
            window.location.href = "index.html"

        });
    }

    

}