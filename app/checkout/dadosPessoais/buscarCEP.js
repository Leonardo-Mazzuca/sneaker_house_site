import { $ } from "../../utilidades";



export async function buscaEndereco (campo) {

    const cep = campo.value;
    const msgErro = campo.parentNode.querySelector(".mensagem-error");
    msgErro.innerHTML = '';

    try{

        const consultaCEP = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
        const consultaCEPConvertido = await consultaCEP.json();
        console.log(consultaCEPConvertido);

        if(consultaCEPConvertido.erro){
            campo.setCustomValidity("CEP Inválido")
            throw new Error('Cep inválido!');
        }
        
        const enderecoInput = $('#endereco');
        const cidadeInput = $('#cidade');
        const estadoInput = $('#estado');
        const bairroInput = $('#logradouro');
        
        console.log(consultaCEPConvertido);

        cidadeInput.value = consultaCEPConvertido.localidade;
        enderecoInput.value = consultaCEPConvertido.logradouro;
        estadoInput.value = consultaCEPConvertido.uf;
        bairroInput.value = consultaCEPConvertido.bairro;


    } catch (erro) {
        campo.setCustomValidity("CEP Inválido")
        msgErro.textContent = `CEP inválido, tente novamente`;
     

    }
}

