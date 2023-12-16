import { $ } from "../utilidades";

export async function verificarDadosDoLogin(formLogin) {
  formLogin.addEventListener("submit", async (e) => {
    e.preventDefault();

    const userEmail = formLogin.querySelector("#login-email");
    const userSenha = formLogin.querySelector("#login-password");

    try {

      const resposta = await fetch("./php/verificarLogin.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded", 
        },
        body: new URLSearchParams({
          "email-login": userEmail.value,
          "senha-login": userSenha.value,
        }),
      });

      const errorPass = $(".error-username-password");
      const errorEmail = $(".error-username-login")

      if (resposta.ok) {
        const dados = await resposta.json();

        if (dados.success) {

            window.location.href = dados.redirect;
            localStorage.setItem("usuario-logado",JSON.stringify(userEmail.value));

          } else if (dados.senhaCerto === false) {
            exibirMensagemErro(errorPass, dados.message, userSenha);
          } else if (dados.emailCerto === false) {
            exibirMensagemErro(errorEmail, dados.message, userEmail);
          } else {
            limparMensagensErro(errorPass, userSenha);
            limparMensagensErro(errorEmail, userEmail);
          }

      
      } else {

        console.error("Erro na solicitação:", resposta.statusText);
        
      }
    } catch (e) {
      console.error(`Erro ao tentar realizar verificação: ${e}`);
    }
  });
}

function exibirMensagemErro(elementoError, mensagem, elementoInput) {
    elementoError.textContent = mensagem;
    elementoError.classList.remove('invisible');
    elementoInput.classList.add('border-danger');
  
    elementoInput.addEventListener("input", function () {
      if (!elementoError.classList.contains("invisible")) {
        elementoError.textContent = "";
        elementoError.classList.add("invisible");
        this.classList.remove("border-danger");
      }
    });
}
  