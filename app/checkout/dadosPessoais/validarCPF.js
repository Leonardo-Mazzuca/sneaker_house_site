

export default function validarCPF (campo) {
    const cpf = campo.value.replace(/\.|-/g,"");
    const mensagemError = campo.parentNode.querySelector(".mensagem-error");

    if(validarNumerosRepetidos(cpf) || validarPrimeiroDigitoCPF(cpf) || validarSegundoDigitoCPF(cpf)) {
        campo.setCustomValidity("Esse cpf não existe");
        mensagemError.textContent = "Esse cpf não existe";
    } else {
        campo.setCustomValidity("");
        mensagemError.textContent = "";
    }


}

function validarNumerosRepetidos (cpf) {

    const numerosRepetidos = [

        "00000000000",
        "11111111111",
        "22222222222",
        "33333333333",
        "44444444444",
        "55555555555",
        "66666666666",
        "77777777777",
        "88888888888",
        "99999999999",


    ];

    return numerosRepetidos.includes(cpf);


}

function validarPrimeiroDigitoCPF (cpf) {

    let soma = 0;
    let multiplicador = 10;

    for(let i = 0; i < 9; i++) {
        soma += cpf[i] * multiplicador;
        multiplicador--;
    }

    soma = (soma * 10) % 11;

    if(soma === 10 || soma === 11) {
        soma = 0;
    }

    return soma != cpf[9];
}

function validarSegundoDigitoCPF (cpf) {

    let soma = 0;
    let multiplicador = 11;

    for(let i = 0; i < 10; i++) {
        soma += cpf[i] * multiplicador;
        multiplicador--;
    }

    soma = (soma * 10) % 11;

    if(soma === 10 || soma === 11) {
        soma = 0;
    }

    return soma != cpf[10];
}