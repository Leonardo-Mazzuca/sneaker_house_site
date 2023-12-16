import { coletarEmail } from "../../utilidades";

export async function enviarDadosPessoais() {
    const url = "./php/processarDadosPessoais.php";

    const primeiroNome = document.getElementById("nome-principal").value;
    const sobrenome = document.getElementById("sobrenome").value;
    const cpf = document.getElementById("cpf").value;
    const rg = document.getElementById("rg").value;
    const estado = document.getElementById("estado").value;
    const cidade = document.getElementById("cidade").value;
    const cep = document.getElementById("cep").value;
    const logradouro = document.getElementById("logradouro").value;
    const endereco = document.getElementById("endereco").value;
    const complemento = document.getElementById("complemento").value;
    const telefone = document.getElementById("telefone").value;
    const email = document.getElementById("email").value;

    const dadosParaEnviar = new URLSearchParams();
    const emailUsuario = coletarEmail();

    dadosParaEnviar.append("email", emailUsuario);
    dadosParaEnviar.append("nome-principal", primeiroNome);
    dadosParaEnviar.append("sobrenome", sobrenome);
    dadosParaEnviar.append("cpf", cpf);
    dadosParaEnviar.append("rg", rg);
    dadosParaEnviar.append("estado", estado);
    dadosParaEnviar.append("cidade", cidade);
    dadosParaEnviar.append("cep", cep);
    dadosParaEnviar.append("logradouro", logradouro);
    dadosParaEnviar.append("endereco", endereco);
    dadosParaEnviar.append("complemento", complemento);
    dadosParaEnviar.append("telefone", telefone);
    dadosParaEnviar.append("email", email);

    try {
        const resposta = await fetch(url, {
            method: "POST",
            body: dadosParaEnviar,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        });

        if (resposta.ok) {
            const dadosJson = await resposta.json();
            console.log(dadosJson);
        } else {
            console.error("Erro ao enviar os dados:", resposta.statusText);
        }
    } catch (erro) {
        console.error("Erro na requisição:", erro);
    }
}

export async function coletarDadosPessoais () {
    const email = coletarEmail();
    const url = "./php/coletarDadosPessoais.php";

    try {
        const resposta = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
                email: email,
            }),
        });

        if (resposta.ok) {
            
            const dados = await resposta.json();
            return dados;

        } else {
            console.error("Erro ao obter os dados do cartão:", resposta.statusText);
        }
    } catch (erro) {
        console.error("Erro na requisição:", erro);
    }
}