import { $ } from "../utilidades";
import { buscaEndereco } from "./dadosPessoais/buscarCEP";
import { enviarDadosPessoais } from "./dadosPessoais/coletarDadosPessoais";
import { colocarEmail } from "./dadosPessoais/colocarEmail";
import  validarCPF  from "./dadosPessoais/validarCPF";
import validarRG, { formatarRg } from "./dadosPessoais/validarRG";


const formDadosPessoais = $("#form-dados-pessoais");
const camposForm = document.querySelectorAll("[required]");

camposForm.forEach(campo => {

    if(campo.name === "rg" ) {
        campo.addEventListener("input", ()=> formatarRg(campo));
    }

    if(campo.name === "email") {
        colocarEmail(campo);
    }


    campo.addEventListener("blur", ()=>validarCampo(campo));
    campo.addEventListener("invalid",(e)=>e.preventDefault());

});

formDadosPessoais.addEventListener("submit", async (e)=> {

    e.preventDefault();
    await enviarDadosPessoais();
    window.location.href = `./checkout-confirmar.html`;

});

function validarCampo(campo) {
    campo.setCustomValidity("");

    if(campo.name === "cpf") {
        validarCPF(campo);
    }

    if(campo.name === "rg") {
        validarRG(campo);
    }

    if(campo.name === "cep") {
        buscaEndereco(campo);
    }


}

