export function validarCVV(campo) {
    const cvv = campo.value.trim();

   
    if (!/^\d+$/.test(cvv)) {
       
        exibirMensagemErro(campo, "CVV deve conter apenas números");
        return false;
    }

   
    if (cvv.length !== 3) {
        
        exibirMensagemErro(campo, "CVV inválido");
        return false;
    }

   
    limparMensagemErro(campo);
    return true;
}

function exibirMensagemErro(campo, mensagem) {
    const mensagemErro = campo.parentNode.querySelector(".mensagem-error");
    mensagemErro.textContent = mensagem;
}

function limparMensagemErro(campo) {
    const mensagemErro = campo.parentNode.querySelector(".mensagem-error");
    mensagemErro.textContent = "";
}
