
export function validarData (campo) {

    const dataInserida = new Date(campo.value);
    const dataAgora = new Date()
    const mensagemError = campo.parentNode.querySelector(".mensagem-error");

    if(isNaN(dataInserida.getTime())){
        campo.setCustomValidity("Essa data não é válida");
        return;
    }

    if(dataInserida < dataAgora) {
        campo.setCustomValidity("Insira uma data válida de vencimento!");
        mensagemError.textContent = "Insira uma data válida de vencimento!"
        
    }  else {
        mensagemError.textContent = ""
    }

    
}

