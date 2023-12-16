import { coletarEmail } from "../../utilidades";

export async function enviarDadosCartao(nome, num, data, cvv) {
  const url = "./php/processarDadosCartao.php";

  const dadosParaEnviar = new URLSearchParams();
  const emailUsuario = coletarEmail();
  dadosParaEnviar.append("email", emailUsuario);
  dadosParaEnviar.append("nome-cartao", nome);
  dadosParaEnviar.append("num-cartao", num);
  dadosParaEnviar.append("data-expiracao", data);
  dadosParaEnviar.append("cvv", cvv);

  try {
    const resposta = await fetch(url, {
      method: "POST",
      body: dadosParaEnviar,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    if (resposta.ok) {
      const dadosJson = await resposta.text();
      console.log(dadosJson);
    } else {
      console.error("Erro ao enviar os dados:", resposta.statusText);
    }
  } catch (erro) {
    console.error("Erro na requisição:", erro);
  }
}

export async function coletarDadosCartao() {
    const email = coletarEmail();
    const url = "./php/coletarDadosCartao.php";

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

