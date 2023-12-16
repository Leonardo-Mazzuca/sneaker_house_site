import { $ } from "../utilidades";
import { coletarDadosCartao, enviarDadosCartao } from "./cartaoDeCredito/coletarDadosCartao";
import { validarCVV } from "./cartaoDeCredito/validarCVV";
import {
  formatarNumero,
  validarNumeroDoCartao,
} from "./cartaoDeCredito/validarCartao";
import { validarData } from "./cartaoDeCredito/validarData";

const formDadosCartao = $("#form__dados__cartao");
const camposForm = document.querySelectorAll("[required]");

camposForm.forEach((campo) => {

  if (campo.name === "num-cartao") {
    campo.addEventListener("input", () => formatarNumero(campo));
  }

  if (campo.name === "num-cartao") {
    campo.addEventListener("input", () => formatarNumero(campo));
  }


  campo.addEventListener("blur", () => validarCampos(campo));
  campo.addEventListener("invalid", (e) => e.preventDefault());

});

function validarCampos(campo) {
  campo.setCustomValidity("");

  if (campo.name === "num-cartao") {
    validarNumeroDoCartao(campo);
  }

  if(campo.name === "data-expiracao" && campo.type === "date") {
    validarData(campo);
  }

  if (campo.name === "cvv") {
    validarCVV(campo);
  }


}

formDadosCartao.addEventListener("submit", async function (e) {
  e.preventDefault();

  const nomeCartao = formDadosCartao.querySelector("[name='nome-cartao']").value;
  const numCartao = formDadosCartao.querySelector("[name='num-cartao']").value;
  const dataExpiracao = formDadosCartao.querySelector("[name='data-expiracao']").value;
  const cvv = formDadosCartao.querySelector("[name='cvv']").value;

  await enviarDadosCartao(nomeCartao, numCartao, dataExpiracao, cvv);
 
  window.location.href = `./checkout-dados-pessoais.html`;
});



