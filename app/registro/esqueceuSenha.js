import { $ } from "../utilidades.js";
import { verificarSenha } from "./verificarRegistro.js";

function removerLabelEnquantoInputEstiverPreenchido(formInputs) {
  formInputs.forEach((input) => {
    const formLabel = input.closest(".input-container").querySelector(".form-label");
    if (formLabel) {
      formLabel.classList.toggle("filled", input.value !== "");
    }
  });
}

const formNovaSenha = $("#form__nova__senha");
const elementoSenha = "#nova__senha";
const formInputContainerDisabled = $("#input-disabled");
const formInputAgain = $("#nova__senha__again");

let senhasCorrespondem = false;

async function verificarEmail() {
  const email = $("#email-nova-senha").value;

  const resposta = await fetch("./php/alterarSenha.php", {
      method: "POST",
      headers: {
          "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
          "email-nova-senha": email,
      }),
  });

  if (resposta.ok) {
    const respostaJson = await resposta.json();
    const divErrorEmail = $(".error-email");
    divErrorEmail.textContent = "";

    if (respostaJson.success) {
      return respostaJson;
    } else {
      divErrorEmail.textContent = respostaJson.message;
      $("#email-nova-senha").addEventListener("focus", () => divErrorEmail.textContent = "");
    }
  } else {
    console.error("Erro na requisição");
  }
}




async function verificarSeSenhaFoiPreenchida(elemento) {
  const inputSenha = $(elemento);

  inputSenha.addEventListener("input", async () => {
    const status = await verificarSenha(formNovaSenha, elemento);
    removerDisabledDoOutroInput(status);
   
  
  });
}

function removerDisabledDoOutroInput(status) {
  if (status) {
    formInputContainerDisabled.classList.remove("disabled");
    compararSeSenhasSaoIguais($("#nova__senha").value);
  } else {
    formInputContainerDisabled.classList.add("disabled");
    formInputAgain.value = "";
  }
}

const formInputs = document.querySelectorAll(".form-control");
formInputs.forEach((input) => {
  input.addEventListener("input", () => {
    removerLabelEnquantoInputEstiverPreenchido(formInputs);
  });
});



function compararSeSenhasSaoIguais(value) {

    const iconVerificacao = $(".icone__verificar__senha__igual");
  
    const iconeCheck = () => {
        iconVerificacao.classList.remove('text-danger', 'fa-solid', 'fa-xmark');
        iconVerificacao.classList.add('text-success', 'fa-solid', 'fa-circle-check');
    };
  
    const iconeX = () => {
        iconVerificacao.classList.remove('text-success', 'fa-solid', 'fa-circle-check');
        iconVerificacao.classList.add('text-danger', 'fa-solid', 'fa-xmark');
    };
  
    const msgError = $(".error-password-again");
   
  
    if(!formInputContainerDisabled.classList.contains("disabled")) {
      formInputAgain.addEventListener("focusout", function() {
        if(this.value === value) {
          
          iconVerificacao.classList.remove("invisible");
          iconeCheck();
          msgError.classList.add("invisible");
          senhasCorrespondem = true;
  
        } else {
          
         
          msgError.textContent = "As senhas não coincidem!"
          iconeX();
          senhasCorrespondem = false;
  
        }
      });
    }
    

}

async function alterarSenha(email, novaSenha) {
  const resposta = await fetch("./php/alterarSenha.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      "email-nova-senha": email,
      "nova__senha__again": novaSenha,
    }),
  });

  if (resposta.ok) {
    return await resposta.json();
  } else {
    console.error("Erro na requisição");
    return { success: false, message: "Erro na requisição" };
  }
}


(async () =>{
  await verificarSeSenhaFoiPreenchida(elementoSenha);
})();


$("#form__nova__senha").addEventListener("submit", async function (e) {
  e.preventDefault();

  if (await verificarEmail() && senhasCorrespondem) {
    const resposta = await alterarSenha($("#email-nova-senha").value, $("#nova__senha__again").value);
    if (resposta) {
      const successModal = new bootstrap.Modal(document.getElementById('successModal'));
      const modalTitle = $("#successModalLabel")
      modalTitle.textContent =  resposta.message;
      successModal.show();

    } else {
      console.error(resposta.message);
    }
  } else {
    const msgError = $(".error-password-again");
    msgError.textContent = "As senhas não coincidem!";
    formInputAgain.addEventListener("focus", () => (msgError.textContent = ""));
  }
});






