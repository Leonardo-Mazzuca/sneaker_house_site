export function validarNumeroDoCartao(campo) {
    const mensagem = campo.parentNode.querySelector(".mensagem-error");

    if (!aplicarAlgoritmoDeLuhn(campo.value)) {
        campo.setCustomValidity("Este número de cartão de crédito não existe");
        mensagem.textContent = "Número de cartão inválido!";
    } else {
        campo.setCustomValidity("");
        mensagem.textContent = "";
    }
}

export function aplicarAlgoritmoDeLuhn(numero) {
    const numeroLimpo = numero.replace(/\D/g, '');

    if (!numeroLimpo || isNaN(numeroLimpo)) {
        return false;
    }

    const digitos = numeroLimpo.split('').map(Number);

    digitos.reverse();

    let soma = 0;
    for (let i = 0; i < digitos.length; i++) {
        let digito = digitos[i];
        if (i % 2 === 1) {
            digito *= 2;
            if (digito > 9) {
                digito -= 9;
            }
        }
        soma += digito;
    }

    return soma % 10 === 0;
}

export function formatarNumero(campo) {
    const numero = campo.value;
    const numeroLimpo = numero.replace(/\D/g, '');

    const grupos = numeroLimpo.match(/(\d{1,4})/g);

    if (grupos) {
        const numeroFormatado = grupos.join(' ');
        campo.value = numeroFormatado;
    }
}