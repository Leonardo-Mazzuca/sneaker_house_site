import { $, coletarEmail } from "../../utilidades";
import { coletarDadosCartao } from "../cartaoDeCredito/coletarDadosCartao";
import { coletarDadosPessoais } from "../dadosPessoais/coletarDadosPessoais";



export async function atualizarDadosPessoais () {

    atualizarDadosCartao();
    atualizarEmail();
    atualizarEndereco();
    atualizarDados();

}

async function atualizarDadosCartao() {

    const dadosUsuario = await coletarDadosCartao();

    $("#nome-titular").textContent = dadosUsuario.NomeTitular;
    $("#numero-cartao").textContent = dadosUsuario.NumeroCartao;
    $("#data-vencimento").textContent = dadosUsuario.DataVencimento;
    $("#cvv").textContent = dadosUsuario.CVV;



}

function atualizarEmail () {

    const email = coletarEmail();
    $("#email-checkout").textContent = email;

}

async function atualizarEndereco () {

    const dadosUsuarios = await coletarDadosPessoais();

    const endereco = document.querySelectorAll(".endereco");
    endereco.forEach(e => {
        e.textContent = dadosUsuarios.Endereco;
    });
    const cidades = document.querySelectorAll(".cidade-estado");
    cidades.forEach(cidade => {
        cidade.textContent = `${dadosUsuarios.Cidade} | ${dadosUsuarios.Estado}`;
    });
    const bairros = document.querySelectorAll(".bairro");
    bairros.forEach(bairro => {
        bairro.textContent = dadosUsuarios.Logradouro;
    });
    
    const ceps = document.querySelectorAll(".cep");
    ceps.forEach(cep => {
        cep.textContent = dadosUsuarios.CEP;
    });


}

async function atualizarDados () {
    const dadosUsuarios = await coletarDadosPessoais();

    $("#cpf").textContent = dadosUsuarios.CPF;
    $("#nome").textContent = `${dadosUsuarios.PrimeiroNome} ${dadosUsuarios.Sobrenome}`;
    $("#rg").textContent = dadosUsuarios.RG;
    $("#telefone-2").textContent = dadosUsuarios.Telefone;
    
}
