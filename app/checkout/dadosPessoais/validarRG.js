export default function validarRG(campo) {
    const rgLimpo = parseInt(campo.value.replace(/\D/g, ''), 10);
    const mensagemError = campo.parentNode.querySelector(".mensagem-error");

    if (isNaN(rgLimpo)) {
        campo.setCustomValidity("O RG precisa ser numérico!");
        mensagemError.textContent = "O RG precisa ser numérico!";

    } else if (rgLimpo.toString().length < 9) {
        campo.setCustomValidity("RG Inválido!");
        mensagemError.textContent = "RG Inválido!";
    } else {
        mensagemError.textContent = "";
    }
}

export function formatarRg(campo) {
    const rgLimpo = campo.value.replace(/\D/g, '');
    const rgFormatado = rgLimpo.replace(/^(\d{2})(\d{3})(\d{3})(\d{1})$/, "$1.$2.$3-$4");
    campo.value = rgFormatado;
}
